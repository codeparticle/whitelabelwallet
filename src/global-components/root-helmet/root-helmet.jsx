import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { TRANSLATION_KEYS } from 'translations/keys';

const {
  APP_NAME,
  HELMET: {
    DESCRIPTION,
  },
} = TRANSLATION_KEYS;

/**
 * helmet optimization
 * https://www.metatagseo.com/
 * https://github.com/nfl/react-helmet#readme
 */

const RootHelmet = ({
  intl: {
    formatMessage,
  },
}) => {
  const appName = formatMessage(APP_NAME);
  const description = formatMessage(DESCRIPTION);

  return (
    <Helmet
      defaultTitle={appName}
      titleTemplate={`${appName} - %`}
    >
      <meta charSet="utf-8" />
      <meta name="description" content={appName} />
      <meta property="og:site_name" content={appName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="" />
      <meta property="og:url" content="http://mysite.com/example" />
      <meta property="og:type" content="article" />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
};

RootHelmet.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RootHelmet);
