
export const themeReducer = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return !state;
    default:
      return state;
  }
}