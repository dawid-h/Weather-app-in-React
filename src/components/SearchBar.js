import React, { useRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch } from 'react-redux';
import { setPlace } from '../actions';
import { useWeatherAPI } from '../hooks/useWeatherAPI';
import { Loading } from './Loading';
import DropDownList from './styles/DropDownList';

export function SearchBar(yourLocation) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    value: yourLocation.name,
    items: [yourLocation],
    loading: false
  });
  const key = useWeatherAPI();
  const typingTimerRef = useRef(null);
  const isSimilar = (original, compared) => {
    return original.toLowerCase().indexOf(compared.toLowerCase()) === 0;
  }

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
        setState({
          value, 
          items: isSimilar(yourLocation.name, value) ? [yourLocation, ...data] : data, 
          loading: false
        });
      })
      .catch(() => {
        setState({value, items: [], loading: false});
      });
  }

  return (
    <div>
      <p>Choose the location:</p>
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
          <div key={item.id} style={{background: isHighlighted ? 'lightgray' : 'white'}}>
            {item.name}
          </div>
        }
        renderMenu={(items, value) => (
          <DropDownList>{
            state.loading ? (
              <Loading />
            ) : state.items.length === 0 ? (
              <p>No matches for "{value}"</p>
            ) : items
          }</DropDownList>
        )}
      />
    </div>
  );
}
