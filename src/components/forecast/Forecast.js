import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCache } from "../../actions";
import { weatherForecast$ } from "../../hooks/useWeatherAPI";
import { Daily } from "./components/daily";
import { Hourly } from "./components/hourly";
import { Realtime } from "./components/realtime";
import { Loading } from "../Loading";

export function Forecast() {
  const dispatch = useDispatch();
  const period = useSelector(x => x.period);
  const place = useSelector(x => x.place);
  const forecast = useSelector(x => x.cache[place.lat + ',' + place.lon]);
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      loading: (forecast === undefined),
      forecast: forecast
    });
  }, [place, forecast]);

  if (state.loading) {
    if (place.lat !== undefined && place.lon !== undefined) {
      weatherForecast$(place.lat, place.lon).subscribe({
        next: data => {
          setState({loading: false, forecast: data});
          dispatch(addCache(place, data));
        },
        error: err => {
          setState({loading: false, forecast: undefined});
          console.log(err);
        }
      });
    }
    return (<Loading />);
  }
  else {
    if (state.forecast !== undefined) {
      // console.log(state.forecast);
      // return ( <div>test</div> );
      switch (period) {
        case 'DAILY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: undefined});
          else return (
            <Daily {...state.forecast} />
          );
          break;
        case 'HOURLY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: undefined});
          else return (
            <Hourly {...state.forecast} />
          );
          break;
        case 'REALTIME':
        default:
          return (
            <Realtime {...state.forecast} />
          );
      }
    }
    return (
      <div>Loading data went wrong.</div>
    );
  }
}