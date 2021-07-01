
export const cacheReducer = (state = {REALTIME: {}, HOURLY: {}, DAILY: {}}, action) => {
  const newState = {...state};
  switch (action.type) {
    case 'REALTIME':
      newState.REALTIME[action.place] = action.forecast;
      console.log(newState);
      return newState;
    case 'HOURLY':
    case 'DAILY':
      newState.HOURLY[action.place] = action.forecast;
      newState.DAILY[action.place] = action.forecast;
      console.log(newState);
      return newState;
    default:
      console.log(state);
      return state;
  }
}