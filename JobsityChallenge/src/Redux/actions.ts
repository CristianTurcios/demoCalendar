import { Reminder, DayOfMonth } from './Interface';

export const ADD_REMINDER = 'ADD_REMINDER';

export const addReminder = (day, reminder) => {
  return {
    type: ADD_REMINDER,
    reminderToAdd: { day: day, reminder: reminder }
  };
};
