import { FormEvent, useRef } from "react";
import "./CityInput.css";

export function CityInput({ onSubmit }: { onSubmit: (value: string) => any }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChagneQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) onSubmit(value);
  };

  return (
    <form onSubmit={handleChagneQuery} className="city-field">
      <input
        className="city-input"
        type="text"
        defaultValue="Warszawa"
        ref={inputRef}
      />
      <button className="city-submit" type="submit">
        →
      </button>
    </form>
  );
}
