import { Reminder, DayOfMonth } from './Interface';

export const ADD_REMINDER = 'ADD_REMINDER';

export const addReminder = reminder => {
  return {
    type: ADD_REMINDER,
    reminderToAdd: reminder
  };
};
