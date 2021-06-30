 
 export const periodReducer = (state = 'REALTIME', action) => {
  switch (action.type) {
    case 'REALTIME':
    case 'DAILY':
    case 'HOURLY':
      return action.type;
    default:
      return state;
  }
}