import Card from "@/components/Card";
import DayStatus from "@/components/DayStatus";
import { STATUS } from "@/interfaces/Status";

export default function HomeCase() {
  const items = [
    { day: "Sun", status: STATUS.COMPLETED },
    { day: "Mon", status: STATUS.COMPLETED },
    { day: "Tue", status: STATUS.COMPLETED },
    { day: "Wed", status: STATUS.COMPLETED },
    { day: "Thu", status: STATUS.COMPLETED },
    { day: "Fri", status: STATUS.COMPLETED },
    { day: "Sat", status: STATUS.INCOMPLETE }
  ]
  return (
    <div className="flex flex-col justify-center items-center max-w-[960px] min-h-[883px] mx-auto gap-6">
      <p className="text-streak-black-primary font-medium text-[56px] leading-[76.16px]">
        Your streak is 0 days
      </p>
      <Card className="flex flex-row !gap-0">
        {items.map((data) => 
          (<DayStatus day={data.day} status={data.status} />)
        )}        
      </Card>
    </div>
  )
}