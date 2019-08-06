import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const ReceiveFunds = () => {
  return (
    <div>
      Receive Funds Page
    </div>
  );
};

ReceiveFunds.propTypes = {
};

ReceiveFunds.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const ReceiveFundsPage = connect(stateMapper, actionsMapper)(ReceiveFunds);

export { ReceiveFundsPage };
