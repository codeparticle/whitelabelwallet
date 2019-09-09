/**
 * @fileoverview ThemeToggle component used in settings sidepanel
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { THEME_KEYS, ToggleSwitch } from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxActionMapper } from 'rdx/utils/props-mapping';
import { TRANSLATION_KEYS } from 'translations/keys';

const { SETTINGS } = TRANSLATION_KEYS;
const { ENABLE_DARK_MODE } = SETTINGS;
const { LIGHT, DARK } = THEME_KEYS;

function ThemeToggleView({
  formatMessage,
  setTheme,
  theme,
}) {
  const [isDarkMode, setIsDarkMode] = useState(theme === DARK);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const themeKey = isDarkMode
      ? DARK
      : LIGHT;

    setTheme(themeKey);
  }, [isDarkMode]);

  return (
    <div className="sidepanel-item toggle-container">
      <label>
        <span>{formatMessage(ENABLE_DARK_MODE)}</span>
      </label>
      <ToggleSwitch
        onClick={toggleDarkMode}
        value={isDarkMode}
      />
    </div>
  );
};

ThemeToggleView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'setTheme',
]);

const ThemeToggle = connect(null, actionsMapper)(ThemeToggleView);

export { ThemeToggle };
