// export interface CommandRequest<T> {
//   command: T;
//   args: any[]; // need to match this to method params
// }

// export interface CommandResponse<T> {
//   command: T;
//   data?: any[]; // need to match this to method params
// }

export enum PortNames {
  BrowserAction = 'BROWSER_ACTION',
  ContentScript = 'CONTENT_SCRIPT'
}

// export enum BrowserActionResponse {
//   Opened = 'PU_OPENED',
//   VideosRefresh = 'PU_REFRESH_VIDEOS',
//   VideoSelected = 'PU_SELECTED_VIDEO'
// }

// export enum BrowserActionRequest {
//   ShowVideoRefs = 'PU_VIDEOREFS_FOUND'
// }

// export enum ContentScriptResponse {
//   Ready = 'CS_READY',
//   VideosFound = 'CS_VIDEOS_FOUND'
// }

// export enum ContentScriptRequest {
//   GetVideos = 'CS_GET_VIDEOS'
// }
