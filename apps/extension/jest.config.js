module.exports = {
  name: 'extension',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/extension',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
