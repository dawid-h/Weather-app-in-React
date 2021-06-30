import React, { useRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { Forecast } from './components/Forecast';
import { useWeatherAPI } from './hooks/useWeatherAPI';


function App() {
  const [state, setState] = useState({
    value: '',
    items: [],
    loading: false
  });
  const key = useWeatherAPI();
  const typingTimerRef = useRef(null);
  const [place, setPlace] = useState({});

  async function fetchDataFromAPI(value) {
    // proposal: if (value === '') { setState(value, items: [], loading: false); return; }
    fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${encodeURI(value)}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({value, items: data, loading: false});
      })
      .catch(() => {
        setState({value, items: [], loading: false});
      });
  }

  return (
    <div className="App">
      <Autocomplete
        value={state.value}
        items={state.items}
        getItemValue={(item) => item.name}
        onSelect={(val, item) => {
          setState({...state, value: val, items: [item]});
          setPlace(item);
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
            state.value === '' ? (<div>Type a city name</div>) :
            state.loading ? (<div>Loading...</div>) :
            state.items.length === 0 ? (<div>No matches for {value}</div>) :
            items
          }</div>
        )}
      />
      <Forecast localization={place} />
    </div>
  );
}

export default App;
