export const currentWeatherMock = {
  coord: {
    lon: 21.0118,
    lat: 52.2298,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 274.84,
    feels_like: 271.22,
    temp_min: 273.68,
    temp_max: 275.87,
    pressure: 1001,
    humidity: 78,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 120,
  },
  clouds: {
    all: 0,
  },
  dt: 1641728429,
  sys: {
    type: 2,
    id: 2032856,
    country: "PL",
    sunrise: 1641710549,
    sunset: 1641739383,
  },
  timezone: 3600,
  id: 756135,
  name: "Warsaw",
  cod: 200,
};
