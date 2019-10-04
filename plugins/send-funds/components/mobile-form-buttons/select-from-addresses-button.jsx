import React from 'react';
import PropTypes from 'prop-types';
import { empty } from 'lib/utils';

import { MobileFormButton } from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const {
  SELECT_ADDRESS,
  SEND_FROM,
} = SEND_FUNDS;

function SelectFromAddressesButton({
  formatMessage,
}) {
  return (
    <MobileFormButton
      btnLabel={formatMessage(SELECT_ADDRESS)}
      label={formatMessage(SEND_FROM)}
      onClick={empty}
    />
  );
}

SelectFromAddressesButton.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export { SelectFromAddressesButton };
