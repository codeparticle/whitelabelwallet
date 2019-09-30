/**
 * @fileoverview Search component for send funds
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { RenderProp } from 'components';
import { PROP_TYPES } from 'lib/constants';

import './send-funds-search.scss';

const { renderable } = PROP_TYPES;

function SendFundsSearch({
  area,
  label,
  placeholder,
  onSubmit,
  icon,
}) {
  return (
    <div className="send-funds-search">
      <h4>{label}</h4>
      <div className="send-funds-search__field-container">
        <Search placeholder={placeholder} onSubmit={onSubmit} />
        <RenderProp>{icon}</RenderProp>
      </div>
      <style jsx>
        {`
          .send-funds-search {
            grid-area: ${area};
          }
        `}
      </style>
    </div>
  );
}

SendFundsSearch.defaultProps = {
  icon: null,
};

SendFundsSearch.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  icon: renderable,
};

export { SendFundsSearch };