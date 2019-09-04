function getDataSelector (selector) {
  return {
    attr: `[data-selector="${selector}"]`,
    raw: selector,
  };
}

const base = 'http://localhost:8080';

export const routes = {
  base,
  login: `${base}/login`,
  signup: `${base}/signup`,
};

export const common = {
  values: {
    username: 'E2ETesting',
    password: 'Secr3t!',
  },
};

export const auth = {
  selectors: {
    page: getDataSelector('auth.page'),
    formLogin: getDataSelector('auth.form-login'),
    formSignup: getDataSelector('auth.form-signup'),
    username: getDataSelector('auth.username'),
    password: getDataSelector('auth.password'),
    confirm: getDataSelector('auth.confirm'),
    tos: getDataSelector('auth.tos'),
    btnPrimary: getDataSelector('auth.btn-primary'),
    btnSecondary: getDataSelector('auth.btn-secondary'),
  },
};

export const contacts = {
  selectors: {
    page: getDataSelector('contacts.page'),
    contact: getDataSelector('contacts.contact'),
  },
};

export const main = {
  selectors: {
    test: getDataSelector('main.test'),
    logout: getDataSelector('main.logout'),
  },
};
