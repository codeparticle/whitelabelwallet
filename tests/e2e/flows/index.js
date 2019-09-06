import {
  signupTest,
  loginTest,
} from './auth';
import {
  deleteContactTest,
  editContactTest,
  newContactTest,
} from './contacts';

const flows = {
  deleteContactTest,
  editContactTest,
  loginTest,
  signupTest,
  newContactTest,
};

export default flows;
