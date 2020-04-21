module.exports = {
  name: 'plopdown-overlay',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/plopdown-overlay',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
