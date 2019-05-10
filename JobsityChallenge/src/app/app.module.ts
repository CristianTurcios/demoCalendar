import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatToolbarModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { ReminderComponent } from './Components/Dialogs/reminder/reminder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  OwlDateTimeModule,
  OWL_DATE_TIME_FORMATS,
  OwlNativeDateTimeModule
} from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { HttpClientModule } from '@angular/common/http';
import { CalendarFormatPipe } from './Pipes/calendarFormat';

import { DragDropModule } from '@angular/cdk/drag-drop';
export const MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderComponent,

    CalendarFormatPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule,
    MatTooltipModule,
    MatToolbarModule,
    DragDropModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: OWL_DATE_TIME_FORMATS, useValue: MOMENT_FORMATS }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ReminderComponent]
})
export class AppModule {}
