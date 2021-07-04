
export const cacheReducer = (state = {REALTIME: {}, HOURLY: {}, DAILY: {}}, action) => {
  const newState = {...state};
  switch (action.type) {
    case 'ADD':
      switch (action.period) {
        case 'REALTIME':
          newState.REALTIME[action.place.lat + ',' + action.place.lon] = action.forecast;
          return newState;
        case 'HOURLY':
        case 'DAILY':
          newState.HOURLY[action.place.lat + ',' + action.place.lon] = action.forecast;
          newState.DAILY[action.place.lat + ',' + action.place.lon] = action.forecast;
          return newState;
        default:
          return state;
      }
    default:
      return state;
  }
}