import { Reminder, AppState } from 'src/Redux/Interface';
import { createStore, Store } from 'redux';
import { reducer } from 'src/Redux/Reducer';
import { addReminder } from 'src/Redux/actions';
import * as moment from 'moment';

describe('Add a new Reminder', () => {
  it('Should add the reminder', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: moment(),
      reminder: 'Hola Mundo',
      city: 'Bogotá',
      color: 'Red'
    } as Reminder;
    store.dispatch(addReminder(reminder));
    console.log('store.getState()');
    console.log(store.getState());
    expect(store.getState().days[1].reminders.length).toEqual(1);
  });
  it('Should not add the reminder', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: moment(),
      reminder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus justo massa, vel malesuada arcu ornare id. Vestibulum ut aliquam purus, nec dictum urna. Nulla ut ullamcorper felis. Aenean eget volutpat mi. Aliquam sem purus, semper sed sem a, scelerisque volutpat lectus. Fusce eu feugiat sed.',
      city: 'Bogotá',
      color: 'Red'
    } as Reminder;
    store.dispatch(addReminder(reminder));
    expect(store.getState().days.length).toEqual(0);
  });
});
