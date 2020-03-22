module.exports = {
  name: 'tracks',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/tracks',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
