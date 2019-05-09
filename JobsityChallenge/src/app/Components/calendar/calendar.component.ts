import { setFilter } from './../../../Redux/actions';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { WeatherForecastService } from './../../services/weather-forecast.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  DayOfMonth,
  AppState,
  Reminder,
  Forecast,
  Filter
} from 'src/Redux/Interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReminderComponent } from './../Dialogs/reminder/reminder.component';
import { createStore, Store } from 'redux';
import { addReminder, addForecast, removeReminder } from 'src/Redux/actions';
import * as moment from 'moment';
import { reducer } from 'src/Redux/Reducer';
import * as tinyColor from 'tinycolor2';
import { DomSanitizer } from '@angular/platform-browser';

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
  filter: Filter;

  constructor(
    private dialog: MatDialog,
    private wheatherService: WeatherForecastService,
    private sanitizer: DomSanitizer
  ) {}

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
  openDialogReminder(
    date: string,
    oldreminder: Reminder = null,
    index: number = -1
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      date: moment(date, 'YYYY/MM/DD').toDate(),
      reminder: oldreminder
    };

    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Reminder) => {
      if (data) {
        this.addReminder(data);
        if (oldreminder) {
          this.removeReminder(oldreminder.date, index);
        }
        this.checkWeatherForecast(data.city);
      }
    });
  }

  /*2019/05/09
  If the date is within the next 3 days (Provider restriction)
  will look for the forecast of the registered city and bring the correspondent time
  (rain, sun,snow, etc)
  */
  checkWeatherForecast(city: string) {
    this.wheatherService.getWheater(city).then(data => {
      for (let i = 0; i < data.list.length; i++) {
        this.addForecast({
          date: moment(data.list[i].dt_txt),
          icon: data.list[i].weather[0].icon,
          description: data.list[i].weather[0].description,
          city: city
        } as Forecast);
      }
    });
  }
  getForecast(date: string, city: string) {
    const dateM = moment(date);
    const resultCity = this.store.getState().forecast[city];

    if (resultCity) {
      const result = Object.values(resultCity)
        .filter(
          (forecast: Forecast) =>
            forecast.date.format('YYYY/MM/DD') === dateM.format('YYYY/MM/DD')
        )
        .sort(function(a, b) {
          return (
            parseFloat(a.date.format('YYYYMMDDHHMM')) -
            parseFloat(b.date.format('YYYYMMDDHHMM'))
          );
        });
      const floatRepDate = parseFloat(dateM.format('YYYYMMDDHHMM'));
      let forecasteReturn = result[0];

      for (let i = 1; i < result.length; i++) {
        if (parseFloat(result[i].date.format('YYYYMMDDHHMM')) < floatRepDate) {
          forecasteReturn = result[0];
        }
      }

      return forecasteReturn;
    }

    return null;
  }
  getInfoForecast(forecast: Forecast) {
    return forecast.city + ' - ' + forecast.description;
  }
  cleanURL(oldURL) {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + oldURL + ')');
  }
  /*
  2019/05/08:
  Function to remove reminders to the storage.
  Andrés Maltés
  */
  removeReminder(date: any, index: number) {
    this.store.dispatch(removeReminder(date, index));
  }
  /*
  2019/05/08:
  Function to set the filter.
  Andrés Maltés
  */
  setFilter(filter: Filter) {
    this.store.dispatch(setFilter(filter));
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
  2019/05/09:
  Function to add forecast to the storage.
  Andrés Maltés
  */
  addForecast(forecast: Forecast) {
    this.store.dispatch(addForecast(forecast));
  }
  /*
  2019/05/08
  Subscribe variables to storage so when the storage is updated,
  so are the variables.
  */
  suscribeVariablesToStore() {
    const subscription = this.store.subscribe(() => {
      this.days = this.store.getState().days;

      this.filter = this.store.getState().filter;
    });
  }
  /*
  2019/05/08:
  Function to initializate the calendar.
  It takes the current month and get the number of days of it.
  Then, fills the storage so the data can be read after.
  Andrés Maltés
  */
  initializateCalendar(
    year: number = moment().year(),
    month: number = moment().month()
  ) {
    const startOfMonth = moment()
      .date(1)
      .month(month)
      .year(year);
    var monthName = startOfMonth.format('MMMM');
    const endOfMonth = moment()
      .date(1)
      .month(month)
      .year(year)
      .endOf('month');

    if (startOfMonth.weekday() !== 0) {
      startOfMonth.add(-1 * startOfMonth.weekday(), 'days');
    }
    if (endOfMonth.weekday() !== 0) {
      endOfMonth.add(8 - endOfMonth.weekday(), 'days');
    }

    this.setFilter({
      month: month,
      year: year,
      start: startOfMonth,
      end: endOfMonth,
      monthName: monthName
    } as Filter);

    for (let i = startOfMonth.clone(); i < endOfMonth; i.add(1, 'days')) {
      this.addReminder({ date: i } as Reminder);
    }
  }
  changeMonth(month: number) {
    var date = moment()
      .day(1)
      .month(this.filter.month)
      .year(this.filter.year);
    date.add(month, 'month');
    this.initializateCalendar(date.year(), date.month());
  }
}
