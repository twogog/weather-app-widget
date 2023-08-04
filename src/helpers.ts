import type { City, Data } from "./types";

export function cityFactory(data: Data) {
  const {
    name,
    visibility,
    main: { feels_like, humidity, pressure, temp },
    sys: { country },
    weather,
    wind: { speed, deg },
  } = data;
  const icon = weather && weather[0]?.icon;
  const description = weather && weather[0]?.description;
  const city: City = {
    name,
    visibility,
    description,
    country,
    feels_like,
    humidity,
    deg,
    pressure,
    speed,
    icon,
    temp,
  };
  return city;
}

export function makeArr(start: number, end: number) {
  const arr: number[] = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
}