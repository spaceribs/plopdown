export interface OnInstalledDetails {
  /** The reason that this event is being dispatched. */
  reason: browser.runtime.OnInstalledReason;
  /**
   * Indicates the previous version of the extension, which has just been updated. This is present only if
   * 'reason' is 'update'.
   */
  previousVersion?: string;
  /** Indicates whether the addon is installed as a temporary extension. */
  temporary: boolean;
  /**
   * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is
   * 'shared_module_update'.
   * @deprecated Unsupported on Firefox at this time.
   */
  id?: string;
}
