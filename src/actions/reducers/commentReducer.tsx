const initData = {
  comments: [],
  isLoading: false,
};

export default commentReducer = (
  state = initData,
  {type, payload}: {type: any; payload: any},
) => {
  switch (type) {
    case 'GET_COMMENTS':
      return {
        ...state,
        isLoaing: true,
      };
    case 'GET_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
