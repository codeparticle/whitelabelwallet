import { bindActionCreators } from 'redux';
import actions from 'rdx/actions';
import selectors from 'rdx/selectors';

const getValidActions = (actionsRequested) => {
  const validActions = {};
  if (!actionsRequested) {
    return validActions;
  }
  for (let i = 0; i < actionsRequested.length; i += 1) {
    const name = actionsRequested[i];
    const action = actions[name];
    if (!action) {
      console.error(`no action found with name ${name}`);
    } else {
      validActions[name] = action;
    }
  }
  return validActions;
};

const getValidSelectors = (selectorsRequested) => {
  const validSelectors = {};
  if (!selectorsRequested) {
    return validSelectors;
  }
  const selectorKeys = Object.keys(selectorsRequested);
  for (let i = 0; i < selectorKeys.length; i += 1) {
    const key = selectorKeys[i];
    const info = selectorsRequested[key];
    const selector = selectors[info];
    if (!selector) {
      console.error(`no selector found with info: ${info}`);
    } else {
      validSelectors[key] = selector;
    }
  }
  return validSelectors;
};

export const getRdxActionMapper = (actionsRequested) => {
  const validActions = getValidActions(actionsRequested);
  return dispatch => bindActionCreators(validActions, dispatch);
};

export const getRdxSelectionMapper = (selectorsRequested) => {
  const validSelectors = getValidSelectors(selectorsRequested);
  return (globalState) => {
    const componentState = {};
    const keys = Object.keys(validSelectors);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const selector = validSelectors[key];
      componentState[key] = selector(globalState);
    }
    return componentState;
  };
};
