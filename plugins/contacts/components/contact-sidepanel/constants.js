const FIELDS = {
  NAME: 'name',
  ADDRESS: 'address',
  DESCRIPTION: 'description',
};

const VALIDATIONS = {
  ADDRESS_MIN_LENGTH: 24,
  ADDRESS_REGEX: /^[a-z0-9]+$/i,
  TEXT_REGEX: /^[a-z0-9 ]*$/i,
};

export {
  FIELDS,
  VALIDATIONS,
};
