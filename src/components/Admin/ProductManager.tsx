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


export default function ProductManager() {


const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [shortDescription,setShortDescription] = useState("");
const [shopName,setShopName] = useState("");
const [brand,setBrand] = useState("");
const [productUrl,setProductUrl] = useState("");

const [showPreview, setShowPreview] = useState(false);
const [spotlight, setSpotlight] = useState(false);
const [products, setProducts] = useState<any[]>([]);

const [image1,setImage1] = useState("");
const [image2,setImage2] = useState("");
const [image3,setImage3] = useState("");
const [image4,setImage4] = useState("");
const [image5,setImage5] = useState("");

const [affiliateUrl,setAffiliateUrl] = useState("");
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
const [material,setMaterial] = useState("");
const [fit,setFit] = useState("");

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

const [equipmentType,setEquipmentType] = useState("");
const [workoutType,setWorkoutType] = useState("");
const [sportType,setSportType] = useState("");
const [size,setSize] = useState("");
const [weightCapacity,setWeightCapacity] = useState("");
const [skillLevel,setSkillLevel] = useState("");
const [targetArea,setTargetArea] = useState("");
const [accessories,setAccessories] = useState("");

const [model,setModel] = useState("");
const [warranty,setWarranty] = useState("");
const [countryOrigin,setCountryOrigin] = useState("");
const [packageIncludes,setPackageIncludes] = useState("");


const [wellnessType,setWellnessType] = useState("");
const [usageArea,setUsageArea] = useState("");
const [wellnessBenefits,setWellnessBenefits] = useState("");
const [powerSource,setPowerSource] = useState("");
const [batteryCapacity,setBatteryCapacity] = useState("");
const [heatFunction,setHeatFunction] = useState("");
const [massageType,setMassageType] = useState("");



/* LOAD PRODUCTS */

useEffect(()=>{

        fetchProducts();
        
        },[]);
        
        
        const fetchProducts = async()=>{
        
        const {data,error}=await supabase
        .from("products")
        .select("*")
        .order("created_at",{ascending:false});
        
        
        if(error){
        
        console.log(error);
        
        return;
        
        }
        
        
        setProducts(data || []);
        
        };

        useEffect(() => {

                if (department) {
                  generateProductId();
                  
                }
              
              }, [department]);

const loadProduct = async()=>{

        if(!productUrl){
        
        alert("Please paste product URL");
        
        return;
        
        }
        
        
        console.log("Loading product:", productUrl);
        
        
        };

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

const addProduct = async()=>{


const {error}=await supabase
.from("products")
.insert([

{


product_id:productId,
title,
brand: brand,
model,
warranty,
country_origin: countryOrigin,
package_includes: packageIncludes,
description,
short_description:shortDescription,
image_1:image1,
image_2:image2,
image_3:image3,
image_4:image4,
image_5:image5,
affiliate_url:affiliateUrl,
shop_name: shopName,

marketplace,
featured,
trending,
spotlight,

department,
category,
subcategory,
collection,

season,
style,
occasion,
material,
fit,
gender,

hair_type: hairType,
skin_type: skinType,
ingredients,
volume_size: volumeSize,
scent,
benefits,
suitable_for: suitableFor,


age_range: ageRange,
educational_features: educationalFeatures,
dimensions,
color,
room_type: roomType,
weight,

equipment_type: equipmentType,
workout_type: workoutType,
sport_type: sportType,
size,
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
if(error){

  console.log("SUPABASE ERROR:", error.message);

return;

}



setProductId("");
setTitle("");
setDescription("");
setShortDescription("");

setBrand("");
setModel("");
setWarranty("");
setCountryOrigin("");
setPackageIncludes("");
setEquipmentType("");
setWorkoutType("");
setSportType("");
setSize("");
setWeightCapacity("");
setSkillLevel("");
setTargetArea("");
setAccessories("");

setImage1("");
setImage2("");
setImage3("");
setImage4("");
setImage5("");

setAffiliateUrl("");

setMarketplace("");
setDepartment("");
setCategory("");
setSubcategory("");
setSeason("");
setStyle("");
setOccasion("");
setFeatured(false);
setTrending(false);
setSpotlight(false);

fetchProducts();

};

    return (

                <div className="product-manager">
                
                <div>
                <h3>
                Products Loaded: {products.length}
                </h3>
                </div>
                
                <form 
                className="product-form" 
                onSubmit={(e)=>e.preventDefault()}
                >
                
                
                {/* PRODUCT IMPORT */}
                
                <div className="form-section product-import-section">
                
                <h3>
                Import Product
                </h3>
                
                
                <div className="import-box">
                
                <input
                className="product-url-input"
                placeholder="Paste Product URL"
                value={productUrl}
                onChange={(e)=>setProductUrl(e.target.value)}
                />
                
                
                <button
                type="button"
                className="load-product-btn"
                onClick={loadProduct}
                >
                Load Product
                </button>
                
                
                </div>
                
                </div>
                
                
                
                {/* PRODUCT INFORMATION */}
                
                <div className="form-section">
                
                <h3>
                Product Information
                </h3>
                
                
                <div className="input-grid">
                
                
                <input
  placeholder="Product ID"
  value={productId}
  readOnly
/>
                
                
                
                <input
                placeholder="Product Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                
                
                
                <input
                placeholder="Brand"
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
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
                
                />  

<textarea

placeholder="Short Description"

value={shortDescription}

onChange={(e)=>setShortDescription(e.target.value)}

 />



<textarea

placeholder="Product Highlights / Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

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

/>      
        {/* CATEGORY DETAILS */}

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

/>

)}

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

/>

)}
        

        {/* SETTINGS */}
        
        <div className="form-section">
        
        <h3>
        Visibility
        </h3>
        
        
        <div className="checkbox-group">
        
        
        <label>
        
        <input
        
        type="checkbox"
        
        checked={featured}
        
        onChange={(e)=>setFeatured(e.target.checked)}
        
         />
        
        Featured
        
        </label>
        
        
        
        <label>
        
        <input
        
        type="checkbox"
        
        checked={trending}
        
        onChange={(e)=>setTrending(e.target.checked)}
        
         />
        
        Trending
        
        </label>
        
        
        
        <label>
        
        <input
        
        type="checkbox"
        
        checked={spotlight}
        
        onChange={(e)=>setSpotlight(e.target.checked)}
        
         />
        
        Spotlight
        
        </label>
        
        
        
        </div>
        
        
        </div>
        
        <div className="product-actions">

<button
  type="button"
  className="preview-btn"
  onClick={() => setShowPreview(true)}
>
  Preview Product
</button>

<button
  type="button"
  className="add-product-btn"
  onClick={addProduct}
>
  Add Product
</button>

<div>

<h3>
Products Loaded: {products.length}
</h3>

</div>

</div>


{showPreview && (
<div className="product-preview">
  <div className="preview-card">

    <img
      src={image1 || "/placeholder.png"}
      alt={title}
    />

    <h3>{title || "Product Title"}</h3>

    <p>{shortDescription || "Short description"}</p>

    <div className="preview-category">
      {department || "Department"} / {category || "Category"} / {subcategory || "Subcategory"}
    </div>

    <div className="preview-actions">
      <a
        href={`/product/${productId}`}
        className="view-more-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View More
      </a>

      <a
        href={affiliateUrl || "#"}
        className="shop-now-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shop Now
      </a>
    </div>

  </div>
</div>
)}
</div>

</form>

</div>

);

}