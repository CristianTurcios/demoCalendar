import { Component, OnInit, Input } from '@angular/core';
import { DayOfMonth, AppState, Reminder } from 'src/Redux/Interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReminderComponent } from './../Dialogs/reminder/reminder.component';
import { createStore, Store } from 'redux';
import { addReminder } from 'src/Redux/actions';
import * as moment from 'moment';
import { reducer } from 'src/Redux/Reducer';
import * as tinyColor from 'tinycolor2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  store: Store<AppState>;
  reminders: Reminder[];
  title = 'JobsityChallenge';
  days: { [key: string]: DayOfMonth };

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.store = createStore<AppState>(reducer);
    this.suscribeVariablesToStore();
    this.initializateCalendar();
  }
  isLigth(color: string) {
    return tinyColor(color).isLight();
  }
  /*2019/05/08
  Open a new mat-dialog window
  Andrés Maltés
  */
  openDialogReminder(date: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      date: moment(date, 'YYYY/MM/DD').toDate()
    };

    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.addReminder(data);
      }
    });
  }

  /*
  2019/05/08:
  Function to add reminders to the storage.
  Andrés Maltés
  */
  addReminder(reminder: Reminder) {
    this.store.dispatch(addReminder(reminder));
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
      this.addReminder({ date: i } as Reminder);
    }
  }
}
