import {all, takeEvery} from 'redux-saga/effects';
import commentSaga from './commentSaga';
export default sagas = function* () {
  yield all([takeEvery('GET_COMMENTS', commentSaga)]);
};
