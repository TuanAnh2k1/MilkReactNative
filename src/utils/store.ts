import {store} from '../actions';

export const getLanguage = () => {
  const {auth} = store.getState();
  return auth.language;
};
