import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Forecast } from './components/forecast/Forecast';
import { PeriodSwitch } from './components/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { setPlace, toggleTheme } from './actions';
import { ThemeProvider } from "styled-components";
import "./style.css";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import Container from "./components/styles/Container";
import ThemeSwitch from "./components/styles/ThemeSwitch"

function App() {
  const [defaultLocation, setDefaultLocation] = useState({});
  const isDarkModeOn = useSelector(x => x.theme);
  const dispatch = useDispatch();

  if (Object.keys(defaultLocation).length === 0) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((pos) => {
        setDefaultLocation({
          name: 'Your location',
          id: 0,
          lat: pos.coords.latitude, 
          lon: pos.coords.longitude
        });
      });
    return (
      <ThemeProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
        <Container>
          <p>Please provide your geolocation to use this application.</p>
        </Container>
      </ThemeProvider>
    );
  }

  dispatch(setPlace(defaultLocation));
  return (
    <ThemeProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
      <Container>
        <ThemeSwitch onClick={() => dispatch(toggleTheme())}>
          Change your theme
        </ThemeSwitch>
        <SearchBar {...defaultLocation} />
        <PeriodSwitch />
        <Forecast />
      </Container>
    </ThemeProvider>
  );
}

export default App;
