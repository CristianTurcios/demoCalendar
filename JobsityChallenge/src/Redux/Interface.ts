import { Moment } from 'moment';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  days: { [key: string]: DayOfMonth }; // Key: Day of the month 1-(28/29/30/31)
  forecast: { [key: string]: Forecast };
}
export interface DayOfMonth {
  day: number;
  reminders: Reminder[]; // List of reminders of that day
}
export interface Reminder {
  date: Moment; // Date of the reminder
  reminder: string; // Reminder string, max 200 characteres.
  city: string; // City Name
  wheather: string; // It is going to be populated from an external API
  color: string; // Background color for reminder in calendar
}
export interface Forecast {
  date: Moment; // Date of the Forecast

  icon: string; // Icon name from Open Wheather Map
  description: string; // Description  from Open Wheather Map
  city: string; // City
}
