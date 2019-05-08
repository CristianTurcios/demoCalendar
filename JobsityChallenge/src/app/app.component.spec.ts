import { Reminder, AppState } from 'src/Redux/Interface';
import { createStore, Store } from 'redux';
import { reducer } from 'src/Redux/Reducer';
import { addReminder } from 'src/Redux/actions';

describe('Add a new Reminder', () => {
  it('Should add the reminder', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: new Date(),
      reminder: 'Hola Mundo',
      city: 'Bogotá',
      color: 'Red',
      wheather: ''
    } as Reminder;
    store.dispatch(addReminder(reminder, 1));
    console.log('store.getState()');
    console.log(store.getState());
    expect(store.getState().days[1].reminders.length).toEqual(1);
  });
  it('Should not add the reminder', () => {
    const store: Store<AppState> = createStore<AppState>(reducer);
    const reminder: Reminder = {
      date: new Date(),
      reminder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus justo massa, vel malesuada arcu ornare id. Vestibulum ut aliquam purus, nec dictum urna. Nulla ut ullamcorper felis. Aenean eget volutpat mi. Aliquam sem purus, semper sed sem a, scelerisque volutpat lectus. Fusce eu feugiat sed.',
      city: 'Bogotá',
      color: 'Red',
      wheather: ''
    } as Reminder;
    store.dispatch(addReminder(reminder, 1));
    expect(store.getState().days.length).toEqual(0);
  });
});
