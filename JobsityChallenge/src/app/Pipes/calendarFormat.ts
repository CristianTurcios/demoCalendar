import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
@Pipe({
  name: 'CalendarFormat'
})
/*
  2019/05/10
Pipe for taking a list of days and return it in weeks format (array of chunks of 7)
Andrés Maltés
*/
export class CalendarFormatPipe implements PipeTransform {
  transform(days: {}, start: Moment, end: Moment): any[] {
    if (!days) {
      return [];
    }

    const weeks: any[] = [];
    let counter = 0;
    let portion = {};
    const keys = Object.keys(days);
    for (const i = start.clone(); i < end; i.add(1, 'days')) {
      if (counter !== 0 && counter % 7 === 0) {
        weeks.push(portion);
        portion = {};
      }
      portion[i.format('YYYY/MM/DD')] = days[i.format('YYYY/MM/DD')];
      counter++;
    }

    return weeks;
  }
}
