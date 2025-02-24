import { STATE } from "@ota-coding/interfaces";

interface DayStatusProps {
  day: string;
  status: STATE
}

export default function DayStatus({day, status}: DayStatusProps) {
  const imgPath = `/icons/${status}.svg`;
  
  /**
   * @param date Should be in any date format Ex: YYYY-mm-dd
   * @returns The string format of day in short form. Ex: Mon, Tue, Wed
   */
  const getDateDayName = (date: string) => {
    return new Date(date).toDateString().substring(0, 3);
  }

  return (
    <div className="flex flex-col items-center bg-white border-solid border-b-2 border-streak-gray-primary pt-1 pb-2 min-w-[53.57px] gap-2">
      <img src={imgPath} alt={status} />
      <span className="uppercase text-xs text-streak-gray-secondary">{ getDateDayName(day) }</span>
    </div>
  )
}