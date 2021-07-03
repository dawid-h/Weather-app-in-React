import React, { useRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setPlace } from '../actions';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

export function SearchBar(props) {
  const dispatch = useDispatch();
  const YOUR_LOCATION = useSelector(x => x.place);
  if (Object.keys(YOUR_LOCATION).length === 0) {
    YOUR_LOCATION.name = 'Your location';
    YOUR_LOCATION.id = 0;
    YOUR_LOCATION.lat = props.latitude;
    YOUR_LOCATION.lon = props.longitude;
    dispatch(setPlace(YOUR_LOCATION));
  }
  const [state, setState] = useState({
    value: YOUR_LOCATION.name,
    items: [YOUR_LOCATION],
    loading: false
  });
  const key = useWeatherAPI();
  const typingTimerRef = useRef(null);

  async function fetchDataFromAPI(value) {
    if (value === '') {
      setState({value, items: [YOUR_LOCATION], loading: false});
      return;
    }
    fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${encodeURI(value)}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({value, items: [YOUR_LOCATION, ...data], loading: false});
      })
      .catch(() => {
        setState({value, items: [], loading: false});
      });
  }

  return (
    <div>
      <h1>Choose the location</h1>
      <Autocomplete
        value={state.value}
        items={state.items}
        getItemValue={(item) => item.name}
        onSelect={(val, item) => {
          setState({...state, value: val, items: [item]});
          dispatch(setPlace(item));
        }}
        onChange={(e) => {
          setState({value: e.target.value, items: [], loading: true});
          clearTimeout(typingTimerRef.current);
          typingTimerRef.current = 
            setTimeout(() => fetchDataFromAPI(e.target.value), 500);
        }}
        renderItem={(item, isHighlighted) =>
          <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        }
        renderMenu={(items, value) => (
          <div>{
            state.loading ? (<div>Loading...</div>) :
            state.items.length === 0 ? (<div>No matches for {value}</div>) :
            items
          }</div>
        )}
      />
    </div>
  );
}
