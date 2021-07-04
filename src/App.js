import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Forecast } from './components/forecast/Forecast';
import { PeriodSwitch } from './components/Switch';
import { useDispatch } from 'react-redux';
import { setPlace } from './actions';

function App() {
  const [state, setState] = useState({});
  const dispatch = useDispatch();

  if (Object.keys(state).length === 0) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((pos) => {
        setState({
          name: 'Your location',
          id: 0,
          lat: pos.coords.latitude, 
          lon: pos.coords.longitude
        });
      });
    return (
      <div>Please provide your geolocation to use this application.</div>
    );
  }

  dispatch(setPlace(state));
  return (
    <div>
      <SearchBar {...state} />
      <PeriodSwitch />
      <Forecast />
    </div>
  );
}

export default App;
