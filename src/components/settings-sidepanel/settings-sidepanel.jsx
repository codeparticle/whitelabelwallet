/**
 * @fileoverview User Settings sidepanel
 * @author Gabriel Womble
 */
import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Overlay,
  svgs,
  TextInput,
  useMedia,
  useTheme,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { ChangePasswordFormLayout, ThemeToggle } from 'components';
import { useManager } from 'lib/hooks';
import { getSidepanelVariant } from 'lib/utils';
import { TRANSLATION_KEYS } from 'translations/keys';
import { settings as e2e } from 'e2e/constants';

import { validateSettings } from './validate-settings';
import './settings-sidepanel.scss';

const { COMMON, SETTINGS } = TRANSLATION_KEYS;
const { SvgSettings } = svgs.icons;

const initialInputErrors = {
  username: false,
  newPassword: false,
  currentPassword: false,
  confirmedPassword: false,
};

const initialPasswordFields = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: '',
};

function SettingsSidepanelView({
  isOpen,
  intl,
  onClose,
  theme,
}) {
  const manager = useManager();
  const { isMobile } = useMedia();
  const { name } = useTheme();

  const [username, setUsername] = useState(manager.username);
  const [passwordFields, setPasswordFields] = useState(initialPasswordFields);
  const [inputErrors, setInputErrors] = useState(initialInputErrors);

  const { formatMessage } = intl;
  const panelVariant = getSidepanelVariant({ isMobile });
  const Icon = ({ fill }) => <SvgSettings height={130} width={130} fill={fill} />;

  function onUsernameChange(e) {
    if (e) {
      e.preventDefault();
    }

    setUsername(e.target.value);
  }

  async function handleSave() {
    await manager.databaseManager.updateUserTheme(theme);
    await manager.saveDatabase();

    const hasError = validateSettings({
      managerPassword: manager.password,
      username,
      ...passwordFields,
    });

    if (hasError) {
      setInputErrors(hasError);
      return;
    }

    const { newPassword } = passwordFields;

    manager.updateDatabaseName(username, newPassword || null);
    onClose();
  }

  return (
    <Overlay
      dataSelector={e2e.selectors.sidepanel.raw}
      footerButtonText={formatMessage(COMMON.SAVE_CHANGES)}
      isOpen={isOpen}
      Icon={Icon}
      hasCancelButton={false}
      onClick={handleSave}
      onClose={onClose}
      title={formatMessage(COMMON.SETTINGS)}
      type={panelVariant}
    >
      <div className={`settings-sidepanel-content ${name}`}>
        <div className="sidepanel-item">
          <TextInput
            dataSelector={e2e.selectors.username.raw}
            label={formatMessage(SETTINGS.CHANGE_USERNAME)}
            hasError={inputErrors.username}
            onChange={onUsernameChange}
            value={username}
          />
        </div>
        <ChangePasswordFormLayout
          formatMessage={formatMessage}
          isMobile={isMobile}
          inputErrors={inputErrors}
          passwordFields={passwordFields}
          setPasswordFields={setPasswordFields}
        />
        <ThemeToggle formatMessage={formatMessage} theme={theme} />
      </div>
    </Overlay>
  );
}


SettingsSidepanelView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const stateMapper = getRdxSelectionMapper({
  theme: 'getTheme',
});

const SettingsSidepanel = connect(stateMapper)(injectIntl(SettingsSidepanelView));

export { SettingsSidepanel };
