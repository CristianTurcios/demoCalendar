import { Reminder, DayOfMonth } from './Interface';

export const ADD_REMINDER = 'ADD_REMINDER';
export const ADD_FORECAST = 'ADD_FORECAST';

export const addReminder = reminder => {
  return {
    type: ADD_REMINDER,
    reminderToAdd: reminder
  };
};

export const addForecast = forecast => {
  return {
    type: ADD_FORECAST,
    forecast: forecast
  };
};
