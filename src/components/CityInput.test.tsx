import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CityInput } from "./CityInput";

const onSubmitMock = jest.fn();

describe("CityInput component", () => {
  it("should display input with options and call onSubmit", () => {
    render(<CityInput onSubmit={onSubmitMock} />);
    const inputElement = screen.getByTitle("City");
    expect(inputElement).toBeInTheDocument();

    userEvent.click(inputElement);
    userEvent.clear(inputElement);
    userEvent.type(inputElement, "Warsz");

    expect(screen.getByTitle("Warszewo")).toBeInTheDocument();
    expect(screen.getByTitle("Warszawa")).toBeInTheDocument();

    userEvent.clear(inputElement);
    userEvent.type(inputElement, "Warszewo");

    expect(onSubmitMock).toBeCalledWith({
      coord: { lat: 53.473289, lon: 14.5465 },
      country: "PL",
      id: 3082597,
      name: "Warszewo",
      state: "",
    });
  });
});
