import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Forecast } from './components/forecast/Forecast';
import { PeriodSwitch } from './components/Switch';

function App() {
  const [state, setState] = useState({});

  if (Object.keys(state).length === 0) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((pos) => {
        setState({
          latitude: pos.coords.latitude, 
          longitude: pos.coords.longitude
        });
      });
    return (
      <div>Please provide your geolocation to use this application.</div>
    );
  }

  return (
    <div>
      <SearchBar {...state} />
      <PeriodSwitch />
      <Forecast />
    </div>
  );
}

export default App;
