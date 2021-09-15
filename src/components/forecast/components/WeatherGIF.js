import { useEffect, useRef, useState } from "react";
import { data$ } from "../../../hooks/useGIFAPI";
import { Loading } from "../../Loading";

export function WeatherGIF(props) {
  const gifSwitch = useRef(null);
  const [gifs, setGifs] = useState({});
  const [gif, setGif] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(gifSwitch.current);
    }
  }, []);

  if (gifs === undefined)
    return (<p>The pictures cannot be loaded.</p>);

  if (Object.keys(gifs).length === 0) {

    data$(encodeURI(props.condition)).subscribe({
      next: data => setGifs(data),
      error: err => {setGifs(undefined); console.log(err);}
    })

    return (<Loading />);
  }

  clearInterval(gifSwitch.current);
  gifSwitch.current = setInterval(
    () => setGif((gif + 1) % gifs.results.length), 30000
  );
  
  return (
    <>
      <hr />
      <p>But currently the weather is like</p>
      <img src={gifs.results[gif].media[0].gif.url} alt="weather GIF" width="100%"/>
    </>
  );
}