function getDataSelector (selector) {
  return {
    attr: `[data-selector="${selector}"]`,
    raw: selector,
  };
}

const base = 'http://localhost:8080';

export const routes = {
  base,
  contacts: `${base}/contacts`,
  login: `${base}/login`,
  signup: `${base}/signup`,
};

export const common = {
  selectors: {
    navBar: getDataSelector('common.nav-bar'),
    pluginContacts: getDataSelector('common.nav-bar-contacts'),
  },
  values: {
    username: 'E2ETesting',
    password: 'Secr3t',
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
    addBtn: getDataSelector('contacts.add-button'),
    addressInput: getDataSelector('contacts.address-input'),
    contact: getDataSelector('contacts.contact'),
    contactList: getDataSelector('contacts.contact-list'),
    deleteBtn: getDataSelector('contacts.delete-btn'),
    descInput: getDataSelector('contacts.desc-input'),
    editBtn: getDataSelector('contacts.contact-edit'),
    header: getDataSelector('contacts.header'),
    nameInput: getDataSelector('contacts.name-input'),
    page: getDataSelector('contacts.page'),
    searchInput: getDataSelector('contacts.search-input'),
    sidepanel: getDataSelector('contacts.sidepanel'),
    sidepanelBtn: getDataSelector('contacts.sidepanel-footer-btn'),
  },
  values: {
    newContact: {
      name: 'Wayne',
      address: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
      desc: 'Party on, Garth',
    },
    editedContact: {
      name: 'Garth',
      address: '177GTMikAWWNo3rvYYKVbxEnb1DEb2JHfn',
      desc: 'You didn\'t tell them about the thing, did you?',
    },
    deletedContact: {
      name: 'Delete me',
      address: '177GTMikAWWNo3rvYYKVbxEnb1DEb2JHfn',
    },
  },
};

export const main = {
  selectors: {
    test: getDataSelector('main.test'),
    logout: getDataSelector('main.logout'),
  },
};

export const settings = {
  selectors: {
    sidepanel: getDataSelector('settings.sidepanel'),
    openBtn: getDataSelector('settings.open-btn'),
    username: getDataSelector('settings.username'),
    changePassword: getDataSelector('settings.change-password'),
    currentPassword: getDataSelector('settings.current-password'),
    newPassword: getDataSelector('settings.new-password'),
    confirmedPassword: getDataSelector('settings.confirmed-password'),
    themeToggle: getDataSelector('settings.theme-toggle'),
    themeToggleTrue: getDataSelector('settings.theme-toggle-true'),
    saveBtn: getDataSelector('settings.sidepanel-footer-btn'),
  },
  values: {
    newUsername: 'Renamed',
    newPassword: 'Changed',
    currentUsername: common.values.username,
    currentPassword: common.values.password,
  },
};
