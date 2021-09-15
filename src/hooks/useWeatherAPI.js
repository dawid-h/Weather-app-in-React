import { catchError, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function weatherForecast$(latitude, longitude) {
  return fromFetch(`http://api.weatherapi.com/v1/forecast.json?days=3&key=` + 
  `${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`).pipe(
    switchMap(response => response.ok ?
      response.json() : 
      of({
        error: true, 
        message: `Error ${response.status}`
      })),
    catchError(err => of({error: true, message: err.message}))
  );
}