import React, { useRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch } from 'react-redux';
import { setPlace } from '../actions';
import { useWeatherAPI } from '../hooks/useWeatherAPI';
import Loader from "react-loader-spinner";

export function SearchBar(yourLocation) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    value: yourLocation.name,
    items: [yourLocation],
    loading: false
  });
  const key = useWeatherAPI();
  const typingTimerRef = useRef(null);

  async function fetchDataFromAPI(value) {
    if (value === '') {
      setState({value, items: [yourLocation], loading: false});
      return;
    }
    fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${encodeURI(value)}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({value, items: [yourLocation, ...data], loading: false});
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
            state.loading ? (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            ) : state.items.length === 0 ? (
              <div>No matches for {value}</div>
            ) : items
          }</div>
        )}
      />
    </div>
  );
}
