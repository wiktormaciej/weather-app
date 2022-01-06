import { FormEvent, useRef, useState } from "react";
import { useQuery } from "react-query";
import { API_KEY } from "../config";
import { WeatherCards } from "./WeatherCards";

export interface WeatherRecord {
  dt: number;
  temp: {
    morn: number;
    day: number;
    night: number;
    eve: number;
    min: number;
    max: number;
  };
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  humidity: number;
}

export interface WeatherApiResponse {
  daily: WeatherRecord[];
}

export function WeatherTable() {
  const [city, setCity] = useState("Warszawa");

  const {
    data: { coord } = {},
    isLoading,
    isError,
    error,
  } = useQuery<{
    coord: { lon: number; lat: number };
  }>(
    ["city-data", city],
    async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      retry: false,
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChagneQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) setCity(value);
  };

  return (
    <div className="weather-table">
      <form onSubmit={handleChagneQuery}>
        <input type="text" defaultValue="Warszawa" ref={inputRef} />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div>"Loading..."</div>
      ) : isError ? (
        <div>No city found.</div>
      ) : (
        <>
          <div>Weather for {city}:</div>
          <WeatherCards
            coord={coord}
            isLoading={isLoading}
            error={error as Error}
          />
        </>
      )}
    </div>
  );
}
