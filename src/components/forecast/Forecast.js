import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCache } from "../../actions";
import { useWeatherAPI } from "../../hooks/useWeatherAPI";
import { Daily } from "./components/daily";
import { Hourly } from "./components/hourly";
import { Realtime } from "./components/realtime";

export function Forecast() {
  const dispatch = useDispatch();
  const period = useSelector(x => x.period);
  const place = useSelector(x => x.place);
  const forecast = useSelector(x => x.cache[period][place.lat + ',' + place.lon]);
  const [state, setState] = useState({
    loading: (forecast === undefined),
    forecast: forecast
  });
  const key = useWeatherAPI();

  useEffect(() => {
    setState({
      loading: (forecast === undefined),
      forecast: forecast
    });
  }, [place, forecast]); // czy to potrzebne

  if (state.loading) {
    if (place.lat !== undefined && place.lon !== undefined) {
      console.log(period + ' ' + place.lat + ' ' + place.lon);
      fetch(`http://api.weatherapi.com/v1/${period === 'REALTIME' ? 'current.json?' :
            'forecast.json?days=3&'}key=${key}&q=${place.lat},${place.lon}`
      ).then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      }).then(data => {
        setState({loading: false, forecast: data});
        dispatch(addCache(place, period, data));
      }).catch(() => {
        setState({loading: false, forecast: undefined});
      });
    }
    return (
      <div>loading...</div>
    );
  }
  else {
    if (state.forecast !== undefined) {
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