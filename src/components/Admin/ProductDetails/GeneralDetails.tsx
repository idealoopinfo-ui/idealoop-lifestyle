import React from "react";

interface Feature {
  feature: string;
  value: string;
}

interface GeneralDetailsProps {
  model: string;
  setModel: (value: string) => void;

  color: string;
  setColor: (value: string) => void;

  dimensions: string;
  setDimensions: (value: string) => void;

  weight: string;
  setWeight: (value: string) => void;

  warranty: string;
  setWarranty: (value: string) => void;

  countryOrigin: string;
  setCountryOrigin: (value: string) => void;

  packageIncludes: string;
  setPackageIncludes: (value: string) => void;

  additionalFeatures?: Feature[];

  setAdditionalFeatures?: React.Dispatch<
    React.SetStateAction<Feature[]>
  >;
}

export default function GeneralDetails({
  model,
  setModel,

  color,
  setColor,

  dimensions,
  setDimensions,

  weight,
  setWeight,

  warranty,
  setWarranty,

  countryOrigin,
  setCountryOrigin,

  packageIncludes,
  setPackageIncludes,

  additionalFeatures = [],
  setAdditionalFeatures,

}: GeneralDetailsProps) {

  /* =========================
     ADD FEATURE
  ========================= */

  const addFeature = () => {

    if (!setAdditionalFeatures) {
      console.error(
        "setAdditionalFeatures was not passed to GeneralDetails"
      );

      return;
    }

    setAdditionalFeatures((currentFeatures) => [

      ...currentFeatures,

      {
        feature: "",
        value: "",
      },

    ]);

  };


  /* =========================
     UPDATE FEATURE
  ========================= */

  const updateFeature = (
    index: number,
    field: "feature" | "value",
    value: string
  ) => {

    if (!setAdditionalFeatures) {
      return;
    }

    setAdditionalFeatures((currentFeatures) => {

      const updatedFeatures = [
        ...currentFeatures
      ];

      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [field]: value,
      };

      return updatedFeatures;

    });

  };


  /* =========================
     REMOVE FEATURE
  ========================= */

  const removeFeature = (index: number) => {

    if (!setAdditionalFeatures) {
      return;
    }

    setAdditionalFeatures((currentFeatures) =>
      currentFeatures.filter(
        (_, featureIndex) =>
          featureIndex !== index
      )
    );

  };


  return (

    <div className="form-section">

      <h3>
        General Product Details
      </h3>


      {/* =========================
          GENERAL DETAILS
      ========================= */}

      <div className="input-grid">

        <input
          type="text"
          placeholder="Model"
          value={model || ""}
          onChange={(e) =>
            setModel(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Color"
          value={color || ""}
          onChange={(e) =>
            setColor(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Dimensions"
          value={dimensions || ""}
          onChange={(e) =>
            setDimensions(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Weight"
          value={weight || ""}
          onChange={(e) =>
            setWeight(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Warranty"
          value={warranty || ""}
          onChange={(e) =>
            setWarranty(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Country of Origin"
          value={countryOrigin || ""}
          onChange={(e) =>
            setCountryOrigin(e.target.value)
          }
        />

      </div>


      {/* =========================
          PACKAGE INCLUDES
      ========================= */}

      <div className="package-section">

        <textarea
          placeholder="Package Includes"
          value={packageIncludes || ""}
          onChange={(e) =>
            setPackageIncludes(e.target.value)
          }
        />

      </div>


      {/* =========================
          ADDITIONAL FEATURES
      ========================= */}

      <div className="additional-features-section">

        <div className="additional-features-header">

          <h4>
            Additional Features
          </h4>


          <button
            type="button"
            className="add-feature-btn"
            onClick={addFeature}
          >
            + Add Feature
          </button>

        </div>


        {additionalFeatures.length === 0 && (

          <p className="no-features-message">
            No additional features added.
          </p>

        )}


        {additionalFeatures.map(
          (item, index) => (

            <div
              className="additional-feature-row"
              key={index}
            >

              <input
                type="text"
                placeholder="Feature"
                value={item.feature || ""}
                onChange={(e) =>
                  updateFeature(
                    index,
                    "feature",
                    e.target.value
                  )
                }
              />


              <input
                type="text"
                placeholder="Value"
                value={item.value || ""}
                onChange={(e) =>
                  updateFeature(
                    index,
                    "value",
                    e.target.value
                  )
                }
              />


              <button
                type="button"
                className="remove-feature-btn"
                onClick={() =>
                  removeFeature(index)
                }
              >
                Remove
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );
}