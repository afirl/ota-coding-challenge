import Card from "@/components/Card";
import DayStatus from "@/components/DayStatus";
import { useEffect, useState } from "react";
import { Activity } from "@ota-coding/interfaces";
import { useRouter } from "next/router";

export default function HomeCase() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([] as Activity[]);
  const router = useRouter();
  const { case: caseParam } = router.query;


  useEffect(() => {
    // Fetch data from server side api
    const fetchData = async () => {
      // Get case param from router
      const response = await fetch(`/api/streaks/${caseParam}`);
      const streakData = await response.json();

      setItems(streakData.days);
      setTotal(streakData.total);
    };

    if (caseParam) {
      fetchData();
    }
  }, 
  // Added caseParam to run when router param effect changes
  [caseParam]);

  return (
    <div className="flex flex-col justify-center items-center max-w-[960px] mx-auto gap-6">
      <p className="text-streak-black-primary font-medium text-[56px] leading-[76.16px]">
        Your streak is {total} days
      </p>
      <Card className="flex flex-row !gap-0">
        {items.sort((a, b) => {
          return (new Date(a.date).getTime() - new Date(b.date).getTime());
        }).map((data, key) => 
          (<DayStatus key={key} day={data.date} status={data.state} />)
        )}        
      </Card>
    </div>
  )
}