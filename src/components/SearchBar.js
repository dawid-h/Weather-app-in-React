import React, { useRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch } from 'react-redux';
import { setPlace } from '../actions';
import { matchingNames$ } from '../hooks/useLocationList';
import { Loading } from './Loading';
import DropDownList from './styles/DropDownList';

export function SearchBar(yourLocation) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    value: yourLocation.name,
    items: [yourLocation],
    loading: false
  });
  const typingTimerRef = useRef(null);
  const isSimilar = (original, compared) => {
    return original.toLowerCase().indexOf(compared.toLowerCase()) === 0;
  }

  function fetchDataFromAPI(value) {
    if (value === '') {
      setState({value, items: [yourLocation], loading: false});
      return;
    }
    matchingNames$(encodeURI(value)).subscribe({
      next: data => setState({
        value, 
        items: isSimilar(yourLocation.name, value) ? [yourLocation, ...data] : data, 
        loading: false
      }),
      error: err => {
        setState({value, items: [], loading: false});
        console.log(err);
      }
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
