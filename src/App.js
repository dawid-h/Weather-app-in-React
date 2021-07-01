import React from 'react';
import { SearchBar } from './components/SearchBar';
import { Forecast } from './components/forecast/Forecast';
import { PeriodSwitch } from './components/Switch';
import { createStore } from 'redux';
import { allReducers } from './reducers';
import { Provider } from 'react-redux';

function App() {
  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <SearchBar />
      <PeriodSwitch />
      <Forecast />
    </Provider>
  );
}

export default App;
