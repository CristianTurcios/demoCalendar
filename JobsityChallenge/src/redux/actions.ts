import { Moment } from 'moment';
import { Reminder, Forecast, Filter } from './interface';

export const REMOVE_REMINDER = 'REMOVE_REMINDER';
export const ADD_REMINDER = 'ADD_REMINDER';
export const REMOVE_ALL_REMINDERS = 'REMOVE_ALL_REMINDERS';
export const ADD_FORECAST = 'ADD_FORECAST';
export const SET_FILTER = 'SET_FILTER';
export const addReminder = (reminder: Reminder) => {
  return {
    type: ADD_REMINDER,
    reminderToAdd: reminder
  };
};

export const removeReminder = (date: Moment, index: number) => {
  return {
    type: REMOVE_REMINDER,
    index: index,
    date: date
  };
};

export const removeAllReminders = (date: string) => {
  return {
    type: REMOVE_ALL_REMINDERS,
    date: date
  };
};

export const addForecast = (forecast: Forecast) => {
  return {
    type: ADD_FORECAST,
    forecast: forecast
  };
};

export const setFilter = (filter: Filter) => {
  return {
    type: SET_FILTER,
    filter: filter
  };
};
