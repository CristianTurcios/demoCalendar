import { Forecast } from './../../Redux/Interface';
import { Moment } from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from './../../Interfaces/Forecast';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(private http: HttpClient) {}
  private endpoint = 'https://api.openweathermap.org/data/2.5/';
  private APIKEY = '1f220744bf683460c40028138ff86c00';
  /*
  2019/05/08
Check the weather in open weather.
Param: q => City in open Weather map format. http://bulk.openweathermap.org/sample/
          apikey
Andrés Maltés
*/
  getWheater(date: Moment, city: string): Promise<Forecast> {
    return this.http
      .get<WeatherResponse>(
        this.endpoint + 'forecast?q=' + city + '&cnt=16&APPID=' + this.APIKEY
      )
      .pipe(
        map((serviceResponse: WeatherResponse) => {
          return serviceResponse.list
            .map(weatherList => {
              const weather = weatherList.weather.shift();
              return {
                date: moment(weatherList.dt_txt),
                icon: weather.icon,
                description: weather.description,
                city: city
              } as Forecast;
            })
            .filter((forecast: Forecast) => {
              return (
                forecast.date.format('YYYY/MM/DD') === date.format('YYYY/MM/DD')
              );
            })
            .shift();
        })
      )
      .toPromise();
  }
}
