export interface FullAttachments extends PouchDB.Core.Attachments {
  [attachmentId: string]: PouchDB.Core.FullAttachment;
}
