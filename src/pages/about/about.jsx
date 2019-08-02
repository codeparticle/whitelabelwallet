import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

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

const AboutPage = connect(stateMapper, actionsMapper)(About);

export { AboutPage };
