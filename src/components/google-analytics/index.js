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
