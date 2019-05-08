import { Component, OnInit, Input } from '@angular/core';
import { DayOfMonth } from 'src/Redux/Interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReminderComponent } from './../Dialogs/reminder/reminder.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() days: { [key: string]: DayOfMonth };
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openDialogReminder() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ReminderComponent, dialogConfig);
  }
}
