
export const cacheReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD':
      const newState = {...state};
      newState[action.place.lat + ',' + action.place.lon] = action.forecast;
      return newState;
    default:
      return state;
  }
}