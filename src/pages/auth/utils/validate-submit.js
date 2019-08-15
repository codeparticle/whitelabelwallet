import { createRule, validateObject } from '@codeparticle/formal';
import { AUTH_CONSTANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

const { AUTH } = TRANSLATION_KEYS;
const { SIGNUP, ERRORS } = AUTH_CONSTANTS;

const {
  MISSING_FIELDS,
  PASSWORD_MISMATCH,
} = AUTH;

const {
  MISMATCH,
  MISSING_FIELD,
} = ERRORS;

const signupCondition = (type, condition) => type !== SIGNUP || condition;

const isNotEmpty = createRule({
  condition: (str) => Boolean(str),
  message: MISSING_FIELD,
});

export function validateSubmit({
  username: USERNAME,
  password: PASSWORD,
  confirmPassword: CONFIRMED_PASSWORD,
  accepted: TOS,
  type,
  intl,
}) {
  const isNotRequiredOrEmpty = createRule({
    condition: (str) => signupCondition(type, Boolean(str)),
    message: MISSING_FIELD,
  });

  const matchesPassword = createRule({
    condition: (str) => signupCondition(type, PASSWORD === str),
    message: MISMATCH,
  });

  const validationRules = {
    USERNAME: [isNotEmpty],
    PASSWORD: [isNotEmpty],
    CONFIRMED_PASSWORD: [isNotRequiredOrEmpty, matchesPassword],
    TOS: [isNotRequiredOrEmpty],
  };

  const formFields = {
    USERNAME,
    PASSWORD,
    CONFIRMED_PASSWORD,
    TOS,
  };

  const validateForm = validateObject(validationRules);
  const { errors = {}, hasErrors = false } = validateForm(formFields);

  if (hasErrors) {
    let misMatch = false;
    const messages = [];
    const inputErrors = {
      USERNAME: false,
      PASSWORD: false,
      CONFIRMED_PASSWORD: false,
    };

    Object.keys(errors).forEach((field) => {
      const error = errors[field];

      if (error.includes(MISSING_FIELD)) {
        messages.push(intl.formatMessage(AUTH[field]));
        inputErrors[field] = true;
      } else if (error.includes(MISMATCH)) {
        misMatch = true;
      }
    });

    if (messages.length) {
      const fields = messages.join(', ');
      const fieldCount = messages.length;

      return {
        message: MISSING_FIELDS,
        messageData: {
          fields,
          fieldCount,
        },
        inputErrors,
      };
    }

    if (misMatch) {
      return {
        message: PASSWORD_MISMATCH,
        inputErrors: {
          PASSWORD: true,
          CONFIRMED_PASSWORD: true,
        },
      };
    }
  }

  return false;
}
