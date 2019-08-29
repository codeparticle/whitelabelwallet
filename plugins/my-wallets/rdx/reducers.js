import types from './types';

const initialSate = {
  nickname: '',
  currentStep: 1,
  multiAddress: false,
};

export function newWalletReducer(state = initialSate, action) {
  switch (action.type) {
    case types.NEW_WALLET: {
      return { ...state, ...action.payload };
    }
    case types.CLEAR: {
      return { ...initialSate };
    }
    default:
      return state;
  }
}