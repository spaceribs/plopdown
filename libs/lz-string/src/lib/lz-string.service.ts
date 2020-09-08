import { Injectable } from '@angular/core';
import LZString from 'lz-string';
import { LzStringModule } from './lz-string.module';

@Injectable({
  providedIn: LzStringModule,
})
export class LzStringService {
  constructor() {}

  public decompressURI(compressedValue: string): string {
    const decompressedValue = LZString.decompressFromEncodedURIComponent(
      compressedValue
    );
    if (decompressedValue === null) {
      throw new Error('Plopdown string could not be decoded');
    }
    return decompressedValue;
  }

  public compressURI(value: string) {
    return LZString.compressToEncodedURIComponent(value);
  }
}
