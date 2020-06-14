module.exports = {
  name: 'content-script',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/content-script',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
