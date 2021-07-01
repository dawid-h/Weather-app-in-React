import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWeatherAPI } from "../../hooks/useWeatherAPI";
import { Daily } from "./components/daily";
import { Hourly } from "./components/hourly";
import { Realtime } from "./components/realtime";

export function Forecast() {
  const period = useSelector(x => x.period);
  const place = useSelector(x => x.place);
  const [state, setState] = useState({
    loading: true,
    forecast: {}
  });
  const key = useWeatherAPI();
  const fetchData = (pos) => {
    fetch(`http://api.weatherapi.com/v1/${period === 'REALTIME' ? 'current.json?' :
          'forecast.json?days=3&'}key=${key}&lang=pl&q=${pos.coords.latitude},${
          pos.coords.longitude}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({loading: false, forecast: data});
      })
      .catch(() => {
        setState({loading: false, forecast: {}});
      });
  }

  useEffect(() => {
    setState({
      loading: true,
      forecast: {}
    });
  }, [place]);

  if (state.loading) {
    if (Object.keys(place).length === 0)
      navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(fetchData) :
        setState({loading: false, forecast: {}});
    else fetchData({coords: {
      latitude: place.lat,
      longitude: place.lon
    }});
    return (
      <div>loading...</div>
    );
  }
  else {
    if (Object.keys(state.forecast).length === 0) {
      return (
        <div>Loading data went wrong. Check if geolocation is supported.</div>
      );
    }
    else {
      switch (period) {
        case 'DAILY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: {}});
          else return (
            <Daily {...state.forecast} />
          );
          break;
        case 'HOURLY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: {}});
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