export enum STATE {
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
  AT_RISK = 'AT_RISK',
  SAVED = 'SAVED'
}

export interface Activity {
  date: string;
  activities: number;
  state: STATE; 
}

export interface Streak {
  activitiesToday: number;
  total: number;
  days: Activity[];
}