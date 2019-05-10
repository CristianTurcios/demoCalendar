import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from './../../Interfaces/Forecast';

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
  getWheater(city: string): Promise<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        this.endpoint + 'forecast?q=' + city + '&cnt=16&APPID=' + this.APIKEY
      )

      .toPromise();
  }
}
