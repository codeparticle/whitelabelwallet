/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
