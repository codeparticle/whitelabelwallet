import React from 'react';
import PropTypes from 'prop-types';

function TransactionRow({
  children,
  field,
  label,
}) {
  const content = field
    ? field
    : children;

  return (
    <div className="row">
      <label>{label}</label>
      <div className="field">
        {content}
      </div>
    </div>
  );
}

TransactionRow.propTypes = {
  children: PropTypes.node,
  field: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  label: PropTypes.string.isRequired,
};

TransactionRow.defaultProps = {
  children: null,
  field: '',
};

export { TransactionRow };