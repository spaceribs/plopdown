import * as SanitizeHTML from 'sanitize-html';

export const SANITIZER_OPTIONS: SanitizeHTML.IOptions = {
  allowedTags: ['p', 'b', 'i']
};
