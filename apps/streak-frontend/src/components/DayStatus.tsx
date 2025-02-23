import { STATUS } from "@/interfaces/Status";

interface DayStatusProps {
  day: string;
  status: STATUS
}

export default function DayStatus({day, status}: DayStatusProps) {
  const imgPath = `/icons/${status}.svg`;

  return (
    <div className="flex flex-col items-center bg-white border-solid border-b-2 border-streak-gray-primary pt-1 pb-2 min-w-[53.57px] gap-2">
      <img src={imgPath} alt={status} />
      <span className="uppercase text-xs text-streak-gray-secondary">{ day }</span>
    </div>
  )
}