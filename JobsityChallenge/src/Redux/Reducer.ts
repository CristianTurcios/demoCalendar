import { ADD_REMINDER } from './actions';
import { combineReducers, Reducer } from 'redux';
import { AppState } from './Interface';

/*
2019/05/08
Adding reducer that will:
Check whether the day of week is already defined. If not, will define it.
Check whether the reminder has less than 30 characters. If no, it will not add the reminder.
Andrés Maltés
*/
export const days = (state: any[] = [], action) => {
  switch (action.type) {
    case ADD_REMINDER:
      if (typeof state[action.reminderToAdd.day] === 'undefined') {
        state[action.reminderToAdd.day.format('YY/MM/DD')] = {
          day: action.reminderToAdd.day.format('D'),
          reminders: []
        };
      }

      if (action.reminderToAdd.reminder == null) {
        return state;
      }

      if (action.reminderToAdd.reminder.reminder.length <= 30) {
        state[action.reminderToAdd.day].format('YY/MM/DD').reminders = [
          ...state[action.reminderToAdd.day.format('YY/MM/DD')].reminders,
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
