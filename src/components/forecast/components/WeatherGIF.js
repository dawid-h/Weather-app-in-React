import { useRef, useState } from "react";
import { Loading } from "../../Loading";
import MediumImg from "../../styles/MediumImg";

export function WeatherGIF(props) {
  const gifSwitch = useRef(null);
  const [gifs, setGifs] = useState({});
  const [gif, setGif] = useState(0);

  if (gifs === undefined)
    return (<p>Nie można załodować obrazków.</p>);

  if (Object.keys(gifs).length === 0) {
    fetch(`https://api.tenor.com/v1/search?q=${encodeURI(props.condition)}` +
          `&media_filter=minimal&content_filter=high&locale=en_ZA&limit=50`
    ).then(response => {
      if (!response.ok)
        throw Error("No connection");
      return response.json();
    }).then(data => setGifs(data)
    ).catch(() => setGifs(undefined));

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
      <MediumImg src={gifs.results[gif].media[0].gif.url} alt="" />
    </>
  );
}