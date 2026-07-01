import { createContext, useContext, useEffect, useState } from "react";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface CountryContextType {
  country: Country | null;
  setCountry: (country: Country | null) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: React.ReactNode }) => {
  const [country, setCountryState] = useState<Country | null>(null);

  // Load from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("country");
    if (saved) {
      try {
        setCountryState(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("country");
      }
    }
  }, []);

  // Save + update state
  const setCountry = (value: Country | null) => {
    setCountryState(value);

    if (value) {
      localStorage.setItem("country", JSON.stringify(value));
    } else {
      localStorage.removeItem("country");
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used inside CountryProvider");
  }
  return context;
};