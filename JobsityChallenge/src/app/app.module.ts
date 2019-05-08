import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { ReminderComponent } from './Components/Dialogs/reminder/reminder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, CalendarComponent, ReminderComponent],
  imports: [BrowserModule, MatDialogModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ReminderComponent]
})
export class AppModule {}
