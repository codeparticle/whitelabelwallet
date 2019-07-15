import { put } from 'redux-saga/effects';
import arActions from 'rdx/modules/active-requests/actions';
import appActions from 'rdx/modules/app/actions';

export const composeRequestTracker = saga => function* trackRequests(action) {
  let requestRemoved = false;
  const addAction = arActions.addActiveRequest(action);
  const removeAction = arActions.removeActiveRequest(action);
  yield put(addAction);
  try {
    const actions = yield* saga(action);
    // tracker can batch actions if returned by saga
    if (actions && Array.isArray(actions)) {
      requestRemoved = true;
      yield put(appActions.batchActions(
        actions.concat(removeAction),
      ));
    }
  } finally {
    if (!requestRemoved) {
      yield put(removeAction);
    }
  }
};

export default (effect, type, saga) => effect(type, composeRequestTracker(saga));
