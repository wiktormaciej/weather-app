import classNames from "classnames";
import { ReactElement } from "react";
import "./WeatherCard.css";
import { WeatherRecord } from "./Weather";

interface WeatherCardProps {
  data: WeatherRecord;
  onClick: () => void;
  isSelected?: boolean;
}

export function WeatherCard({
  data,
  onClick,
  isSelected,
}: WeatherCardProps): ReactElement {
  const date = new Date(data.dt * 1000);
  const { day, night } = data.temp;

  const cardClassName = classNames({
    "weather-card": true,
    selected: isSelected,
  });

  return (
    <div className={cardClassName} data-testid="card" onClick={onClick}>
      <div className="weather-card-left">
        <div>{date.toLocaleString("en-US", { weekday: "long" })}</div>
        <div>
          <img
            className="weather-card-icon"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].main}
          />
        </div>
      </div>
      <div className="weather-info">
        <span className="day-temp">{Math.round(day)}°</span>
        <span className="night-temp">{Math.round(night)}°</span>
      </div>
    </div>
  );
}
