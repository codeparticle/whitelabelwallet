import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const TransactionHistory = () => {
  return (
    <div>
      Transaction History Page
    </div>
  );
};

TransactionHistory.propTypes = {
};

TransactionHistory.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const TransactionHistoryPage = connect(stateMapper, actionsMapper)(TransactionHistory);

export { TransactionHistoryPage };
