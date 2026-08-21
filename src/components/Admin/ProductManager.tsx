import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import GeneralDetails from "./ProductDetails/GeneralDetails";
import FashionDetails from "./ProductDetails/FashionDetails";
import BeautyDetails from "./ProductDetails/BeautyDetails";
import HomeLivingDetails from "./ProductDetails/HomeLivingDetails";
import ToysGiftsDetails from "./ProductDetails/ToysGiftsDetails";
import FitnessDetails from "./ProductDetails/FitnessDetails";

import ProductImages from "./ProductForm/ProductImages";
import AffiliateInformation from "./ProductForm/AffiliateInformation";
import CategorySelector from "./ProductForm/CategorySelector";

import "./ProductManager.css";


interface Props {
  selectedProduct?: any;
}

export default function ProductManager({selectedProduct}: Props) {

const [productSearch, setProductSearch] = useState("");

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [shortDescription,setShortDescription] = useState("");
const [shopName,setShopName] = useState("");
const [brand,setBrand] = useState("");
const [additionalFeatures, setAdditionalFeatures] = useState<
  { feature: string; value: string }[]
>([]);

const [spotlight, setSpotlight] = useState(false);
const [facebookPublishing, setFacebookPublishing] = useState(false);
const [facebookPublished, setFacebookPublished] = useState(false);
const [facebookPublishError, setFacebookPublishError] = useState("");

const [editingId,setEditingId] = useState<string | null>(null);

const [image1,setImage1] = useState("");
const [image2,setImage2] = useState("");
const [image3,setImage3] = useState("");
const [image4,setImage4] = useState("");
const [image5,setImage5] = useState("");

const [affiliateUrl,setAffiliateUrl] = useState("");
const [sourceUrl, setSourceUrl] = useState("");
const [marketplace,setMarketplace] = useState("");

const [productId,setProductId] = useState("");
const [featured,setFeatured] = useState(false);
const [trending,setTrending] = useState(false);
const [season,setSeason] = useState("");
const [style,setStyle] = useState("");
const [occasion,setOccasion] = useState("");
const [gender, setGender] = useState("");

/* CATEGORY */

const [department,setDepartment] = useState("");
const [category,setCategory] = useState("");
const [subcategory,setSubcategory] = useState("");
const [collection,setCollection] = useState("");
const [productType, setProductType] = useState("");
const [material,setMaterial] = useState("");
const [fit,setFit] = useState("");
const [pattern, setPattern] = useState("");
const [fashionType, setFashionType] = useState("");
const [sleeveType, setSleeveType] = useState("");
const [collarStyle, setCollarStyle] = useState("");
const [fabric, setFabric] = useState("");
const [fabricType, setFabricType] = useState("");
const [fashionDetails, setFashionDetails] = useState("");
const [printingType, setPrintingType] = useState("");
const [sheer, setSheer] = useState("");
const [careInstructions, setCareInstructions] = useState("");
// Beauty fields
const [hairType, setHairType] = useState("");
const [skinType, setSkinType] = useState("");
const [ingredients, setIngredients] = useState("");
const [volumeSize, setVolumeSize] = useState("");
const [scent, setScent] = useState("");
const [benefits, setBenefits] = useState("");
const [suitableFor, setSuitableFor] = useState("");

// Home & Living fields
const [dimensions, setDimensions] = useState("");
const [color, setColor] = useState("");
const [roomType, setRoomType] = useState("");
const [weight, setWeight] = useState("");

// Toys & Gifts fields
const [ageRange, setAgeRange] = useState("");
const [educationalFeatures, setEducationalFeatures] = useState("");

const [model,setModel] = useState("");
const [warranty,setWarranty] = useState("");
const [countryOrigin,setCountryOrigin] = useState("");
const [packageIncludes,setPackageIncludes] = useState("");

const [equipmentType, setEquipmentType] = useState("");
const [workoutType, setWorkoutType] = useState("");
const [sportType, setSportType] = useState("");

const [size, setSize] = useState("");
const [clothingLength, setClothingLength] = useState("");
const [waistType, setWaistType] = useState("");
const [closureType, setClosureType] = useState("");
const [stretch, setStretch] = useState("");
const [ageGroup, setAgeGroup] = useState("");
const [weightCapacity, setWeightCapacity] = useState("");
const [skillLevel, setSkillLevel] = useState("");
const [targetArea, setTargetArea] = useState("");
const [accessories, setAccessories] = useState("");
const [wellnessType, setWellnessType] = useState("");
const [usageArea, setUsageArea] = useState("");
const [wellnessBenefits, setWellnessBenefits] = useState("");
const [powerSource, setPowerSource] = useState("");
const [batteryCapacity, setBatteryCapacity] = useState("");
const [heatFunction, setHeatFunction] = useState("");
const [massageType, setMassageType] = useState("");



/* LOAD PRODUCTS */

useEffect(()=>{

  fetchProducts();
  
  },[]);
  
  
  useEffect(() => {

    if (!selectedProduct) {
      return;
    }
  
    setEditingId(selectedProduct.id || null);
  
    // GENERAL
setProductId(selectedProduct.product_id || "");
setTitle(selectedProduct.title || "");
setBrand(selectedProduct.brand || "");
setDescription(selectedProduct.description || "");

setShortDescription(
  selectedProduct.short_description || ""
);

setAdditionalFeatures(
  Array.isArray(selectedProduct.additional_features)
    ? selectedProduct.additional_features
    : []
);
  
    // IMAGES
    setImage1(selectedProduct.image_1 || "");
    setImage2(selectedProduct.image_2 || "");
    setImage3(selectedProduct.image_3 || "");
    setImage4(selectedProduct.image_4 || "");
    setImage5(selectedProduct.image_5 || "");
  
    // AFFILIATE
    setAffiliateUrl(
      selectedProduct.affiliate_url || ""
    );
  
    setSourceUrl(
      selectedProduct.source_url || ""
    );
  
    setShopName(
      selectedProduct.shop_name || ""
    );
  
    setMarketplace(
      selectedProduct.marketplace || ""
    );
  
    // CATEGORY
    setDepartment(
      selectedProduct.department || ""
    );
  
    setCategory(
      selectedProduct.category || ""
    );
  
    setSubcategory(
      selectedProduct.subcategory || ""
    );
  
    setCollection(
      selectedProduct.collection || ""
    );
  
    setProductType(
      selectedProduct.product_type || ""
    );
  
    // FASHION
    setSeason(
      selectedProduct.season || ""
    );
  
    setStyle(
      selectedProduct.style || ""
    );
  
    setOccasion(
      selectedProduct.occasion || ""
    );
  
    setMaterial(
      selectedProduct.material || ""
    );
  
    setFit(
      selectedProduct.fit || ""
    );
  
    setGender(
      selectedProduct.gender || ""
    );

    setPattern(
      selectedProduct.pattern || ""
    );

    setSize(
      selectedProduct.size || ""
    );
    
    setColor(
      selectedProduct.color || ""
    );
    
    setClothingLength(
      selectedProduct.clothing_length || ""
    );
    
    setWaistType(
      selectedProduct.waist_type || ""
    );
    
    setClosureType(
      selectedProduct.closure_type || ""
    );
    
    setStretch(
      selectedProduct.stretch || ""
    );
    
    setAgeGroup(
      selectedProduct.age_group || ""
    );
    
    setFashionType(
      selectedProduct.fashion_type || ""
    );
    
    setSleeveType(
      selectedProduct.sleeve_type || ""
    );
    
    setCollarStyle(
      selectedProduct.collar_style || ""
    );
    
    setFabric(
      selectedProduct.fabric || ""
    );
    
    setFabricType(
      selectedProduct.fabric_type || ""
    );
    
    setFashionDetails(
      selectedProduct.fashion_details || ""
    );
    
    setPrintingType(
      selectedProduct.printing_type || ""
    );
    
    setSheer(
      selectedProduct.sheer || ""
    );
    
    setCareInstructions(
      selectedProduct.care_instructions || ""
    );
  
    // BEAUTY
    setHairType(
      selectedProduct.hair_type || ""
    );
  
    setSkinType(
      selectedProduct.skin_type || ""
    );
  
    setIngredients(
      selectedProduct.ingredients || ""
    );
  
    setVolumeSize(
      selectedProduct.volume_size || ""
    );
  
    setScent(
      selectedProduct.scent || ""
    );
  
    setBenefits(
      selectedProduct.benefits || ""
    );
  
    setSuitableFor(
      selectedProduct.suitable_for || ""
    );
  
    // HOME & LIVING
    setDimensions(
      selectedProduct.dimensions || ""
    );
  
    setColor(
      selectedProduct.color || ""
    );
  
    setRoomType(
      selectedProduct.room_type || ""
    );
  
    setWeight(
      selectedProduct.weight || ""
    );
  
    // TOYS & GIFTS
    setAgeRange(
      selectedProduct.age_range || ""
    );
  
    setEducationalFeatures(
      selectedProduct.educational_features || ""
    );
  
    // FITNESS
    setEquipmentType(
      selectedProduct.equipment_type || ""
    );
  
    setWorkoutType(
      selectedProduct.workout_type || ""
    );
  
    setSportType(
      selectedProduct.sport_type || ""
    );
  
    setSize(
      selectedProduct.size || ""
    );
  
    setWeightCapacity(
      selectedProduct.weight_capacity || ""
    );
  
    setSkillLevel(
      selectedProduct.skill_level || ""
    );
  
    setTargetArea(
      selectedProduct.target_area || ""
    );
  
    setAccessories(
      selectedProduct.accessories || ""
    );
  
    setWellnessType(
      selectedProduct.wellness_type || ""
    );
  
    setUsageArea(
      selectedProduct.usage_area || ""
    );
  
    setWellnessBenefits(
      selectedProduct.wellness_benefits || ""
    );
  
    setPowerSource(
      selectedProduct.power_source || ""
    );
  
    setBatteryCapacity(
      selectedProduct.battery_capacity || ""
    );
  
    setHeatFunction(
      selectedProduct.heat_function || ""
    );
  
    setMassageType(
      selectedProduct.massage_type || ""
    );
  
    // VISIBILITY
    setFeatured(
      selectedProduct.featured || false
    );
  
    setTrending(
      selectedProduct.trending || false
    );
  
    setSpotlight(
      selectedProduct.spotlight || false
    );
  
  }, [selectedProduct]);
        
  const fetchProducts = async () => {
    const { error } = await supabase
      .from("products")
      .select("id")
      .limit(1);
  
    if (error) {
      console.log(error);
    }
  };

        useEffect(() => {

                if (department) {
                  generateProductId();
                  
                }
              
              }, [department]);


const generateProductId = async () => {

        let prefix = "GEN";

        if (department === "fashion") {
          prefix = "CLT";
        }
        
        if (department === "beauty") {
          prefix = "BEA";
        }
        
        if (department === "home-living") {
          prefix = "HOM";
        }
        
        if (department === "toys-gifts") {
          prefix = "TOY";
        }
        
        if (
                department === "fitness" ||
                department === "fitness-wellness" ||
                department === "Fitness & Wellness"
              ) {
                prefix = "FIT";
              
        }

  const { data, error } = await supabase
    .from("products")
    .select("product_id")
    .ilike("product_id", `${prefix}-%`)
    .order("created_at", { ascending: false })
    .limit(1);


  if (error) {
    console.log("ID GENERATION ERROR:", error);
    return;
  }


  let nextNumber = 1;


  if (data && data.length > 0) {

    const lastId = data[0].product_id;

    const numberPart = lastId.split("-")[1];

    const lastNumber = Number(numberPart);

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }


  const newId = `${prefix}-${String(nextNumber).padStart(3,"0")}`;

  setProductId(newId);

};


/* ADD PRODUCT */

const addProduct = async () => {

  const { error } = await supabase
    .from("products")
    .insert([
      {
        product_id: productId,

        title,
        brand,

        additional_features: additionalFeatures.filter(
          (item) =>
            item.feature.trim() !== "" ||
            item.value.trim() !== ""
        ),

        model,
        warranty,
        country_origin: countryOrigin,
        package_includes: packageIncludes,

        description,
        short_description: shortDescription,

        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,
        image_5: image5,

        affiliate_url: affiliateUrl,
        source_url: sourceUrl,

        shop_name: shopName,
        marketplace,

        featured,
        trending,
        spotlight,

        department,
        category,
        subcategory,
        collection,
        product_type: productType,

        /* =========================
           FASHION
        ========================= */

        season,
        style,
        occasion,
        material,
        fit,
        gender,

        pattern,
        fashion_type: fashionType,
        sleeve_type: sleeveType,
        collar_style: collarStyle,
        fabric,
        fabric_type: fabricType,
        fashion_details: fashionDetails,
        printing_type: printingType,
        sheer,
        care_instructions: careInstructions,

        size,
        color,
        clothing_length: clothingLength,
        waist_type: waistType,
        closure_type: closureType,
        stretch,
        age_group: ageGroup,

        /* =========================
           BEAUTY
        ========================= */

        hair_type: hairType,
        skin_type: skinType,
        ingredients,
        volume_size: volumeSize,
        scent,
        benefits,
        suitable_for: suitableFor,

        /* =========================
           HOME & LIVING
        ========================= */

        dimensions,
        room_type: roomType,
        weight,

        /* =========================
           TOYS & GIFTS
        ========================= */

        age_range: ageRange,
        educational_features: educationalFeatures,

        /* =========================
           FITNESS
        ========================= */

        equipment_type: equipmentType,
        workout_type: workoutType,
        sport_type: sportType,
        weight_capacity: weightCapacity,
        skill_level: skillLevel,
        target_area: targetArea,
        accessories,

        wellness_type: wellnessType,
        usage_area: usageArea,
        wellness_benefits: wellnessBenefits,
        power_source: powerSource,
        battery_capacity: batteryCapacity,
        heat_function: heatFunction,
        massage_type: massageType,
      }
    ]);

  if (error) {
    console.log("SUPABASE ERROR:", error.message);
    return;
  }

  /* =========================
     RESET FORM
  ========================= */

  setProductId("");
  setTitle("");
  setDescription("");
  setShortDescription("");
  setAdditionalFeatures([]);
  setBrand("");
  setModel("");
  setWarranty("");
  setCountryOrigin("");
  setPackageIncludes("");

  setImage1("");
  setImage2("");
  setImage3("");
  setImage4("");
  setImage5("");

  setAffiliateUrl("");
  setSourceUrl("");
  setShopName("");
  setMarketplace("");

  setDepartment("");
  setCategory("");
  setSubcategory("");
  setCollection("");
  setProductType("");

  /* FASHION */

  setSeason("");
  setStyle("");
  setOccasion("");
  setMaterial("");
  setFit("");
  setGender("");

  setPattern("");
  setFashionType("");
  setSleeveType("");
  setCollarStyle("");
  setFabric("");
  setFabricType("");
  setFashionDetails("");
  setPrintingType("");
  setSheer("");
  setCareInstructions("");

  setSize("");
  setColor("");
  setClothingLength("");
  setWaistType("");
  setClosureType("");
  setStretch("");
  setAgeGroup("");

  /* BEAUTY */

  setHairType("");
  setSkinType("");
  setIngredients("");
  setVolumeSize("");
  setScent("");
  setBenefits("");
  setSuitableFor("");

  /* HOME */

  setDimensions("");
  setRoomType("");
  setWeight("");

  /* TOYS */

  setAgeRange("");
  setEducationalFeatures("");

  /* FITNESS */

  setEquipmentType("");
  setWorkoutType("");
  setSportType("");
  setWeightCapacity("");
  setSkillLevel("");
  setTargetArea("");
  setAccessories("");

  setWellnessType("");
  setUsageArea("");
  setWellnessBenefits("");
  setPowerSource("");
  setBatteryCapacity("");
  setHeatFunction("");
  setMassageType("");

  setFeatured(false);
  setTrending(false);
  setSpotlight(false);

  await fetchProducts();
};

const updateProduct = async () => {

  if (!editingId) return;

  const { error } = await supabase
    .from("products")
    .update({

      title,
      brand,

      additional_features: additionalFeatures.filter(
        (item) =>
          item.feature.trim() !== "" ||
          item.value.trim() !== ""
      ),

      model,
      warranty,
      country_origin: countryOrigin,
      package_includes: packageIncludes,

      description,
      short_description: shortDescription,

      image_1: image1,
      image_2: image2,
      image_3: image3,
      image_4: image4,
      image_5: image5,

      affiliate_url: affiliateUrl,
      source_url: sourceUrl,

      shop_name: shopName,
      marketplace,

      department,
      category,
      subcategory,
      collection,
      product_type: productType,

      /* =========================
         FASHION
      ========================= */

      season,
      style,
      occasion,
      material,
      fit,
      gender,

      pattern,
      fashion_type: fashionType,
      sleeve_type: sleeveType,
      collar_style: collarStyle,
      fabric,
      fabric_type: fabricType,
      fashion_details: fashionDetails,
      printing_type: printingType,
      sheer,
      care_instructions: careInstructions,

      size,
      color,
      clothing_length: clothingLength,
      waist_type: waistType,
      closure_type: closureType,
      stretch,
      age_group: ageGroup,

      /* =========================
         BEAUTY
      ========================= */

      hair_type: hairType,
      skin_type: skinType,
      ingredients,
      volume_size: volumeSize,
      scent,
      benefits,
      suitable_for: suitableFor,

      /* =========================
         HOME & LIVING
      ========================= */

      dimensions,
      room_type: roomType,
      weight,

      /* =========================
         TOYS & GIFTS
      ========================= */

      age_range: ageRange,
      educational_features: educationalFeatures,

      /* =========================
         FITNESS
      ========================= */

      equipment_type: equipmentType,
      workout_type: workoutType,
      sport_type: sportType,
      weight_capacity: weightCapacity,
      skill_level: skillLevel,
      target_area: targetArea,
      accessories,

      wellness_type: wellnessType,
      usage_area: usageArea,
      wellness_benefits: wellnessBenefits,
      power_source: powerSource,
      battery_capacity: batteryCapacity,
      heat_function: heatFunction,
      massage_type: massageType,

      /* VISIBILITY */

      featured,
      trending,
      spotlight,

    })
    .eq("id", editingId);

  if (error) {

    console.log("UPDATE ERROR:", error.message);
    return;

  }

  setEditingId(null);

  await fetchProducts();
};
  const publishToFacebook = async () => {
    if (!editingId) {
      setFacebookPublishError("Please select or save a product first.");
      return;
    }
  
    if (facebookPublishing) {
      return;
    }
  
    try {
      setFacebookPublishing(true);
      setFacebookPublished(false);
      setFacebookPublishError("");
  
      console.log(
        "📘 Publishing product to Facebook:",
        editingId
      );
  
      const response = await fetch(
        `http://localhost:5000/api/facebook/publish-product/${editingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
      console.log(
        "Facebook publish response:",
        result
      );
  
      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
          "Facebook publishing failed"
        );
      }
  
      setFacebookPublished(true);
  
      // Refresh product list automatically
      await fetchProducts();
  
    } catch (error) {
  
      console.error(
        "❌ Facebook publishing error:",
        error
      );
  
      setFacebookPublished(false);
  
      setFacebookPublishError(
        error instanceof Error
          ? error.message
          : "Facebook publishing failed"
      );
  
    } finally {
  
      setFacebookPublishing(false);
    }
  };

  return (
    <div className="product-manager">
      <form
        className="product-form"
        onSubmit={(e) => e.preventDefault()}
      >
  
        {/* =========================
            PRODUCT INFORMATION
        ========================= */}
  
        <div className="form-section">
  
          <h3>Product Information</h3>
  
          <div className="input-grid">
  
            <input
              placeholder="Product ID"
              value={productId}
              readOnly
            />
  
            <input
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
  
            <input
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
  
          </div>
  
          <GeneralDetails
            model={model}
            setModel={setModel}

            color={color}
            setColor={setColor}

            dimensions={dimensions}
            setDimensions={setDimensions}

            weight={weight}
            setWeight={setWeight}

            warranty={warranty}
            setWarranty={setWarranty}

            countryOrigin={countryOrigin}
            setCountryOrigin={setCountryOrigin}

            packageIncludes={packageIncludes}
            setPackageIncludes={setPackageIncludes}
            
            additionalFeatures={additionalFeatures}
            setAdditionalFeatures={setAdditionalFeatures}
          />
  
          <textarea
            placeholder="Short Description"
            value={shortDescription}
            onChange={(e) =>
              setShortDescription(e.target.value)
            }
          />
  
          <textarea
            placeholder="Product Highlights / Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
  
          <ProductImages
            image1={image1}
            setImage1={setImage1}
            image2={image2}
            setImage2={setImage2}
            image3={image3}
            setImage3={setImage3}
            image4={image4}
            setImage4={setImage4}
            image5={image5}
            setImage5={setImage5}
          />
  
          <AffiliateInformation
            affiliateUrl={affiliateUrl}
            setAffiliateUrl={setAffiliateUrl}
            sourceUrl={sourceUrl}
            setSourceUrl={setSourceUrl}
            shopName={shopName}
            setShopName={setShopName}
            marketplace={marketplace}
            setMarketplace={setMarketplace}
          />
  
          <CategorySelector
            department={department}
            setDepartment={setDepartment}
            category={category}
            setCategory={setCategory}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            collection={collection}
            setCollection={setCollection}
            productType={productType}
            setProductType={setProductType}
          />
  
          {/* =========================
              FASHION DETAILS
          ========================= */}
  
          {department === "fashion" && (
            <FashionDetails
            material={material}
            setMaterial={setMaterial}
          
            fit={fit}
            setFit={setFit}
          
            style={style}
            setStyle={setStyle}
          
            occasion={occasion}
            setOccasion={setOccasion}
          
            season={season}
            setSeason={setSeason}
          
            gender={gender}
            setGender={setGender}
          
            pattern={pattern}
            setPattern={setPattern}
          
            type={fashionType}
            setType={setFashionType}
          
            sleeveType={sleeveType}
            setSleeveType={setSleeveType}
          
            collarStyle={collarStyle}
            setCollarStyle={setCollarStyle}
          
            fabric={fabric}
            setFabric={setFabric}
          
            fabricType={fabricType}
            setFabricType={setFabricType}
          
            details={fashionDetails}
            setDetails={setFashionDetails}
          
            printingType={printingType}
            setPrintingType={setPrintingType}
          
            sheer={sheer}
            setSheer={setSheer}
          
            careInstructions={careInstructions}
setCareInstructions={setCareInstructions}

size={size}
setSize={setSize}

color={color}
setColor={setColor}

clothingLength={clothingLength}
setClothingLength={setClothingLength}

waistType={waistType}
setWaistType={setWaistType}

closureType={closureType}
setClosureType={setClosureType}

stretch={stretch}
setStretch={setStretch}

ageGroup={ageGroup}
setAgeGroup={setAgeGroup}
          />
          )}
  
          {/* =========================
              BEAUTY DETAILS
          ========================= */}
  
          {department === "beauty" && (
            <BeautyDetails
              hairType={hairType}
              setHairType={setHairType}
              skinType={skinType}
              setSkinType={setSkinType}
              ingredients={ingredients}
              setIngredients={setIngredients}
              volumeSize={volumeSize}
              setVolumeSize={setVolumeSize}
              scent={scent}
              setScent={setScent}
              benefits={benefits}
              setBenefits={setBenefits}
              suitableFor={suitableFor}
              setSuitableFor={setSuitableFor}
            />
          )}
  
          {/* =========================
              HOME & LIVING DETAILS
          ========================= */}
  
          {department === "home-living" && (
            <HomeLivingDetails
              dimensions={dimensions}
              setDimensions={setDimensions}
              color={color}
              setColor={setColor}
              roomType={roomType}
              setRoomType={setRoomType}
              weight={weight}
              setWeight={setWeight}
            />
          )}
  
          {/* =========================
              TOYS & GIFTS DETAILS
          ========================= */}
  
          {department === "toys-gifts" && (
            <ToysGiftsDetails
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              educationalFeatures={educationalFeatures}
              setEducationalFeatures={setEducationalFeatures}
              dimensions={dimensions}
              setDimensions={setDimensions}
            />
          )}
  
          {/* =========================
              FITNESS & WELLNESS
          ========================= */}
  
          {department === "fitness-wellness" && (
            <FitnessDetails
              equipmentType={equipmentType}
              setEquipmentType={setEquipmentType}
              workoutType={workoutType}
              setWorkoutType={setWorkoutType}
              sportType={sportType}
              setSportType={setSportType}
              material={material}
              setMaterial={setMaterial}
              size={size}
              setSize={setSize}
              weightCapacity={weightCapacity}
              setWeightCapacity={setWeightCapacity}
              skillLevel={skillLevel}
              setSkillLevel={setSkillLevel}
              targetArea={targetArea}
              setTargetArea={setTargetArea}
              accessories={accessories}
              setAccessories={setAccessories}
              wellnessType={wellnessType}
              setWellnessType={setWellnessType}
              usageArea={usageArea}
              setUsageArea={setUsageArea}
              wellnessBenefits={wellnessBenefits}
              setWellnessBenefits={setWellnessBenefits}
              powerSource={powerSource}
              setPowerSource={setPowerSource}
              batteryCapacity={batteryCapacity}
              setBatteryCapacity={setBatteryCapacity}
              heatFunction={heatFunction}
              setHeatFunction={setHeatFunction}
              massageType={massageType}
              setMassageType={setMassageType}
              scent={scent}
              setScent={setScent}
              volumeSize={volumeSize}
              setVolumeSize={setVolumeSize}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          )}
  
          {/* =========================
              VISIBILITY
          ========================= */}
  
          <div className="form-section visibility-section">
  
            <h3>Visibility</h3>
  
            <div className="checkbox-group">
  
              <label className="visibility-option">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) =>
                    setFeatured(e.target.checked)
                  }
                />
                <span>Featured</span>
              </label>
  
              <label className="visibility-option">
                <input
                  type="checkbox"
                  checked={trending}
                  onChange={(e) =>
                    setTrending(e.target.checked)
                  }
                />
                <span>Trending</span>
              </label>
  
              <label className="visibility-option">
                <input
                  type="checkbox"
                  checked={spotlight}
                  onChange={(e) =>
                    setSpotlight(e.target.checked)
                  }
                />
                <span>Spotlight</span>
              </label>
  
            </div>
  
          </div>
  
          {/* =========================
              SAVE / ADD ACTIONS
          ========================= */}
  
          <div className="product-actions">
  
            <button
              type="button"
              className="add-product-btn"
              onClick={() => {
                if (editingId) {
                  updateProduct();
                } else {
                  addProduct();
                }
              }}
            >
              {editingId
                ? "Save Product"
                : "Add Product"}
            </button>
  
            {editingId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={() => {
                  setEditingId(null);
                  setFacebookPublished(false);
                  setFacebookPublishError("");
                }}
              >
                Cancel Edit
              </button>
            )}
  
          </div>
  
          {/* =========================
              PROMOTION
          ========================= */}
  
          {editingId && (
            <div className="form-section promotion-section">
  
              <h3>Promotion</h3>
  
              <div className="promotion-buttons">
  
                <button
                  type="button"
                  className="facebook-publish-btn"
                  onClick={publishToFacebook}
                  disabled={facebookPublishing}
                >
                  {facebookPublishing
                    ? "Publishing..."
                    : "📘 Facebook"}
                </button>
  
                <button
                  type="button"
                  className="instagram-publish-btn"
                  onClick={() => {
                    alert(
                      "Instagram promotion will be connected next."
                    );
                  }}
                >
                  📸 Instagram
                </button>
  
                <button
                  type="button"
                  className="facebook-reel-btn"
                  onClick={() => {
                    alert(
                      "Facebook Reel promotion will be connected next."
                    );
                  }}
                >
                  🎬 Facebook Reel
                </button>
  
              </div>
  
              {facebookPublished && (
                <div className="facebook-success-message">
                  ✓ Published to Facebook successfully
                </div>
              )}
  
              {facebookPublishError && (
                <div className="facebook-error-message">
                  {facebookPublishError}
                </div>
              )}
  
            </div>
          )}
  
        </div>
  
        {/* =========================
            FIND PRODUCT
        ========================= */}
  
        <div className="manage-products-section">
  
          <div className="manage-products-header">
  
            <div>
  
              <h3>Find Product</h3>
  
              <p>
                Search by Product ID or Product Title.
              </p>
  
            </div>
  
          </div>
  
          <div className="product-search-box">
  
            <input
              type="text"
              placeholder="Find Product by ID or Product Title..."
              value={productSearch}
              onChange={(e) =>
                setProductSearch(e.target.value)
              }
            />
  
            {productSearch && (
              <button
                type="button"
                className="clear-product-search"
                onClick={() =>
                  setProductSearch("")
                }
              >
                Clear
              </button>
            )}
  
          </div>
  
        </div>
  
      </form>
    </div>
  );
  }