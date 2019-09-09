import {
  signupTest,
  loginTest,
} from './auth';
import {
  deleteContactTest,
  editContactTest,
  newContactTest,
} from './contacts';
import {
  changePasswordTest,
  renameUserTest,
  toggleThemeTest,
} from './settings';

const flows = {
  changePasswordTest,
  deleteContactTest,
  editContactTest,
  loginTest,
  newContactTest,
  renameUserTest,
  signupTest,
  toggleThemeTest,
};

export default flows;
