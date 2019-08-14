/**
 * @fileoverview Hook to provide screen breakpoints in presentational files
 * @author Gabriel Womble
 */
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BREAKPOINTS } from 'lib/constants';
import { MediaContext } from 'global-components';

const {
  LANDSCAPE,
  TABLET,
  DESKTOP,
  WIDESCREEN,
} = BREAKPOINTS;

/*
  To use w/ provider:

  import { MediaProvider } from 'components';

  return (
    <MediaProvider>
      <App />
    </MediaProvider>
  );

  If you don't want to use the provider, pass false to useMedia:

  const media = useMedia(false);

  Usage examples:
    1: const media = useMedia();
    2: const { isMobile } = useMedia();
    3: const isTablet = useMedia().isTablet;
*/

/**
 @typedef media
 @type {Object}
 @property {boolean} media.isMobile
 @property {boolean} media.isTablet
 @property {boolean} media.isDesktop
 @property {boolean} media.isWideScreen
 */

/**
 * @returns {media} media
 * @param {boolean} withContext - Tells the hook to consume MediaContext
 * rather than add a new event listener. Defaults to true
 */
function useMedia(withContext = true) {
  if (withContext) {
    return useContext(MediaContext);
  }
  const isClient = typeof window === 'object';

  function getSize() {
    return isClient ? window.innerWidth : undefined;
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  function applyBreakpoint(fromSize, toSize = null) {
    const minBreakpoint = parseInt(fromSize, 10) <= windowSize;
    const maxBreakpoint = toSize && parseInt(toSize, 10) > windowSize;

    const breakpointCondition = (
      (minBreakpoint && maxBreakpoint)
      || (minBreakpoint && !toSize)
    );

    return breakpointCondition;
  }

  const breakpoints = {
    isMobile: applyBreakpoint(0, LANDSCAPE),
    isLandScape: applyBreakpoint(LANDSCAPE, TABLET),
    isTablet: applyBreakpoint(TABLET, DESKTOP),
    isDesktop: applyBreakpoint(DESKTOP, WIDESCREEN),
    isWideScreen: applyBreakpoint(WIDESCREEN),
  };

  return useMemo(() => breakpoints, Object.values(breakpoints));
}

export { useMedia };
