
export const localizationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HERE':
      return {};
    case 'ELSEWHERE':
      return action.place;
    default:
      return state;
  }
}