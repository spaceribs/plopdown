module.exports = {
  name: 'devtool',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/devtool',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
