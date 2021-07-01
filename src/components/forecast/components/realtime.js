
export function Realtime(props) {
  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <h2>{props.current.temp_c}°C</h2>
      <img src={`http:${props.current.condition.icon}`} alt="current weather" />
      <p>{props.current.condition.text}</p>
    </div>
  );
}