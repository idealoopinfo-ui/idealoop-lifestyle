export default function FitnessDetails({

    equipmentType,
    setEquipmentType,
    
    workoutType,
    setWorkoutType,
    
    sportType,
    setSportType,
    
    material,
    setMaterial,
    
    size,
    setSize,
    
    weightCapacity,
    setWeightCapacity,
    
    skillLevel,
    setSkillLevel,
    
    targetArea,
    setTargetArea,
    
    accessories,
    setAccessories
    
    }:any){
    
    return (
    
    <div className="form-section">
    
    <h3>
    Fitness Details
    </h3>
    
    
    <div className="input-grid">
    
    
    <input
    placeholder="Equipment Type"
    value={equipmentType}
    onChange={(e)=>setEquipmentType(e.target.value)}
    />
    
    
    <input
    placeholder="Workout Type"
    value={workoutType}
    onChange={(e)=>setWorkoutType(e.target.value)}
    />
    
    
    <input
    placeholder="Sport Type"
    value={sportType}
    onChange={(e)=>setSportType(e.target.value)}
    />
    
    
    <input
    placeholder="Material"
    value={material}
    onChange={(e)=>setMaterial(e.target.value)}
    />
    
    
    <input
    placeholder="Size"
    value={size}
    onChange={(e)=>setSize(e.target.value)}
    />
    
    
    <input
    placeholder="Weight Capacity"
    value={weightCapacity}
    onChange={(e)=>setWeightCapacity(e.target.value)}
    />
    
    
    <input
    placeholder="Skill Level"
    value={skillLevel}
    onChange={(e)=>setSkillLevel(e.target.value)}
    />
    
    
    <input
    placeholder="Target Area"
    value={targetArea}
    onChange={(e)=>setTargetArea(e.target.value)}
    />
    
    
    <input
    placeholder="Included Accessories"
    value={accessories}
    onChange={(e)=>setAccessories(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }