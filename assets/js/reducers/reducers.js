const reducers = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_LECTURES':
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;