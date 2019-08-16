import React from 'react';
import { useMedia } from 'lib/hooks';

const MediaContext = React.createContext(null);

function MediaProvider(props) {
  const media = useMedia(false);

  return (
    <MediaContext.Provider value={media}>
      {props.children}
    </MediaContext.Provider>
  );
}

export {
  MediaContext,
  MediaProvider,
};
