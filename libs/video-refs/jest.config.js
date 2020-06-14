module.exports = {
  name: 'video-refs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/video-refs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
