import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
@Pipe({
  name: 'CalendarFormat'
})
export class CalendarFormatPipe implements PipeTransform {
  transform(days: {}, start: Moment, end: Moment): any[] {
    if (!days) {
      return [];
    }
    /*
    const weeks: any[] = [];
    let counter = 0;
    let portion = {};
    const keys = Object.keys(days);
    for (let i = 0; i < keys.length; i++) {
      var date = moment(keys[i], 'YYYY/MM/DD');

      var yeard = date.year();
      const week = date.week();
      if (week <= lastWeek && week >= firstWeek && yeard == year) {
        if (counter !== 0 && counter % 7 === 0) {
          weeks.push(portion);
          portion = {};
        }
        portion[keys[i]] = days[keys[i]];
        counter++;
      }
    }*/

    const weeks: any[] = [];
    let counter = 0;
    let portion = {};
    const keys = Object.keys(days);
    for (let i = start.clone(); i < end; i.add(1, 'days')) {
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
