import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { oneCallWeatherMock } from "./mocks/oneCallWeather.mock";
import { setupServer } from "msw/node";
import { mean, mode } from "./utils/utils";
import userEvent from "@testing-library/user-event";

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

  let secondCardElement: Element;

  await waitFor(() => {
    const cardElements = screen.getAllByTestId("card");
    secondCardElement = cardElements[1];
    cardElements.forEach((cardElement, id) => {
      const testDailyData = oneCallWeatherMock.daily[id];

      if (id > 4) return;
      const testDayName = new Date(testDailyData.dt * 1000).toLocaleString(
        "en-Us",
        {
          weekday: "long",
        }
      );

      expect(
        within(cardElement).getByText(`${Math.round(testDailyData.temp.day)}°`)
      ).toBeInTheDocument();
      expect(
        within(cardElement).getByText(
          `${Math.round(testDailyData.temp.night)}°`
        )
      ).toBeInTheDocument();
      expect(within(cardElement).getByText(testDayName)).toBeInTheDocument();
    });
  });

  //Details
  const currentDataRecord = oneCallWeatherMock.daily[0];

  const currentDataDateString = new Date(
    currentDataRecord.dt * 1000
  ).toDateString();

  const { morn, day, night, min, max } = currentDataRecord.temp;

  expect(screen.getByText("Warszawa")).toBeInTheDocument();
  expect(screen.getByText(`${morn}°`)).toBeInTheDocument();
  expect(screen.getByText(`${day}°`)).toBeInTheDocument();
  expect(screen.getByText(`${night}°`)).toBeInTheDocument();
  expect(screen.getByText(`${min}°`)).toBeInTheDocument();
  expect(screen.getByText(`${max}°`)).toBeInTheDocument();
  expect(
    screen.getByText(`${Math.round(mean([morn, day, night]))}°`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      mode([morn, day, night])
        .map((mode) => `${mode}°`)
        .join(", ")
    )
  ).toBeInTheDocument();
  expect(screen.getByText(currentDataDateString)).toBeInTheDocument();

  userEvent.click(secondCardElement!);

  //New details after clickin on card
  const newDataRecord = oneCallWeatherMock.daily[0];

  const newDataDateString = new Date(
    currentDataRecord.dt * 1000
  ).toDateString();

  const {
    morn: newMorn,
    day: newDay,
    night: newNight,
    min: newMin,
    max: newMax,
  } = newDataRecord.temp;

  expect(screen.getByText("Warszawa")).toBeInTheDocument();
  expect(screen.getByText(`${newMorn}°`)).toBeInTheDocument();
  expect(screen.getByText(`${newDay}°`)).toBeInTheDocument();
  expect(screen.getByText(`${newNight}°`)).toBeInTheDocument();
  expect(screen.getByText(`${newMin}°`)).toBeInTheDocument();
  expect(screen.getByText(`${newMax}°`)).toBeInTheDocument();
  expect(
    screen.getByText(`${Math.round(mean([newMorn, newDay, newNight]))}°`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      mode([newMorn, newDay, newNight])
        .map((mode) => `${mode}°`)
        .join(", ")
    )
  ).toBeInTheDocument();
  expect(screen.getByText(newDataDateString)).toBeInTheDocument();

  userEvent.click(secondCardElement!);
});
