import { Reminder, AppState } from './../Redux/Interface';
import { Component, OnInit } from '@angular/core';
import { createStore, Store } from 'redux';
import { remindersReducer } from 'src/Redux/Reducer';
import { addReminder } from 'src/Redux/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  store: Store<AppState>;
  reminders: Reminder[];
  title = 'JobsityChallenge';
  ngOnInit() {
    this.store = createStore<AppState>(remindersReducer);
  }
  addReminder(reminder: Reminder) {
    this.store.dispatch(addReminder(reminder, 1));
  }
}
