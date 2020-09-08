module.exports = {
  name: 'permissions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/permissions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
