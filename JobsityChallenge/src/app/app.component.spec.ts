import { Reminder, AppState } from 'src/Redux/Interface';
import { createStore, Store } from 'redux';

import * as moment from 'moment';
import { reducer } from 'src/Redux/Reducer';
import { addReminder } from 'src/Redux/actions';

describe('Add a new Reminder', () => {
  it('Should add the reminder', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: moment(),
      reminder: 'Hola Mundo',
      city: 'Bogotá',
      color: '#000000'
    } as Reminder;
    store.dispatch(addReminder(reminder));

    expect(
      store.getState().days[moment().format('YYYY/MM/DD')].reminders.length
    ).toEqual(1);
  });
  it('Should not add the reminder (Reminder length>30)', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: moment(),
      reminder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus justo massa',
      city: 'Bogotá',
      color: '#000000'
    } as Reminder;
    store.dispatch(addReminder(reminder));
    expect(
      store.getState().days[moment().format('YYYY/MM/DD')].reminders.length
    ).toEqual(0);
  });
  it('Should not add the reminder (No City)', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: moment(),
      reminder: 'Lorem ipsum dolor sit amet',
      city: '',
      color: '#000000'
    } as Reminder;
    store.dispatch(addReminder(reminder));
    expect(
      store.getState().days[moment().format('YYYY/MM/DD')].reminders.length
    ).toEqual(0);
  });
});
