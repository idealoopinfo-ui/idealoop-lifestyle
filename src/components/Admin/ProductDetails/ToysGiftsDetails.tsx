export default function ToysGiftsDetails({

    ageRange,
    setAgeRange,
    
    educationalFeatures,
    setEducationalFeatures,
    
    dimensions,
    setDimensions
    
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    Toys & Gifts Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Brand"
    />
    
    
    <input
    placeholder="Age Range"
    value={ageRange}
    onChange={(e)=>setAgeRange(e.target.value)}
    />
    
    
    <input
    placeholder="Material"
    />
    
    
    <input
    placeholder="Dimensions"
    value={dimensions}
    onChange={(e)=>setDimensions(e.target.value)}
    />
    
    
    <input
    placeholder="Educational Features"
    value={educationalFeatures}
    onChange={(e)=>setEducationalFeatures(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }