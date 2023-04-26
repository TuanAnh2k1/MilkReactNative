import {call, put} from 'redux-saga/effects';
import getComments from '../getComments';

export default function* (action: any) {
  console.log('Comment Saga -ACtion: ', action);
  const comments = yield call(getComments);
  yield put({type: 'GET_COMMENTS_SUCCESS', payload: comments});
}
