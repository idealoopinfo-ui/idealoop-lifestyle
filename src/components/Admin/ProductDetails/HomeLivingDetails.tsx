export default function HomeLivingDetails({

    dimensions,
    setDimensions,
    
    color,
    setColor,
    
    roomType,
    setRoomType,
    
    weight,
    setWeight
    
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    Home & Living Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Material"
    value=""
    />
    
    
    <input
    placeholder="Dimensions"
    value={dimensions}
    onChange={(e)=>setDimensions(e.target.value)}
    />
    
    
    <input
    placeholder="Color"
    value={color}
    onChange={(e)=>setColor(e.target.value)}
    />
    
    
    <input
    placeholder="Room Type"
    value={roomType}
    onChange={(e)=>setRoomType(e.target.value)}
    />
    
    
    <input
    placeholder="Weight"
    value={weight}
    onChange={(e)=>setWeight(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }