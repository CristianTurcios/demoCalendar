import {
  ADD_REMINDER,
  ADD_FORECAST,
  REMOVE_REMINDER,
  SET_FILTER,
  REMOVE_ALL_REMINDERS
} from './actions';
import { combineReducers, Reducer } from 'redux';
import { AppState, Reminder, DayOfMonth } from './interface';

const days = (state: {} = [], action: any) => {
  switch (action.type) {
    /*
2019/05/08
Adding reducer that will:
Check whether the day of week is already defined. If not, will define it.
Check whether the reminder has less than 30 characters and a city. If no, it will not
add the reminder.
Andrés Maltés
*/
    case ADD_REMINDER:
      const stateNew: any = { ...state };
      const key = action.reminderToAdd.date.format('YYYY/MM/DD');
      if (typeof stateNew[key] === 'undefined') {
        stateNew[key] = {
          day: action.reminderToAdd.date.format('D'),
          reminders: []
        };
      }
      if (!action.reminderToAdd.reminder) {
        return stateNew;
      }

      if (
        action.reminderToAdd.reminder.length <= 30 &&
        action.reminderToAdd.city
      ) {
        stateNew[key].reminders = [
          ...stateNew[key].reminders,
          action.reminderToAdd
        ];

        stateNew[key].reminders.sort(function(a: Reminder, b: Reminder) {
          return (
            parseFloat(a.date.format('HHMM')) -
            parseFloat(b.date.format('HHMM'))
          );
        });

        return stateNew;
      } else {
        return stateNew;
      }
    /*
2019/05/09
Removes the reminder based on the index.
Andrés Maltés
*/
    case REMOVE_REMINDER:
      const stateNewDel: any = { ...state };
      const keyDel = action.date.format('YYYY/MM/DD');
      const reminders: DayOfMonth = stateNewDel[keyDel];
      if (reminders) {
        reminders.reminders.splice(action.index, 1);
        stateNewDel[keyDel] = reminders;
      }
      return stateNewDel;
    /*
2019/05/10
Removes all reminders
Andrés Maltés
*/
    case REMOVE_ALL_REMINDERS:
      const stateNewDelAll: any = { ...state };
      stateNewDelAll[action.date].reminders = [];
      return stateNewDelAll;
    default:
      return state;
    /*
2019/05/10
Add Forecast to the reminders in the specific Date and City
Andrés Maltés
*/
    case ADD_FORECAST:
      const keyForecast = action.forecast.date.format('YYYY/MM/DD');
      const stateNewForecast: any = { ...state };
      const date: DayOfMonth = stateNewForecast[keyForecast];
      if (typeof date !== 'undefined') {
        stateNewForecast[keyForecast].reminders = date.reminders.map(
          (reminder: Reminder) => {
            if (reminder.city === action.forecast.city) {
              reminder.forecast = action.forecast;
            }
            return reminder;
          }
        );
        return stateNewForecast;
      } else {
        return state;
      }
  }
};

const filter = (state: [] = [], action: any) => {
  switch (action.type) {
    /*
2019/05/10
Saves the current filter in the storage.
Andrés Maltés
*/
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};
export const reducer: Reducer<AppState> = combineReducers({
  days,
  filter
});
