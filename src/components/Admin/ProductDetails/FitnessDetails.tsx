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
    setAccessories,
    
    wellnessType,
    setWellnessType,
    
    usageArea,
    setUsageArea,
    
    wellnessBenefits,
    setWellnessBenefits,
    
    powerSource,
    setPowerSource,
    
    batteryCapacity,
    setBatteryCapacity,
    
    heatFunction,
    setHeatFunction,
    
    massageType,
    setMassageType,
    
    scent,
    setScent,
    
    volumeSize,
    setVolumeSize,
    
    ingredients,
    setIngredients
    
    }:any){
    
    
    return (
    
    <div className="form-section">
    
    <h3>
    Fitness & Wellness Details
    </h3>
    
    
    <div className="input-grid">
    
    
    {/* FITNESS DETAILS */}
    
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
    
    
    
    {/* WELLNESS DETAILS */}
    
    
    <input
    placeholder="Wellness Type"
    value={wellnessType}
    onChange={(e)=>setWellnessType(e.target.value)}
    />
    
    
    <input
    placeholder="Usage Area"
    value={usageArea}
    onChange={(e)=>setUsageArea(e.target.value)}
    />
    
    
    <input
    placeholder="Wellness Benefits"
    value={wellnessBenefits}
    onChange={(e)=>setWellnessBenefits(e.target.value)}
    />
    
    
    <input
    placeholder="Power Source"
    value={powerSource}
    onChange={(e)=>setPowerSource(e.target.value)}
    />
    
    
    <input
    placeholder="Battery Capacity"
    value={batteryCapacity}
    onChange={(e)=>setBatteryCapacity(e.target.value)}
    />
    
    
    <input
    placeholder="Heat Function"
    value={heatFunction}
    onChange={(e)=>setHeatFunction(e.target.value)}
    />
    
    
    <input
    placeholder="Massage Type"
    value={massageType}
    onChange={(e)=>setMassageType(e.target.value)}
    />
    
    
    <input
    placeholder="Scent"
    value={scent}
    onChange={(e)=>setScent(e.target.value)}
    />
    
    
    <input
    placeholder="Volume Size"
    value={volumeSize}
    onChange={(e)=>setVolumeSize(e.target.value)}
    />
    
    
    <input
    placeholder="Ingredients"
    value={ingredients}
    onChange={(e)=>setIngredients(e.target.value)}
    />
    
    
    </div>
    
    </div>
    
    )
    
    }