export default function BeautyDetails({
    hairType,
    setHairType,
    skinType,
    setSkinType,
    ingredients,
    setIngredients,
    volumeSize,
    setVolumeSize,
    scent,
    setScent,
    benefits,
    setBenefits,
    suitableFor,
    setSuitableFor
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    Beauty Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Hair Type"
    value={hairType}
    onChange={(e)=>setHairType(e.target.value)}
    />
    
    
    <input
    placeholder="Skin Type"
    value={skinType}
    onChange={(e)=>setSkinType(e.target.value)}
    />
    
    
    <input
    placeholder="Ingredients"
    value={ingredients}
    onChange={(e)=>setIngredients(e.target.value)}
    />
    
    
    <input
    placeholder="Volume / Size"
    value={volumeSize}
    onChange={(e)=>setVolumeSize(e.target.value)}
    />
    
    
    <input
    placeholder="Scent"
    value={scent}
    onChange={(e)=>setScent(e.target.value)}
    />
    
    
    <input
    placeholder="Benefits"
    value={benefits}
    onChange={(e)=>setBenefits(e.target.value)}
    />
    
    
    <input
    placeholder="Suitable For"
    value={suitableFor}
    onChange={(e)=>setSuitableFor(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }