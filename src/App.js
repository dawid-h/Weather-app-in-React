import React from 'react';
import { SearchBar } from './components/SearchBar';
import { Forecast } from './components/Forecast';
import { PeriodSwitch } from './components/Switch';


function App() {
  return (
    <div>
      <SearchBar />
      <PeriodSwitch />
      <Forecast />
    </div>
  );
}

export default App;
