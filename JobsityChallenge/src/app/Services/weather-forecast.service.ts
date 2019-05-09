import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(private http: HttpClient) {}
  private endpoint = 'http://api.openweathermap.org/data/2.5/';
  private APIKEY = '1f220744bf683460c40028138ff86c00';
  getWheater(city: string): Promise<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        this.endpoint + 'forecast?q=' + city + '&cnt=16&APPID=' + this.APIKEY
      )
      .toPromise();
  }
}
