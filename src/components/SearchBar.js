import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useWeatherAPI } from '../hooks/useWeatherAPI';


export function SearchBar() {
  let places = [
    {
      id: 2814953,
      name: "The Borough, Southwark, Greater London, United Kingdom",
      region: "Southwark, Greater London",
      country: "United Kingdom",
      lat: 51.5,
      lon: -0.09,
      url: "the-borough-southwark-greater-london-united-kingdom"
    },
    {
      id: 2805239,
      name: "Newington, Southwark, Greater London, United Kingdom",
      region: "Southwark, Greater London",
      country: "United Kingdom",
      lat: 51.5,
      lon: -0.09,
      url: "newington-southwark-greater-london-united-kingdom"
    },
    {
      id: 2780897,
      name: "Bermondsey, Southwark, Greater London, United Kingdom",
      region: "Southwark, Greater London",
      country: "United Kingdom",
      lat: 51.5,
      lon: -0.08,
      url: "bermondsey-southwark-greater-london-united-kingdom"
    },
    {
      id: 2817832,
      name: "Walworth, Southwark, Greater London, United Kingdom",
      region: "Southwark, Greater London",
      country: "United Kingdom",
      lat: 51.49,
      lon: -0.09,
      url: "walworth-southwark-greater-london-united-kingdom"
    },
    {
      id: 2812948,
      name: "St George In The East, Tower Hamlets, Greater London, United Kingdom",
      region: "Tower Hamlets, Greater London",
      country: "United Kingdom",
      lat: 51.51,
      lon: -0.06,
      url: "st-george-in-the-east-tower-hamlets-greater-london-united-kingdom"
    },
    {
      id: 2817859,
      name: "Wapping, Tower Hamlets, Greater London, United Kingdom",
      region: "Tower Hamlets, Greater London",
      country: "United Kingdom",
      lat: 51.51,
      lon: -0.06,
      url: "wapping-tower-hamlets-greater-london-united-kingdom"
    },
    {
      id: 2817507,
      name: "Vauxhall, Lambeth, Greater London, United Kingdom",
      region: "Lambeth, Greater London",
      country: "United Kingdom",
      lat: 51.49,
      lon: -0.12,
      url: "vauxhall-lambeth-greater-london-united-kingdom"
    },
    {
      id: 2799249,
      name: "Lambeth, Lambeth, Greater London, United Kingdom",
      region: "Lambeth, Greater London",
      country: "United Kingdom",
      lat: 51.49,
      lon: -0.12,
      url: "lambeth-lambeth-greater-london-united-kingdom"
    },
    {
      id: 2784507,
      name: "Camberwell, Southwark, Greater London, United Kingdom",
      region: "Southwark, Greater London",
      country: "United Kingdom",
      lat: 51.48,
      lon: -0.08,
      url: "camberwell-southwark-greater-london-united-kingdom"
    },
    {
      id: 2801268,
      name: "London, City of London, Greater London, United Kingdom",
      region: "City of London, Greater London",
      country: "United Kingdom",
      lat: 51.52,
      lon: -0.11,
      url: "london-city-of-london-greater-london-united-kingdom"
    }
  ];
  const [state, setState] = useState({
    value: '',
    items: [],
    loading: false
  });
  const key = useWeatherAPI();

  return (
    <Autocomplete
      value={state.value}
      items={state.items}
      getItemValue={(item) => item.name}
      onSelect={(val, item) => setState({...state, value: val, items: [item]})}
      onChange={(e) => {
        setState({...state, value: e.target.value, loading: true});
        setState((state) => {
          fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${state.value}`)
            .then(response => {
              if (!response.ok) throw Error("No connection");
              return response.json();
            })
            .then(data => {
              setState({...state, items: data, loading: false});
            })
            .catch(() => {
              setState({...state, items: [], loading: false})
            });
          return state;
        });
      }}
      renderItem={(item, isHighlighted) =>
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
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
  );
}