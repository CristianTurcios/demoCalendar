import { setFilter, removeAllReminders } from './../../../Redux/actions';
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
  title = 'Reminders Calendar';
  days: { [key: string]: DayOfMonth };
  filter: Filter;

  constructor(
    private dialog: MatDialog,
    private wheatherService: WeatherForecastService,
    private sanitizer: DomSanitizer
  ) {}
  /*
  2019/05/09
  Get the Names of the days of the week. This is not going to be burned in code
  as depending on the locale the week can start on Monday or Saturday
  Andrés Maltés
  */
  daysOfTheWeek() {
    const week = moment().startOf('week');
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(week.format('dddd')); // Getting the name of the day
      week.add(1, 'day');
    }
    return arr;
  }
  /*
2019/05/10
When the reminder is dropped in a container (day), checks if it was dropped in a different
day and does the corresponding update (removes, then add).
Andrés Maltés
*/
  dropped(event, newContainer) {
    if (event.previousContainer !== event.container) {
      const newDate = moment(newContainer, 'YYYY/MM/DD');
      const previousDate = event.previousContainer.id;
      const index = event.previousIndex;

      const reminder: Reminder = this.days[previousDate].reminders[index];

      reminder.date = reminder.date
        .year(newDate.year())
        .month(newDate.month())
        .date(newDate.date());

      this.removeReminder(moment(previousDate, 'YYYY/MM/DD'), index);

      this.addReminder(reminder);
    }
  }

  /*
  2019/05/08
  Create store and subscribe the local variables to store's variables.
  Calendar will be inizialized, creating the corresponding variables for each day
  to be shown in the calendar.
  Andrés Maltés
  */
  ngOnInit() {
    this.store = createStore<AppState>(reducer);
    this.suscribeVariablesToStore();
    this.initializateCalendar();
  }
  /*
2019/05/10
Using tinyColor to determine if the font should be colored black or white.
For better user experience.
Andrés Maltés
*/
  isLigth(color: string) {
    return tinyColor(color).isLight();
  }
  /*
2019/05/10
Checks if the date in YYYY/MM/DD  is equivalent to today
Andrés Maltés
*/
  isToday(date: string) {
    return moment().format('YYYY/MM/DD') === date;
  }
  /*
2019/05/10
Get the name of the day (Mon, Tue, etc) based on a YYYY/MM/DD Date
Andrés Maltés
*/
  getDayName(date: string) {
    return moment(date, 'YYYY/MM/DD').format('ddd');
  }
  /*2019/05/08
  Open a new mat-dialog window
  Andrés Maltés
  */
  openDialogReminder(
    date: string = moment().format('YYYY/MM/DD'),
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
  /*
  2019/05/09
  Check if the date is the selected month.
  */
  inCurrentMonth(date) {
    return this.filter.month === moment(date, 'YYYY/MM/DD').month();
  }
  /*2019/05/09
  it will  look for the forecast of the registered city and bring the correspondent time
  (rain, sun,snow, etc). Only three days awailable (Provider's restriction)
  */
  checkWeatherForecast(city: string) {
    this.wheatherService
      .getWheater(city)

      .then(data => {
        for (let i = 0; i < data.list.length; i++) {
          this.addForecast({
            date: moment(data.list[i].dt_txt),
            icon: data.list[i].weather[0].icon,
            description: data.list[i].weather[0].description,
            city: city
          } as Forecast);
        }
      })
      .catch(() =>
        console.log(
          'It seems like Open Weather does not have the requested information. Please verify the city name'
        )
      );
  }
  /*
2019/05/10
IE Compatibility
Andrés Maltés
*/
  valuesPolyfill = function customObjectValues(object) {
    return Object.keys(object).map(key => object[key]);
  };
  /*2019/05/09
    Look in the storage for the forecast adquired based on the city.
    Everytime the user adds a reminder, the forecast is updated to all
    the existing reminders for that city if the reminder is within the
    next 3 days (provider's restriction)
  */
  getForecast(date: string, city: string) {
    const dateM = moment(date);
    const resultCity = this.store.getState().forecast[city];
    const values = Object.values || this.valuesPolyfill;
    if (resultCity) {
      const result = values(resultCity)
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
  /*2019/05/09
    Format a forecast for displaying a tooltip
  */
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
  Function to remove all reminders of a given date in string YYYY/MM/DD
  Andrés Maltés
  */
  removeAllReminders(date: string) {
    this.store.dispatch(removeAllReminders(date));
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
    Andrés Maltés
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
    const monthName = startOfMonth.format('MMMM');
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

    for (const i = startOfMonth.clone(); i < endOfMonth; i.add(1, 'days')) {
      this.addReminder({ date: i } as Reminder);
    }
  }
  /*2019/05/09
    Change Month
      Andrés Maltés
  */
  changeMonth(month: number) {
    const date = moment()
      .day(1)
      .month(this.filter.month)
      .year(this.filter.year);
    date.add(month, 'month');
    this.initializateCalendar(date.year(), date.month());
  }
}
