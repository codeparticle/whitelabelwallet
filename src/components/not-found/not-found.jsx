import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { TRANSLATION_KEYS } from 'translations/keys';

const NotFound = ({ intl }) => (
  <div className="not-found-rct-component">
    {intl.formatMessage(TRANSLATION_KEYS.PAGE_NOT_FOUND)}
  </div>
);

NotFound.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NotFound);
