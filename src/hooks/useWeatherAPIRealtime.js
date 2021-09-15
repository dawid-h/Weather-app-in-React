import { catchError, interval, map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function realtime$(latitude, longitude) {
  const FIFTEEN_MINUTES = 900000;

  return interval(FIFTEEN_MINUTES).pipe(
    map(() => fromFetch(`http://api.weatherapi.com/v1/current.json?days=3&key=` + 
    `${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`).pipe(
      switchMap(response => response.ok ?
        response.json() : 
        of({
          error: true, 
          message: `Error ${response.status}`
        })),
      catchError(err => of({error: true, message: err.message}))
    ))
  ).pipe(
    switchMap(value => value)
  );
}