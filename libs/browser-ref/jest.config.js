module.exports = {
  name: 'browser-ref',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/browser-ref',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
