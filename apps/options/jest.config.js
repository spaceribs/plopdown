module.exports = {
  name: 'options',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/options',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
