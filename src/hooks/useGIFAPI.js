import { catchError, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

export function data$(query) {
  return fromFetch(`https://api.tenor.com/v1/search?q=${query}&media_filt` +
                   `er=minimal&content_filter=high&locale=en_ZA&limit=50`).pipe(
            switchMap(response => response.ok ?
               response.json() : 
               of({
                 error: true, 
                 message: `Error ${response.status}`
               })),
            catchError(err => of({error: true, message: err.message}))
         );
}