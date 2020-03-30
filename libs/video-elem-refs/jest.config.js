module.exports = {
  name: 'video-elem-ref',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/video-elem-ref',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
