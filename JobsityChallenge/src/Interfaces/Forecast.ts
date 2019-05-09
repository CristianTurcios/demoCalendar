class Main {
  public temp: number;
  public temp_min: number;
  public temp_max: number;
  public pressure: number;
  public sea_level: number;
  public grnd_level: number;
  public humidity: number;
  public temp_kf: number;
}

class Weather {
  public id: number;
  public main: string;
  public description: string;
  public icon: string;
}

class Clouds {
  public all: number;
}

class Wind {
  public speed: number;
  public deg: number;
}
class Sys {
  public pod: string;
}

class List {
  public dt: number;
  public main: Main;
  public weather: Weather[];
  public clouds: Clouds;
  public wind: Wind;
  public rain: { [key: string]: number };
  public sys: Sys;
  public dt_txt: string;
}

class Coord {
  public lat: number;
  public lon: number;
}

class City {
  public id: number;
  public name: string;
  public coord: Coord;
  public country: string;
  public population: number;
}

class WeatherResponse {
  public cod: string;
  public message: number;
  public cnt: number;
  public list: List[];
  public city: City;
}
