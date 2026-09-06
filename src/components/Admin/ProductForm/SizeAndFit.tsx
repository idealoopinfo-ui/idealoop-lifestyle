import React from "react";
import "./SizeAndFit.css";

interface SizeAndFitProps {
  sizeSystems: string[];
  setSizeSystems: React.Dispatch<React.SetStateAction<string[]>>;

  availableSizesUS: string;
  setAvailableSizesUS: React.Dispatch<React.SetStateAction<string>>;

  availableSizesUK: string;
  setAvailableSizesUK: React.Dispatch<React.SetStateAction<string>>;

  availableSizesEU: string;
  setAvailableSizesEU: React.Dispatch<React.SetStateAction<string>>;

  availableSizesInternational: string;
  setAvailableSizesInternational: React.Dispatch<
    React.SetStateAction<string>
  >;

  fit: string;
  setFit: React.Dispatch<React.SetStateAction<string>>;

  sizeAccuracy: string;
  setSizeAccuracy: React.Dispatch<React.SetStateAction<string>>;

  sizeChart: string;
  setSizeChart: React.Dispatch<React.SetStateAction<string>>;
}

const SIZE_SYSTEM_OPTIONS = [
  "US",
  "UK",
  "EU",
  "International",
  "One Size",
  "Average Size",
];

export default function SizeAndFit({
  sizeSystems,
  setSizeSystems,

  availableSizesUS,
  setAvailableSizesUS,

  availableSizesUK,
  setAvailableSizesUK,

  availableSizesEU,
  setAvailableSizesEU,

  availableSizesInternational,
  setAvailableSizesInternational,

  fit,
  setFit,

  sizeAccuracy,
  setSizeAccuracy,

  sizeChart,
  setSizeChart,
}: SizeAndFitProps) {
  const toggleSizeSystem = (system: string) => {
    if (sizeSystems.includes(system)) {
      setSizeSystems(
        sizeSystems.filter((item) => item !== system)
      );
    } else {
      setSizeSystems([
        ...sizeSystems,
        system,
      ]);
    }
  };

  return (
    <section className="size-fit-section">

      <h3>Size & Fit</h3>

      <p className="size-fit-help">
        Add only the size information provided by the seller.
        You can select more than one size system when applicable.
      </p>

      {/* SIZE SYSTEM */}

      <div className="size-system-group">

  <label className="size-system-label">
    Size System
  </label>

  <div className="size-system-options">

          {SIZE_SYSTEM_OPTIONS.map((system) => (

<label
key={system}
className="size-system-option"
>
              <input
                type="checkbox"
                checked={sizeSystems.includes(system)}
                onChange={() =>
                  toggleSizeSystem(system)
                }
              />

              <span>{system}</span>

            </label>

          ))}

        </div>

      </div>

      {/* AVAILABLE SIZES */}

      <div className="size-fit-grid">

      <div className="size-fit-field">

          <label>US Sizes</label>

          <input
            type="text"
            value={availableSizesUS}
            onChange={(e) =>
              setAvailableSizesUS(e.target.value)
            }
            placeholder="e.g. 4 • 6 • 8 • 10 • 12"
          />

        </div>

        <div className="size-fit-field">

          <label>UK Sizes</label>

          <input
            type="text"
            value={availableSizesUK}
            onChange={(e) =>
              setAvailableSizesUK(e.target.value)
            }
            placeholder="e.g. 8 • 10 • 12 • 14 • 16"
          />

        </div>

        <div className="size-fit-field">

          <label>EU Sizes</label>

          <input
            type="text"
            value={availableSizesEU}
            onChange={(e) =>
              setAvailableSizesEU(e.target.value)
            }
            placeholder="e.g. 36 • 38 • 40 • 42"
          />

        </div>

        <div className="size-fit-field">

          <label>International Sizes</label>

          <input
            type="text"
            value={availableSizesInternational}
            onChange={(e) =>
              setAvailableSizesInternational(
                e.target.value
              )
            }
            placeholder="e.g. XS • S • M • L • XL • 2XL"
          />

        </div>

      </div>

      {/* FIT & ACCURACY */}

      <div className="size-fit-grid">

      <div className="size-fit-field">

          <label>Fit</label>

          <input
            type="text"
            value={fit}
            onChange={(e) =>
              setFit(e.target.value)
            }
            placeholder="e.g. Regular Fit, Slim Fit, Loose Fit"
          />

        </div>

        <div className="size-fit-field">

          <label>Size Accuracy</label>

          <input
            type="text"
            value={sizeAccuracy}
            onChange={(e) =>
              setSizeAccuracy(e.target.value)
            }
            placeholder="e.g. 96% true to size"
          />

        </div>

      </div>

      {/* SIZE CHART */}

      <div className="size-fit-field">

        <label>Size Chart / Measurements</label>

        <textarea
          rows={5}
          value={sizeChart}
          onChange={(e) =>
            setSizeChart(e.target.value)
          }
          placeholder="Add seller-provided measurements or size-chart details. Do not invent measurements."
        />

      </div>

      <p className="size-fit-customer-note">
  Customer note: Need the exact size? Check the
  seller&apos;s product site for the actual size chart
  and measurements before ordering.
</p>

    </section>
  );
}