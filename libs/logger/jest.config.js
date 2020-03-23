module.exports = {
  name: 'logger',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/logger',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
