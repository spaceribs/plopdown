module.exports = {
  name: 'ports',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ports',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
