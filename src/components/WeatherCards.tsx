import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { API_KEY } from "../config";
import { DailyWeatherDetails } from "./DailyWeatherDetails";
import { WeatherCard } from "./WeatherCard";
import { WeatherApiResponse, WeatherRecord } from "./WeatherTable";

interface WeatherCardsProps {
  coord?: {
    lat: number;
    lon: number;
  };
  isLoading: boolean;
  error?: Error;
  city?: string;
}

export function WeatherCards({
  coord,
  city,
}: WeatherCardsProps): ReactElement | null {
  const { data, isLoading: isDataLoading } = useQuery<WeatherApiResponse>(
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
    }
  );

  const [currentDay, setCurrentDay] = useState<WeatherRecord | undefined>(
    data?.daily[0]
  );

  if (isDataLoading) return <div>"Loading..."</div>;

  if (data && currentDay)
    return (
      <>
        <DailyWeatherDetails data={currentDay} city={city} />
        <div className="weather-cards">
          {data.daily.map((dailyRecord, id) => {
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
      </>
    );

  return null;
}
