import './App.css';
import React from 'react';
import { SearchBar } from './components/SearchBar';
import { useWeatherAPI } from './hooks/useWeatherAPI';

function App() {
  const key = useWeatherAPI();
  
  // fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=lond`)
  //   .then(response => {
  //     if (!response.ok) throw Error("No Internet");
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(() => {
  //     console.log("an error has occured");
  //   });

  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
