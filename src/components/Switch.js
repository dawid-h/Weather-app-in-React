import { useDispatch } from "react-redux";
import { setPeriod } from "../actions";

export function PeriodSwitch() {
  const dispatch = useDispatch();
  const realtime = () => dispatch(setPeriod('REALTIME'));
  const daily = () => dispatch(setPeriod('DAILY'));
  const hourly = () => dispatch(setPeriod('HOURLY'));

  return (
    <div>
      <button onClick={realtime}>Realtime</button>
      <button onClick={daily}>Daily</button>
      <button onClick={hourly}>Hourly</button>
    </div>
  );
}