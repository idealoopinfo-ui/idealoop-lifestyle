export default function FashionDetails({
    material,
    setMaterial,
    fit,
    setFit,
    style,
    setStyle,
    occasion,
    setOccasion,
    season,
    setSeason,
    gender,
    setGender,
    pattern,
    setPattern,
    type,
    setType,
    sleeveType,
    setSleeveType,
    collarStyle,
    setCollarStyle,
    fabric,
    setFabric,
    fabricType,
    setFabricType,
    details,
    setDetails,
    printingType,
    setPrintingType,
    sheer,
    setSheer,
    careInstructions,
    setCareInstructions,
  
    size,
    setSize,
    color,
    setColor,
    clothingLength,
    setClothingLength,
    waistType,
    setWaistType,
    closureType,
    setClosureType,
    stretch,
    setStretch,
    ageGroup,
    setAgeGroup,
  }: any) {
    return (
        <div className="form-section fashion-details">
  
        <h3>Fashion Details</h3>
  
        <div className="input-grid">
  
          <input
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
  
          <input
            placeholder="Fit"
            value={fit}
            onChange={(e) => setFit(e.target.value)}
          />
  
          <input
            placeholder="Style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
  
          <input
            placeholder="Occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
  
          <input
            placeholder="Season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
  
          <input
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
  
          <input
            placeholder="Pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
  
          <input
            placeholder="Product Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
  
          <input
            placeholder="Sleeve Type"
            value={sleeveType}
            onChange={(e) => setSleeveType(e.target.value)}
          />
  
          <input
            placeholder="Collar / Neckline"
            value={collarStyle}
            onChange={(e) => setCollarStyle(e.target.value)}
          />
  
          <input
            placeholder="Fabric"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
          />
  
          <input
            placeholder="Fabric Type"
            value={fabricType}
            onChange={(e) => setFabricType(e.target.value)}
          />
  
          <input
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
  
          <input
            placeholder="Printing Type"
            value={printingType}
            onChange={(e) => setPrintingType(e.target.value)}
          />
  
          <input
            placeholder="Sheer"
            value={sheer}
            onChange={(e) => setSheer(e.target.value)}
          />
  
          <input
            placeholder="Care Instructions"
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
          />
  
          <input
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
  
          <input
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
  
          <input
            placeholder="Clothing Length"
            value={clothingLength}
            onChange={(e) => setClothingLength(e.target.value)}
          />
  
          <input
            placeholder="Waist Type"
            value={waistType}
            onChange={(e) => setWaistType(e.target.value)}
          />
  
          <input
            placeholder="Closure Type"
            value={closureType}
            onChange={(e) => setClosureType(e.target.value)}
          />
  
          <input
            placeholder="Stretch"
            value={stretch}
            onChange={(e) => setStretch(e.target.value)}
          />
  
          <input
            placeholder="Age Group"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
  
        </div>
  
      </div>
    );
  }