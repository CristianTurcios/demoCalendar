import { OwlDateTimeModule } from 'ng-pick-datetime';
import { WeatherForecastService } from './../../services/weather-forecast.service';
import { Component, OnInit, Input } from '@angular/core';
import { DayOfMonth, AppState, Reminder, Forecast } from 'src/Redux/Interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReminderComponent } from './../Dialogs/reminder/reminder.component';
import { createStore, Store } from 'redux';
import { addReminder, addForecast } from 'src/Redux/actions';
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
  openDialogReminder(date: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      date: moment(date, 'YYYY/MM/DD').toDate()
    };

    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Reminder) => {
      if (data) {
        this.addReminder(data);
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
          description: data.list[i].weather[0].description
        } as Forecast);
      }
    });
  }
  getForecast(date: string, city: string) {
    var dateM = moment(date);
    var resultCity = this.store.getState().forecast[city];

    if (resultCity) {
      var result = Object.values(resultCity)
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
      var floatRepDate = parseFloat(dateM.format('YYYYMMDDHHMM'));
      var forecasteReturn = result[0];

      for (var i = 1; i < result.length; i++) {
        if (parseFloat(result[i].date.format('YYYYMMDDHHMM')) < floatRepDate) {
          forecasteReturn = result[0];
        }
      }

      return forecasteReturn;
    }

    return null;
  }
  getInfoForecast(forecast: Forecast) {
    return forecast.description;
  }
  cleanURL(oldURL) {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + oldURL + ')');
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
