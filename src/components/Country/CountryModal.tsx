import { useState } from "react";
import { countries } from "../../data/countries";
import "./CountryModal.css";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface Props {
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export default function CountryModal({ onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="country-overlay">

      <div className="country-modal">

        {/* HEADER */}
        <div className="country-header">
          <h2>🌍 Select Country</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* INFO */}
        <p className="country-info">
          Choose your country for better pricing and shipping experience.
        </p>

        {/* SEARCH */}
        <input
          className="country-search"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        <div className="country-list">
          {filteredCountries.map((c) => (
            <div
              key={c.code}
              className="country-item"
              onClick={() => {
                onSelect(c);
                onClose();
              }}
            >
              <span className="flag">{c.flag}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}