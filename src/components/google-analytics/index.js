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
import ReactGA from 'react-ga';
import { GA_TRACKING_REGEX } from 'config/google-analytics';

const { REACT_APP_GA_ID } = process.env;

// guarding against initializing GA if tracking
// code is not in the right format
if (GA_TRACKING_REGEX.test(REACT_APP_GA_ID)) {
  ReactGA.initialize(REACT_APP_GA_ID, {
    debug: true,
  });
}

// uncomment for logging special event
const logEvent = (category, action, label, value, nonInteraction = true) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
    nonInteraction,
  });
};

export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

// IMPORT_PT: update test event with real parameters
export const logTestEvent = (param) => {
  logEvent('Event Type', 'Test Event', param);
};
