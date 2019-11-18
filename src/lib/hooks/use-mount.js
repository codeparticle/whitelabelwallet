/**
 * @fileoverview Hook that runs a callback on mount;
 * @author Gabriel Womble
 */
import { useEffect } from 'react';

export function useMount(callback) {
  useEffect(callback, []);
};
