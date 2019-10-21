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