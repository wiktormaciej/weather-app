import { ReactElement, useEffect, useMemo, useState } from "react";
import cityList from "../assets/city.list.min.json";
import "./CityInput.css";

export interface CityRecord {
  name: string;
  coord: { lon: number; lat: number };
  id: number;
}

const getSuggestions = (cityName: string): CityRecord[] => {
  // This function is not too efficent since massive city list JSON is loaded, but it's needed for proper autocomplete
  const result: CityRecord[] = [];
  for (
    let i = 0;
    result.length < 5 && i < (cityList as CityRecord[]).length;
    i++
  ) {
    const currentCityRecord = (cityList as CityRecord[])[i];
    if (
      currentCityRecord.name.toLowerCase().startsWith(cityName.toLowerCase())
    ) {
      if (!result.find((city) => city.name === currentCityRecord.name))
        result.push(currentCityRecord);
    }
  }
  return result;
};

interface CityInputProps {
  onSubmit: (value: CityRecord) => any;
}

export function CityInput({ onSubmit }: CityInputProps): ReactElement {
  const [cityName, setCityName] = useState("Warszawa");

  const suggestions = useMemo(() => getSuggestions(cityName), [cityName]);

  useEffect(() => {
    const matchingCityRecord = suggestions?.find(
      (cityRecord) => cityRecord.name.toLowerCase() === cityName.toLowerCase()
    );
    if (matchingCityRecord) onSubmit(matchingCityRecord);
  }, [cityName, suggestions, onSubmit]);

  return (
    <div className="city-field">
      <input
        className="city-input"
        title="City"
        type="text"
        value={cityName}
        onChange={(e) => {
          e.preventDefault();
          setCityName(e.target.value);
        }}
        list="cities"
      />
      {suggestions?.length && (
        <datalist id="cities">
          {suggestions.map((city) => {
            if (city.name === cityName) return null;
            return <option value={city.name} key={city.id} title={city.name} />;
          })}
        </datalist>
      )}
    </div>
  );
}
