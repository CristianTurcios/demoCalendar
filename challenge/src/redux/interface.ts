import { Moment } from 'moment';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  days: { [key: string]: DayOfMonth }; // Key: Day of the month 1-(28/29/30/31)
  forecast: { [key: string]: Forecast };

  filter: Filter;
}
export interface Filter {
  month: number;
  monthName: string;
  year: number;
  start: Moment;
  end: Moment;
}
export interface DayOfMonth {
  day: number;
  reminders: Reminder[]; // List of reminders of that day
}
export interface Reminder {
  date: Moment; // Date of the reminder
  reminder: string; // Reminder string, max 200 characteres.
  city: string; // City Name
  color: string; // Background color for reminder in calendar
  forecast: Forecast; // Forecast information gotten from weather provider
}
export interface Forecast {
  date: Moment; // Forecast date
  icon: string; // Icon name from Open Wheather Map
  city: string; // City Name
  description: string; // Description  from Open Wheather Map
}
