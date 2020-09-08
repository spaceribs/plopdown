module.exports = {
  name: 'lz-string',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lz-string',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
