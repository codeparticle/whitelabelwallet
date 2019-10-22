import { DATE_OPTIONS } from 'lib/constants';
import { COMMON } from 'translations/keys/common';

const {
  TODAY,
  WEEK,
  MONTH,
  YEAR,
} = DATE_OPTIONS;

const {
  DATE_OPTION_TODAY,
  DATE_OPTION_WEEK,
  DATE_OPTION_MONTH,
  DATE_OPTION_YEAR,
  DATE_OPTION_ALL_TIME,
} = COMMON;

const getSelectOptions = (formatMessage, getDateValue) => {
  return [
    { value: getDateValue(TODAY), label: formatMessage(DATE_OPTION_TODAY) },
    { value: getDateValue(WEEK), label: formatMessage(DATE_OPTION_WEEK) },
    { value: getDateValue(MONTH), label: formatMessage(DATE_OPTION_MONTH) },
    { value: getDateValue(YEAR), label: formatMessage(DATE_OPTION_YEAR) },
    { value: getDateValue(), label: formatMessage(DATE_OPTION_ALL_TIME) },
  ];
};

export { getSelectOptions };