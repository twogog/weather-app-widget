export interface City {
 name: string;
 country: string;
 visibility: number;
 feels_like: number;
 humidity: number;
 pressure: number;
 description: string;
 speed: number;
 icon: string;
 temp: number;
 deg: number;
}

export interface Data extends City {
  main: {feels_like: number, humidity: number, pressure: number, temp: number}
  sys: {country: string}
  weather: [{icon: string, description: string}]
  wind: {speed: number, deg: number}
}