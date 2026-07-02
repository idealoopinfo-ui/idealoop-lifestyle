import { useState, useRef, useEffect } from "react";
import { countries } from "../../data/countries";
import { useCountry } from "../../context/CountryContext";
import "./CountryButton.css";

interface Country {
  name: string;
  code: string;
  flag: string;
}

const CountryButton = () => {
  const [open, setOpen] = useState(false);
  const { country, setCountry } = useCountry();

  const ref = useRef<HTMLDivElement | null>(null);

  // close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="country-wrapper" ref={ref}>

      {/* BUTTON */}
      <button
        className="country-btn"
        onClick={() => setOpen(!open)}
      >
        {country ? (
          <span className="country-selected">
          <span className="flag">{country.flag}</span>
          <span className="country-name">
            {country.name.replace(/^[A-Z]{2}\s/, "")}
          </span>
        </span>
        ) : (
          <span className="country-name">🌍 Select Country</span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="country-dropdown">

          <div className="country-header">
            <strong>Select Country</strong>
            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <p className="country-info">
            Choose your country for better pricing and shipping options.
          </p>

          <input
            className="country-search"
            placeholder="Search country..."
          />

          <div className="country-list">
            {countries.map((c) => (
              <div
                key={c.code}
                className="country-item"
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                }}
              >
                <span className="flag">{c.flag}</span>
                <span className="country-name">{c.name}</span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default CountryButton;