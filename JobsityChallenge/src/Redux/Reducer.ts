import { ADD_REMINDER } from './actions';
import { combineReducers, Reducer } from 'redux';
import { AppState, DayOfMonth } from './Interface';

export const days = (state: any[] = [], action) => {
  switch (action.type) {
    case ADD_REMINDER:
      if (action.reminderToAdd.reminder.reminder.length <= 200) {
        if (typeof state[action.reminderToAdd.day] === 'undefined') {
          state[action.reminderToAdd.day] = { reminders: [] };
        }

        state[action.reminderToAdd.day].reminders = [
          ...state[action.reminderToAdd.day].reminders,
          action.reminderToAdd.reminder
        ];

        return state;
      } else {
        return state;
      }

    default:
      return state;
  }
};

export const reducer: Reducer<AppState> = combineReducers({
  days
});
