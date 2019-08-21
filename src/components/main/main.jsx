import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { connect } from 'react-redux';
import { PluginInjector } from 'global-components';
import { logPageView } from 'components/google-analytics';
import { main } from 'e2e/constants';
import { getRdxActionMapper } from 'rdx/utils/props-mapping';
import './main.scss';

const MainView = ({ setAuthToken }) => {
  logPageView();

  return (
    <Fragment>
      <div
        className='main-rct-component'
        data-selector={main.selectors.test.raw}
      >
        Welcome to your React App
      </div>
      <div>
        <Button data-selector={main.selectors.logout.raw} onClick={() => setAuthToken('')}>Logout</Button>
      </div>
      <PluginInjector
        wrappedByDiv
        className='main-rct-component__plugin-item'
        role='button'
      />
      <PluginInjector
        wrappedByDiv
        className='main-rct-component__plugin-item'
        role='test'
      />
    </Fragment>
  );
};

MainView.propTypes = {
  setAuthToken: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'setAuthToken',
]);

const Main = connect(null, actionsMapper)(MainView);

export default Main;
