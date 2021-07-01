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
  const forecast = useSelector(x => x.cache[period][place]);
  const [state, setState] = useState({
    loading: (forecast === undefined),
    forecast: forecast
  });
  const key = useWeatherAPI();
  const fetchData = (pos) => {
    console.log(period + " " + pos.coords.latitude + "," + pos.coords.longitude);
    fetch(`http://api.weatherapi.com/v1/${period === 'REALTIME' ? 'current.json?' :
          'forecast.json?days=3&'}key=${key}&q=${pos.coords.latitude},${pos.coords.longitude}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({loading: false, forecast: data});
        dispatch(addCache(place, period, data));
      })
      .catch(() => {
        setState({loading: false, forecast: undefined});
      });
  }

  useEffect(() => {
    setState({
      loading: (forecast === undefined),
      forecast: forecast
    });
  }, [place, forecast]); // czy to potrzebne

  if (state.loading) {
    if (Object.keys(place).length === 0)
      navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(fetchData) :
        setState({loading: false, forecast: undefined});
    else fetchData({coords: {
      latitude: place.lat,
      longitude: place.lon
    }});
    return (
      <div>loading...</div>
    );
  }
  else {
    if (state.forecast === undefined) {
      return (
        <div>Loading data went wrong. Check if geolocation is supported.</div>
      );
    }
    else {
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
  }
}