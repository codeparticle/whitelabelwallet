import { all } from 'redux-saga/effects';
import watchAuthSagas from 'rdx/modules/auth/sagas';
// IMPORT_PT (for script -- do not remove!)

function* rootSaga() {
  yield all([
    watchAuthSagas(),
    // INSERTION_PT (for script -- do not remove!)
  ]);
}

export default rootSaga;
