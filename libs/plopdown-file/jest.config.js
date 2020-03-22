module.exports = {
  name: 'plopdown-file',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/plopdown-file',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
