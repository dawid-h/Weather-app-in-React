
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

export const addCache = (place, period, forecast) => {
  return {
    place,
    type: period,
    forecast
  }
}