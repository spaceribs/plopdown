module.exports = {
  name: 'plopdown-embed',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/plopdown-embed',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
