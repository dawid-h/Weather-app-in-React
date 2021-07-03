
export const cacheReducer = (state = {REALTIME: {}, HOURLY: {}, DAILY: {}}, action) => {
  const newState = {...state};
  console.log(action.place);
  switch (action.type) {
    case 'REALTIME':
      newState.REALTIME[action.place.lat + ',' + action.place.lon] = action.forecast;
      console.log(newState);
      return newState;
    case 'HOURLY':
    case 'DAILY':
      newState.HOURLY[action.place.lat + ',' + action.place.lon] = action.forecast;
      newState.DAILY[action.place.lat + ',' + action.place.lon] = action.forecast;
      console.log(newState);
      return newState;
    default:
      console.log(state);
      return state;
  }
}