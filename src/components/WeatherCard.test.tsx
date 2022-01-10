import { render, screen } from "@testing-library/react";
import { oneCallWeatherMock } from "../mocks/oneCallWeather.mock";
import { WeatherCard } from "./WeatherCard";

const onClickMock = jest.fn();

const testData = oneCallWeatherMock.daily[0];
const testDayName = new Date(testData.dt * 1000).toLocaleString("en-Us", {
  weekday: "long",
});

describe("WeatherCard component", () => {
  it("should display component with proper data", () => {
    render(
      <WeatherCard data={oneCallWeatherMock.daily[0]} onClick={onClickMock} />
    );

    expect(
      screen.getByText(`${Math.round(testData.temp.day)}°`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${Math.round(testData.temp.night)}°`)
    ).toBeInTheDocument();
    expect(screen.getByText(testDayName)).toBeInTheDocument();
  });
});
