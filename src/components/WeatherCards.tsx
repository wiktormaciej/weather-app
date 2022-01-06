import { useQuery } from "react-query";
import { API_KEY } from "../config";
import { WeatherCard } from "./WeatherCard";
import { WeatherApiResponse } from "./WeatherTable";

export function WeatherCards({
  coord,
  isLoading,
}: {
  coord?: {
    lat: number;
    lon: number;
  };
  isLoading: boolean;
  error?: Error;
}) {
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
    { enabled: !!coord }
  );

  return (
    <div className="weather-cards">
      {isLoading || isDataLoading ? (
        <div>"Loading..."</div>
      ) : (
        data?.daily.map((dailyRecord, id) => {
          if (id < 5)
            return <WeatherCard data={dailyRecord} key={dailyRecord.dt} />;
          return null;
        })
      )}
    </div>
  );
}
