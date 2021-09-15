import { catchError, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function matchingNames$(string) {
  return fromFetch(`http://api.weatherapi.com/v1/search.json?key=` +
    `${process.env.REACT_APP_WEATHER_API_KEY}&q=${string}`).pipe(
      switchMap(response => response.ok ?
        response.json() : 
        of({
          error: true, 
          message: `Error ${response.status}`
        })),
      catchError(err => of({error: true, message: err.message}))
    );
}