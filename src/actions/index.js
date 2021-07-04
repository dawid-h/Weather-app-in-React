
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

export const setPeriod = (period) => {
  return {
    type: period
  };
}

export const addCache = (place, forecast) => {
  return {
    type: 'ADD',
    place,
    forecast
  }
}