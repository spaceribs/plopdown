export interface WebNavigationDetails {
  /** The ID of the tab in which the navigation is about to occur. */
  tabId: number;
  url: string;
  /**
   * The ID of the process runs the renderer for this tab.
   * @deprecated Unsupported on Firefox at this time.
   */
  processId?: number;
  /**
   * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a
   * subframe. Frame IDs are unique for a given tab and process.
   */
  frameId: number;
  /** ID of frame that wraps the frame. Set to -1 of no parent frame exists. */
  parentFrameId: number;
  /** The time when the browser was about to start the navigation, in milliseconds since the epoch. */
  timeStamp: number;
}
