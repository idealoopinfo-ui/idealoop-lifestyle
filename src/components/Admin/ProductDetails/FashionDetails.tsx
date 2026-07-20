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
    setGender
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    Fashion Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Material"
    value={material}
    onChange={(e)=>setMaterial(e.target.value)}
    />
    
    
    <input
    placeholder="Fit"
    value={fit}
    onChange={(e)=>setFit(e.target.value)}
    />
    
    
    <input
    placeholder="Style"
    value={style}
    onChange={(e)=>setStyle(e.target.value)}
    />
    
    
    <input
    placeholder="Occasion"
    value={occasion}
    onChange={(e)=>setOccasion(e.target.value)}
    />
    
    
    <input
    placeholder="Season"
    value={season}
    onChange={(e)=>setSeason(e.target.value)}
    />
    
    
    <input
    placeholder="Gender"
    value={gender}
    onChange={(e)=>setGender(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }