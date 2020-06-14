module.exports = {
  name: 'browser-action',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/browser-action',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
