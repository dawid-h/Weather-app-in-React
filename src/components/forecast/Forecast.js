import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCache } from "../../actions";
import { useWeatherAPI } from "../../hooks/useWeatherAPI";
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
  const key = useWeatherAPI();

  useEffect(() => {
    setState({
      loading: (forecast === undefined),
      forecast: forecast
    });
  }, [place, forecast]);

  if (state.loading) {
    if (place.lat !== undefined && place.lon !== undefined) {
      fetch(`http://api.weatherapi.com/v1/forecast.json?` +
            `key=${key}&q=${place.lat},${place.lon}&days=3`
      ).then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      }).then(data => {
        setState({loading: false, forecast: data});
        dispatch(addCache(place, data));
      }).catch(() => {
        setState({loading: false, forecast: undefined});
      });
    }
    return (<Loading />);
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