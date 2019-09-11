/**
 * @fileoverview Layout based utils to enforce common patterns
 * @author Gabriel Womble
 */

import { VARIANTS } from 'lib/constants';

const { OVERLAY, SIDEPANEL } = VARIANTS;

/**
 * Gets the sidepanel variant based on media query
 * @returns {string} sidepanelVariant
 * @param {boolean} isMobile - isMobile bool from useMedia media object
 */
function getSidepanelVariant({ isMobile }) {
  return isMobile
    ? OVERLAY
    : SIDEPANEL;
}

export { getSidepanelVariant };
