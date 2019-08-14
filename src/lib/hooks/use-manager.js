/**
 * @fileoverview Hook to consume the ManagerContext in any component
 * usage will always be the same independent of the environment
 * @author Gabriel Womble
 */
import { useContext } from 'react';
import { ManagerContext } from 'global-components';

export function useManager() {
  return useContext(ManagerContext);
}
