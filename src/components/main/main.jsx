import React, { Fragment } from 'react';
import { PluginInjector } from 'global-components';
import { logPageView } from 'components/google-analytics';
import { main } from 'e2e/constants';
import './main.scss';

const Main = () => {
  logPageView();

  return (
    <Fragment>
      <div
        className='main-rct-component'
        data-selector={main.selectors.test.raw}
      >
        Welcome to your React App
      </div>
      <PluginInjector
        wrappedByDiv
        className='main-rct-component__plugin-item'
        role='button'
      />
    </Fragment>
  );
};

export default Main;
