/**
 * @fileoverview Hook that runs a callback on unMount
 * @author Gabriel Womble
 */
import { useEffect } from 'react';

function useUnmount(callback) {
  useEffect(() => callback, []);
}

export { useUnmount };
