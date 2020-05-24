module.exports = {
  name: 'devtool-panels',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/devtool-panels',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
