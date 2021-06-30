
export const setPlace = (place) => {
  if (place === undefined)
    return {
      type: 'HERE'
    }
  else
    return {
      type: 'ELSEWHERE',
      place
    }
}