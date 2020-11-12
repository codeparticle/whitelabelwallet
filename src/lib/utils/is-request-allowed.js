/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
