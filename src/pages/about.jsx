import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import './auth-guard.scss';

const About = () => {
  return (
    <div>
      About Page
    </div>
  );
};

About.propTypes = {
};

About.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const AboutContainer = connect(stateMapper, actionsMapper)(About);

export { AboutContainer };
