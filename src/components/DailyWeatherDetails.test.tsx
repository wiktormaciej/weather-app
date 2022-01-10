import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/dist/utils/testing";
import { oneCallWeatherMock } from "../mocks/oneCallWeather.mock";
import { mean, mode } from "../utils/utils";
import { DailyWeatherDetails } from "./DailyWeatherDetails";
import { WeatherCard } from "./WeatherCard";

jest.mock("../utils/utils");
const testMeanValue = 40;
const testModeValue = [41, 42];

const testData = oneCallWeatherMock.daily[0];
const testDateString = new Date(testData.dt * 1000).toDateString();
const testCityString = "Test-city";

describe("DailyWeatherDetails component", () => {
  beforeEach(() => {
    mocked(mean).mockReturnValue(testMeanValue);
    mocked(mode).mockReturnValue(testModeValue);
  });
  it("should display component with proper data", () => {
    render(
      <DailyWeatherDetails
        data={oneCallWeatherMock.daily[0]}
        cityName={testCityString}
      />
    );

    expect(screen.getByText(testCityString)).toBeInTheDocument();
    expect(screen.getByText(`${testData.temp.morn}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.temp.day}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.temp.night}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.temp.min}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.temp.max}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testMeanValue}°`)).toBeInTheDocument();
    expect(
      screen.getByText(testModeValue.map((mode) => `${mode}°`).join(", "))
    ).toBeInTheDocument();
    expect(screen.getByText(testDateString)).toBeInTheDocument();
  });
});
