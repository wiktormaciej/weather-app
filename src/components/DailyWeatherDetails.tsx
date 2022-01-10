import { ReactElement } from "react";
import { mean, mode } from "../utils/utils";
import "./DailyWeatherDetails.css";
import { DataField } from "./DataField";
import { WeatherRecord } from "./WeatherCards";

export function DailyWeatherDetails({
  data,
  cityName,
}: {
  data: WeatherRecord;
  cityName?: string;
}): ReactElement {
  const date = new Date(data.dt * 1000);
  const { morn, day, eve, night, min, max } = data.temp;

  const meanValue = Math.round(mean([morn, day, night]));
  const modeValues = mode([morn, day, night, eve]);

  return (
    <div className="weather-details">
      <div className="weather-details-left">
        <h4>{cityName}</h4>
        <img
          className="weather-details-icon"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].main}
        />
        <div>{date.toDateString()}</div>
      </div>
      <div className="weather-temperature">
        <h3>Temperature</h3>
        <div className="weather-temperature-content">
          <div>
            <DataField label="Morning" value={`${morn}℃`} />
            <DataField label="Day" value={`${day}℃`} />
            <DataField label="Night" value={`${night}℃`} />
          </div>
          <div>
            <DataField label="Min" value={`${min}℃`} />
            <DataField label="Max" value={`${max}℃`} />
            <DataField label="Mean" value={`${meanValue}℃`} />
            <DataField
              label="Modes"
              value={
                !modeValues.length
                  ? "-"
                  : modeValues.map((mode) => `${mode}℃`).join(", ")
              }
            />
          </div>
        </div>
      </div>
      <div className="weather-conditions">
        <h3>Conditions</h3>
        <div>
          <DataField label="Humidity" value={`${data.humidity}%`} />
        </div>
      </div>
    </div>
  );
}
