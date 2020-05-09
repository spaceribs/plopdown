import { PlopdownFileV1Validator } from './../schema/plopdown-file-v1.validator';
import { PlopdownFileModule } from './plopdown-file.module';
import { PlopdownFile } from './plopdown-file.model';
import { Injectable } from '@angular/core';
import { Cue } from '@plopdown/plopdown-cues';

@Injectable({
  providedIn: PlopdownFileModule
})
export class PlopdownFileService {
  private readonly validator: PlopdownFileV1Validator;

  constructor() {
    this.validator = new PlopdownFileV1Validator();
  }

  public decode(rawFile: string): PlopdownFile {
    if (!this.isWebVTTFile(rawFile)) {
      throw new Error('File is not a WebVTT file.');
    }

    const parsedFile = this.convertWebVTT(rawFile);

    if (!this.isPlopdownFile(parsedFile)) {
      throw this.validator.getLastErrors();
    }

    return parsedFile;
  }

  public encode(file: PlopdownFile): string {
    const fileValid = this.validator.validate(file);

    if (fileValid !== true) {
      throw this.validator.getLastErrors();
    }

    const headerString = this.convertToHeader(file.headers);
    const cuesString = this.convertToCues(file.cues);

    return `${headerString}\n\n${cuesString}`;
  }

  private isWebVTTFile(file: string): boolean {
    return /^WEBVTT$/gm.test(file);
  }

  private convertToHeader(headers: object): string {
    let headerString = 'WEBVTT';
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        const value = (headers as any)[key];
        if (value == null) {
          continue;
        }
        headerString += `\n${key}: ${value.trim()}`;
      }
    }
    return headerString.trim();
  }

  private convertToCues(cues: Cue[]): string {
    const cueStrings = cues.map(cue => {
      let cueString = '';
      const startString = this.convertToISOTime(cue.startTime);
      const endString = this.convertToISOTime(cue.endTime);

      if (cue.id != null) {
        cueString += `${cue.id}\n`;
      }

      cueString += `${startString} --> ${endString}\n`;

      cueString += `${JSON.stringify(cue.data, null, 4)}`;

      return cueString;
    });

    return cueStrings.join('\n\n');
  }

  private convertWebVTT(file: string): object {
    const blocks = file.trim().split('\n\n');
    const firstBlock = blocks[0];

    const headers = this.getHeaders(firstBlock);
    const cues = this.getCues(blocks);

    console.log(headers);

    return { headers, cues };
  }

  private getHeaders(firstBlock: string): object {
    const headerMatcher = /^([\w-]+):(.*)$/gm;
    const headerMatches = this.getAllMatches(firstBlock, headerMatcher);

    return headerMatches.reduce((memo, match) => {
      const key = match[1].trim();
      const value = match[2].trim();
      memo[key] = value;
      return memo;
    }, {} as any);
  }

  private getAllMatches(str, regex) {
    const matches = [];
    let m;
    while (1) {
      m = regex.exec(str);
      if (m) matches.push(m);
      else break;
    }
    return matches;
  }

  private convertToISOTime(time: number) {
    const dateISO = new Date(time * 1000).toISOString();
    const timeMatcher = /^1970-01-01T(.*)Z$/;
    const timeMatch = dateISO.match(timeMatcher);

    if (timeMatch == null) {
      throw new Error('Not a valid unix time');
    }

    return timeMatch[1];
  }

  private convertToUnixTime(time: string) {
    const dateString = `1970-01-01T${time}Z`;
    return new Date(dateString).getTime();
  }

  private getCues(blocks: string[]): Cue[] {
    // Ignore the header
    blocks.shift();

    const timecodeMatch = /(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})/;

    // Search for blocks with a timecode.
    return blocks.reduce((memo, block) => {
      const timecodes = block.match(timecodeMatch);

      if (timecodes == null) {
        return memo;
      }

      const start = timecodes[1];
      const end = timecodes[2];

      const startTime = this.convertToUnixTime(timecodes[1]) / 1000;
      const endTime = this.convertToUnixTime(timecodes[2]) / 1000;

      // If the block doesn't being with the start time
      // the block should start with an ID.
      let id;
      if (block.indexOf(start) > 0) {
        const idMatch = block.match(/^(.*)/);
        if (idMatch) {
          id = idMatch[1].trim();
        }
      }

      // Everything past the endTime should be JSON metadata.
      const text = block.split(end)[1];
      const data = JSON.parse(text);

      memo.push({ startTime, endTime, data, id });

      return memo;
    }, [] as Cue[]);
  }

  private isPlopdownFile(file: object): file is PlopdownFile {
    const fileValid = this.validator.validate(file);
    return fileValid as boolean;
  }
}
