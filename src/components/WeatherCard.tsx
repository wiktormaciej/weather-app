import { WeatherRecord } from "./WeatherTable";

export function WeatherCard({ data }: { data: WeatherRecord }) {
  const date = new Date(data.dt * 1000);
  const { morn, day, night, min, max } = data.temp;

  const meanValue = Math.round((morn + day + night) / 3);

  return (
    <div className="weather-card">
      <div className="weather-card-left">
        <div>{date.toDateString()}</div>
        <div>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].main}
          />
        </div>
      </div>
      <div className="weather-info">
        <div>Morn: {morn}℃</div>
        <div>Day: {day}℃</div>
        <div>Min: {min}℃</div>
        <div>Max: {max}℃</div>
        <div>Night: {night}℃</div>
        <div>Humidity: {data.humidity}%</div>
        <div>Mean: {meanValue}</div>
      </div>
    </div>
  );
}
