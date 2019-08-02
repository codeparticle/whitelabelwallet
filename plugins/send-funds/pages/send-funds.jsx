import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const SendFunds = () => {
  return (
    <div>
      Send Funds Page
    </div>
  );
};

SendFunds.propTypes = {
};

SendFunds.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const SendFundsPage = connect(stateMapper, actionsMapper)(SendFunds);

export { SendFundsPage };
