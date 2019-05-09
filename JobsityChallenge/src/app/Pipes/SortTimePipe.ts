import { Pipe, PipeTransform } from '@angular/core';
import { Reminder } from 'src/Redux/Interface';

@Pipe({ name: 'sortTime' })
export class sortTime implements PipeTransform {
  transform(reminders: Reminder[]): Reminder[] {
    reminders.sort(function(a, b) {
      return (
        parseFloat(a.date.format('HHMM')) - parseFloat(b.date.format('HHMM'))
      );
    });
    return reminders;
  }
}
