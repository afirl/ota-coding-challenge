import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity, STATE, Streak } from '@ota-coding/interfaces';
import mockActivities from '../data/activities.mock';
import { format, subDays, differenceInDays } from 'date-fns';


@Injectable()
export class StreaksService {

  // This will clone mock activities from json data
  private getMockActivities(): Activity[] {
    return JSON.parse(JSON.stringify(mockActivities));
  }

  // For validation of case number
  private caseRange: number = 3

  getStreak(caseNumber: number): Streak {

    if (!(caseNumber <= this.caseRange && caseNumber > 0)) {
      throw new NotFoundException();
    }

    let days: Activity[] = [];
    let mockActivities = this.getMockActivities();
    
    const today = new Date();
    const dateFormat = 'yyyy-MM-dd';
    const formattedDateToday = format(new Date(), dateFormat);

    const formattedSubDate = (num: number): string => {
      const daysAgo = subDays(today, num);
      return format(daysAgo, dateFormat);
    }

    // Setup activites for each case
    for (const activity of mockActivities) {
      let todayActivityCount = 0;
      
      // 3 day recovery success
      if (caseNumber == 1) {

        // Set activity count today for case 1
        todayActivityCount = 3

        // Set 1 activity for 3 days ago
        if (activity.date == formattedSubDate(3)) {
          activity.activities = 1;
        }
        
        // 3 day recovery ongoing
      } else if (caseNumber == 2) {

        // Set activity count today for case 1
        todayActivityCount = 1

        // Set 1 activity for 4 days ago
        if (activity.date == formattedSubDate(4)) {
          activity.activities = 1;
        }

        // Set 1 activity for 3 days ago
        if (activity.date == formattedSubDate(3)) {
          activity.activities = 1;
        }

      // 3 day recovery fail
      } else if (caseNumber == 3) {

        // Set 1 activity for 4 days ago
        if (activity.date == formattedSubDate(4)) {
          activity.activities = 1;
        }

        // Set 3 activities for 3 days ago
        if (activity.date == formattedSubDate(1)) {
          activity.activities = 3;
        }

      }

      // Set 3 activities for today
      if (activity.date == formattedDateToday) {
        activity.activities = todayActivityCount;
      }

      days.push(activity)
    }    

    let hasPrevActivity: boolean = false;
    let dateOfLastActivity: string | null = null;
    let totalActivityCount: number = 0;
    let dayCount: number = 1;

    // Map days, Identity the State of activities
    days = days.map((data) => {

      totalActivityCount += data.activities;

      const countBetweenDaysOfLastActivity = dateOfLastActivity 
        ? differenceInDays(data.date, dateOfLastActivity) 
        : 0;

      if (data.activities > 0 && totalActivityCount >= dayCount) {
        // Set Completed if match or exceed the needed activity
        data.state = STATE.COMPLETED
      }

      // Set state incomplete if current day and the total activity count wasn't enough
      if (data.date == formattedDateToday && dayCount !== totalActivityCount) {
        data.state = STATE.INCOMPLETE
      }

      // Check At Risk or Saved State
      if (data.state == STATE.INCOMPLETE) {

        // Set state at risk if streak has existed previously and current day is first or second after that completed day
        if (hasPrevActivity && data.date == formattedDateToday 
          && (countBetweenDaysOfLastActivity == 1 || countBetweenDaysOfLastActivity > 2)) {
          data.state = STATE.AT_RISK;
        }
        
        // Set saved state if a streak has existed previously and after one day of inactivity (at risk) we have a day with 
        // min. 2 activities, or after two days of inactivity (at risk) we have a day with min. 3 activities.
        if (hasPrevActivity && data.date <= formattedDateToday &&
          ((countBetweenDaysOfLastActivity == 1 && totalActivityCount > 1) ||
          (countBetweenDaysOfLastActivity == 2 && totalActivityCount > 2))
        ) {
          data.state = STATE.SAVED;
        }

      }

      if (data.activities > 0) {
        // Set flag for prev activity 
        hasPrevActivity = true;
        // Set last activity
        dateOfLastActivity = data.date;
      }

      // increment day count
      dayCount++;

      return data;
    })

    return {
      total: totalActivityCount,
      activitiesToday: days.find(data => data.date === formattedDateToday)?.activities ?? 0,
      days
    }
  }


}
