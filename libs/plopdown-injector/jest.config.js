module.exports = {
  name: 'plopdown-injector',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/plopdown-injector',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
