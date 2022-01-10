import { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { API_KEY } from "../config";
import { CityInput, CityRecord } from "./CityInput";
import { DailyWeatherDetails } from "./DailyWeatherDetails";
import { WeatherCard } from "./WeatherCard";

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
      id: number;
      description: string;
    }
  ];
  humidity: number;
  [other: string]: unknown;
}

export interface WeatherApiResponse {
  daily: WeatherRecord[];
  [other: string]: unknown;
}

export function Weather(): ReactElement | null {
  const [city, setCity] = useState<CityRecord>({
    name: "Warsaw",
    coord: {
      lon: 21.0118,
      lat: 52.2298,
    },
    id: 756135,
  });
  const { coord, name } = city;

  const { data, isLoading } = useQuery<WeatherApiResponse>(
    ["weather-data", coord],
    async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord?.lat}&lon=${coord?.lon}&exclude=current,minutely,alerts,hourly&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      enabled: !!coord,
      onSuccess: (data) => {
        setCurrentDay(data.daily[0]);
      },
      retry: false,
    }
  );

  const [currentDay, setCurrentDay] = useState<WeatherRecord | undefined>(
    data?.daily[0]
  );

  if (currentDay)
    return (
      <div className="weather-table">
        <CityInput onSubmit={setCity} />
        <DailyWeatherDetails data={currentDay} cityName={name} />
        <div className="weather-cards">
          {isLoading && <div>"Loading..."</div>}
          {data &&
            data.daily.map((dailyRecord, id) => {
              if (id < 5)
                return (
                  <WeatherCard
                    data={dailyRecord}
                    key={dailyRecord.dt}
                    onClick={() => setCurrentDay(dailyRecord)}
                    isSelected={dailyRecord.dt === currentDay.dt}
                  />
                );
              return null;
            })}
        </div>
      </div>
    );

  return null;
}
