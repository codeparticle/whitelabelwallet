/**
 * @fileoverview Constants that define common component variants
 * @author Gabriel Womble
 */

import { ButtonVariants } from '@codeparticle/whitelabelwallet.styleguide';

/**
 * ButtonVariants for reference:
 * PRIMARY
 * GREEN
 * SLATE
 * SECONDARY
 * ALERT
 * TEAL
 * TERTIARY
 * SLATE_CLEAR
 */

const ADD = 'add';
const EDIT = 'edit';

const OVERLAY = 'overlay';
const SIDEPANEL = 'sidepanel';

const FULL = 'full';

export const VARIANTS = {
  ...ButtonVariants,
  ADD,
  EDIT,
  FULL,
  OVERLAY,
  SIDEPANEL,
};
