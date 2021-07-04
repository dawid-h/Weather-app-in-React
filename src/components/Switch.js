import { useDispatch, useSelector } from "react-redux";
import { setPeriod } from "../actions";
import PeriodButton from "./styles/PeriodButton";

export function PeriodSwitch() {
  const period = useSelector(x => x.period);
  const dispatch = useDispatch();
  const realtime = () => dispatch(setPeriod('REALTIME'));
  const daily = () => dispatch(setPeriod('DAILY'));
  const hourly = () => dispatch(setPeriod('HOURLY'));

  return (
    <>
      <PeriodButton chosen={period === 'REALTIME'} onClick={realtime}>
        Realtime
      </PeriodButton>
      <PeriodButton chosen={period === 'DAILY'} onClick={daily}>
        Daily
      </PeriodButton>
      <PeriodButton chosen={period === 'HOURLY'} onClick={hourly}>
        Hourly
      </PeriodButton>
    </>
  );
}