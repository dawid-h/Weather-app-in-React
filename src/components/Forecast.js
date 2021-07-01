import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWeatherAPI } from "../hooks/useWeatherAPI";

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
    console.log("hejka");
    setState({
      loading: true,
      forecast: {}
    });
  }, [period, place]);

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
      console.log(state.forecast);
      switch (period) {
        case 'DAILY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: {}});
          else return (
            <div>
              <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
              <span>
                <h2>Dzisiaj</h2>
                <h3>
                  {state.forecast.forecast.forecastday[0].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[0].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[0].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[0].day.condition.text}</p>
              </span>
              <span>
                <h2>Jutro</h2>
                <h3>
                  {state.forecast.forecast.forecastday[1].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[1].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[1].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[1].day.condition.text}</p>
              </span>
              <span>
                <h2>Pojutrze</h2>
                <h3>
                  {state.forecast.forecast.forecastday[2].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[2].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[2].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[2].day.condition.text}</p>
              </span>
            </div>
          );
          break;
        case 'HOURLY':
          if (state.forecast.forecast === undefined)
            setState({loading: true, forecast: {}});
          else return (
            <div>
              <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
              {state.forecast.forecast.forecastday[0].hour.map(x =>
                <div>
                  <h2>{x.time.substr(x.time.length - 5)}</h2>
                  <h3>{x.temp_c}°C</h3>
                  <img src={`http:${x.condition.icon}`} alt="" />
                  <p>{x.condition.text}</p>
                </div>
              )}
            </div>
          );
          break;
        case 'REALTIME':
        default:
          return (
            <div>
              <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
              <h2>{state.forecast.current.temp_c}°C</h2>
              <img src={`http:${state.forecast.current.condition.icon}`} alt="current weather" />
              <p>{state.forecast.current.condition.text}</p>
            </div>
          );
      }
    }
  }
}