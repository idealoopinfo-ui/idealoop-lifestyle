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
    setPackageIncludes
    
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    General Product Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Model"
    value={model}
    onChange={(e)=>setModel(e.target.value)}
    />
    
    
    <input
    placeholder="Color"
    value={color}
    onChange={(e)=>setColor(e.target.value)}
    />
    
    
    <input
    placeholder="Dimensions"
    value={dimensions}
    onChange={(e)=>setDimensions(e.target.value)}
    />
    
    
    <input
    placeholder="Weight"
    value={weight}
    onChange={(e)=>setWeight(e.target.value)}
    />
    
    
    <input
    placeholder="Warranty"
    value={warranty}
    onChange={(e)=>setWarranty(e.target.value)}
    />
    
    
    <input
    placeholder="Country of Origin"
    value={countryOrigin}
    onChange={(e)=>setCountryOrigin(e.target.value)}
    />
    
    
    </div>
    
    
    <div className="package-section">
    
    <textarea
    placeholder="Package Includes"
    value={packageIncludes}
    onChange={(e)=>setPackageIncludes(e.target.value)}
    />
    
    </div>
    
    
    </div>
    
    )
    
    }