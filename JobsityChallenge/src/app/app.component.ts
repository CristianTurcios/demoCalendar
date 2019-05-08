import { Reminder, AppState, DayOfMonth } from './../Redux/Interface';
import { Component, OnInit } from '@angular/core';
import { createStore, Store } from 'redux';
import { addReminder } from 'src/Redux/actions';
import * as moment from 'moment';
import { reducer } from 'src/Redux/Reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/*
  2019/05/08:
  Calendar main component creation.
  Andrés Maltés
  */
export class AppComponent implements OnInit {
  store: Store<AppState>;
  reminders: Reminder[];
  title = 'JobsityChallenge';
  days: { [key: string]: DayOfMonth };
  ngOnInit() {
    this.store = createStore<AppState>(reducer);
    this.suscribeVariablesToStore();
    this.initializateCalendar();
  }
  /*
  2019/05/08:
  Function to add reminders to the storage.
  Andrés Maltés
  */
  addReminder(day: any, reminder: Reminder) {
    this.store.dispatch(addReminder(day, reminder));
  }
  /*
  2019/05/08
  Subscribe variables to storage so when the storage is updated,
  so are the variables.
  */
  suscribeVariablesToStore() {
    const subscription = this.store.subscribe(() => {
      this.days = this.store.getState().days;
    });
  }
  /*
  2019/05/08:
  Function to initializate the calendar.
  It takes the current month and get the number of days of it.
  Then, fills the storage so the data can be read after.
  Andrés Maltés
  */
  initializateCalendar() {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    for (let i = startOfMonth; i <= endOfMonth; i = i.add(1, 'days')) {
      console.log('ALGO');
      console.log(i.format('YY/MM/DD'));
      this.addReminder(i, null);
    }
  }
}
