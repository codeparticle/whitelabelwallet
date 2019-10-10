/**
 * @fileoverview Select Contacts mobile view
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MobileContactList } from '@codeparticle/whitelabelwallet.styleguide';

import { getContacts } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { SELECT_CONTACT } = SEND_FUNDS;

function SelectContacts({
  formatMessage,
  setFormSelecting,
  setToAddress,
  setIsSelecting,
}) {
  const [rowData, setRowData] = useState([]);

  function onContactClicked(data) {
    setToAddress(data);
    setIsSelecting(false);
    setFormSelecting(false);
  }

  useEffect(() => {
    getContacts().then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  return (
    <Fragment>
      <label>
        <span>{formatMessage(SELECT_CONTACT)}</span>
      </label>
      <MobileContactList
        data={rowData}
        onContactClicked={onContactClicked}
      />
      <style jsx>
        {`
          label {
            width: 100%;
          }
        `}
      </style>
    </Fragment>
  );
}

SelectContacts.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setFormSelecting: PropTypes.func.isRequired,
  setIsSelecting: PropTypes.func.isRequired,
  setToAddress: PropTypes.func.isRequired,
};

export { SelectContacts };
