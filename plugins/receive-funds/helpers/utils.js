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
/**
 * @fileoverview ReceiveFunds Utils
 * @author Gabriel Womble
 */


/**
 * Copies a given string to the user's clipboard
 * @param {string} - copyText
 */
function copyToClipBoard(copyText) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText);
  } else {
    const input = document.createElement('input');
    input.value = copyText;
    document.body.appendChild(input);
    input.focus();
    input.select();

    document.execCommand('copy');
    document.body.removeChild(input);
  }
};

/**
 * Opens a formattted mailto link. The function handles URI encoding.
 * @param {Object} - { subject, body }
 */
function mailToOnClick({ subject, body }) {
  let mailTo = 'mailto:?';

  if (subject) {
    mailTo += `subject=${encodeURIComponent(subject)}&`;
  }

  if (body) {
    mailTo += `body=${encodeURIComponent(body)}`;
  }

  // Build link element, and trigger click
  const link = document.createElement('a');
  link.href = mailTo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export {
  copyToClipBoard,
  mailToOnClick,
};