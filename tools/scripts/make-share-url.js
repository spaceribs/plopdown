/**
 * Builds a `#plopdown:<compressed>` share URL for manual testing.
 *
 * The share format is the one HashVideoRefsService decodes: a PlopdownFile
 * (WebVTT plus headers) compressed with lz-string's encoded-URI variant and
 * hung off the page's hash. Nothing in the repo ships a sample, so this
 * generates one against the same schema the extension validates with.
 *
 * Usage:
 *   node tools/scripts/make-share-url.js <page-url> [xpath]
 *
 * xpath defaults to the first <video> in the document, which is what a page
 * with a single player resolves to.
 */
const { deflateSync } = require('zlib');
const LZString = require('lz-string');
const validate = require('../../libs/plopdown-file/src/schema/plopdown-file-v1.schema.js');

const [, , pageUrl, xpathArg] = process.argv;

if (!pageUrl) {
  console.error(
    'Usage: node tools/scripts/make-share-url.js <page-url> [xpath]'
  );
  process.exit(1);
}

const url = new URL(pageUrl);
const xpath = xpathArg || '//video';

/**
 * Cues are deliberately spread over the first half-minute so that a tester
 * can watch them appear and disappear rather than checking a single frame.
 */
const file = {
  headers: {
    _id: 'track_manual_test',
    _rev: '1-manualtest',
    type: 'plopdown_v2',
    title: 'Manual test track',
    for: 'Manual validation of the toolchain upgrade',
    created: new Date().toISOString(),
    language: 'en-US',
    authors: 'Plopdown test plan',
    xpath,
    frameOrigin: url.origin,
    framePath: url.pathname,
    frameSearch: url.search,
  },
  cues: [
    {
      id: 'info-open',
      startTime: 1,
      endTime: 8,
      data: {
        type: 'INFO',
        title: 'Plopdown is rendering',
        authors: ['Test plan'],
      },
    },
    {
      id: 'plop-middle',
      startTime: 5,
      endTime: 15,
      data: {
        type: 'PLOP',
        top: 20,
        left: 20,
        width: 30,
        desc: 'This overlay should sit inside the video, not the page.',
        icons: [{ top: 50, left: 50, size: 40, rotate: 0, emoji: '📌' }],
      },
    },
    {
      id: 'shape-late',
      startTime: 12,
      endTime: 25,
      data: {
        type: 'SHAPE',
        title: { text: 'Outline', show: true },
        top: 10,
        left: 55,
        width: 35,
        height: 35,
        viewBox: '0 0 100 100',
        elements: [
          {
            element: 'rect',
            x: 5,
            y: 5,
            width: 90,
            height: 90,
            stroke: { color: '#ff0088', width: 4 },
            fill: { color: 'rgba(255, 0, 136, 0.5)' },
          },
        ],
      },
    },
  ],
};

if (validate(file) !== true) {
  console.error('Generated file does not satisfy the plopdown schema:');
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}

/**
 * Mirrors PlopdownFileService.encode. Kept here rather than imported because
 * the service is Angular-injectable TypeScript and this runs as plain Node.
 */
function toISOTime(seconds) {
  return new Date(seconds * 1000).toISOString().replace(/^.*T(.*)Z$/, '$1');
}

const headerString = Object.keys(file.headers)
  .reduce((memo, key) => {
    const value = file.headers[key];
    return value == null ? memo : `${memo}\n${key}: ${String(value).trim()}`;
  }, 'WEBVTT')
  .trim();

const cuesString = file.cues
  .map(
    (cue) =>
      `${cue.id}\n${toISOTime(cue.startTime)} --> ${toISOTime(
        cue.endTime
      )}\n${JSON.stringify(cue.data, null, 4)}`
  )
  .join('\n\n');

const rawFile = `${headerString}\n\n${cuesString}`;
const compressed = LZString.compressToEncodedURIComponent(rawFile);

/**
 * Round-trips the compressed payload before printing it, so a bad URL is
 * caught here rather than looking like a rendering failure in the browser.
 */
if (LZString.decompressFromEncodedURIComponent(compressed) !== rawFile) {
  console.error('Compressed payload did not survive a decompress round-trip.');
  process.exit(1);
}

const shareUrl = `${url.origin}${url.pathname}${url.search}#plopdown:${compressed}`;

console.log(`xpath:  ${xpath}`);
console.log(`cues:   ${file.cues.length} (1s-8s, 5s-15s, 12s-25s)`);
console.log(`length: ${shareUrl.length} characters`);
console.log('');
console.log(shareUrl);
