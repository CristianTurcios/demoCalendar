export const REMOVE_REMINDER = 'REMOVE_REMINDER';
export const ADD_REMINDER = 'ADD_REMINDER';
export const REMOVE_ALL_REMINDERS = 'REMOVE_ALL_REMINDERS';
export const ADD_FORECAST = 'ADD_FORECAST';
export const SET_FILTER = 'SET_FILTER';
export const addReminder = reminder => {
  return {
    type: ADD_REMINDER,
    reminderToAdd: reminder
  };
};

export const removeReminder = (date, index) => {
  return {
    type: REMOVE_REMINDER,
    index: index,
    date: date
  };
};

export const removeAllReminders = date => {
  return {
    type: REMOVE_ALL_REMINDERS,
    date: date
  };
};

export const addForecast = forecast => {
  return {
    type: ADD_FORECAST,
    forecast: forecast
  };
};

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter: filter
  };
};
