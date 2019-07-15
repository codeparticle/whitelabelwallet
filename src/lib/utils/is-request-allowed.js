import { arrayToRegex } from './array-to-regex';
import { environment } from './environment';

function isRequestAllowed ({
  allowedUrls = [],
  contentType,
  method,
  url,
}) {
  const urlsToAllowAnyMethod = [];
  const allowed = [
    ...urlsToAllowAnyMethod,
    ...(Array.isArray(allowedUrls) ? allowedUrls : [allowedUrls]),
  ];
  const imagesContentTypeRegex = /^image\/(gif|jpeg|jpe|jpg|svg|ico|png)/;

  if (environment.isDev()) {
    allowed.push(...[
      'file:',
      'data:',
      'ws:',
      'http://localhost',
      'http://127.0.0.1',
      'chrome-devtools://',
    ]);
  }

  const parsedContentType = Array.isArray(contentType) ? contentType[0] : contentType;
  const regex = arrayToRegex(allowed);
  const regexForAnyMethod = arrayToRegex(urlsToAllowAnyMethod);
  const isMethodAllowed = method === 'GET' || regexForAnyMethod.test(url);
  const isImageRequest = method === 'GET' && parsedContentType && imagesContentTypeRegex.test(parsedContentType);

  return regex.test(url) && (isImageRequest || isMethodAllowed);
}

export {
  isRequestAllowed,
};
