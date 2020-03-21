module.exports = {
  name: 'browser-storage',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/browser-storage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
