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
    home: getDataSelector('myWallets.page'),
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

export const myWallets = {
  selectors: {
    page: getDataSelector('myWallets.page'),
  },
  values: {
    header: 'My Wallets',
  },
};

export const settings = {
  selectors: {
    sidepanel: getDataSelector('settings.sidepanel'),
    changePassword: getDataSelector('settings.change-password'),
    confirmedPassword: getDataSelector('settings.confirmed-password'),
    currentPassword: getDataSelector('settings.current-password'),
    logout: getDataSelector('settings.logout'),
    newPassword: getDataSelector('settings.new-password'),
    openBtn: getDataSelector('settings.open-btn'),
    saveBtn: getDataSelector('settings.sidepanel-footer-btn'),
    themeToggle: getDataSelector('settings.theme-toggle'),
    themeToggleTrue: getDataSelector('settings.theme-toggle-true'),
    username: getDataSelector('settings.username'),
  },
  values: {
    newUsername: 'Renamed',
    newPassword: 'Changed',
    currentUsername: common.values.username,
    currentPassword: common.values.password,
  },
};
