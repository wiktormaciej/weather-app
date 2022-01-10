import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { oneCallWeatherMock } from "./mocks/oneCallWeather.mock";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/onecall",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(oneCallWeatherMock));
    }
  )
);
beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

test("Should display five days weather with proper data", async () => {
  render(<App />);

  await waitFor(() => {
    oneCallWeatherMock.daily.forEach((dailyData, id) => {
      if (id > 4) return;
      expect(
        screen.getByText(`Morn: ${dailyData.temp.morn}℃`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Day: ${dailyData.temp.day}℃`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Night: ${dailyData.temp.night}℃`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Min: ${dailyData.temp.min}℃`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Max: ${dailyData.temp.max}℃`)
      ).toBeInTheDocument();
      // expect(
      //   screen.getByText(`Mean: ${dailyData.temp.morn}℃`)
      // ).toBeInTheDocument();
      // expect(
      //   screen.getByText(`Modes: ${dailyData.temp.morn}℃`)
      // ).toBeInTheDocument();
    });
  });
});
