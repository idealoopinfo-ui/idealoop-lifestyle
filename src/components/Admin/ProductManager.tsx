import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { categories } from "../../data/categories";
import "./ProductManager.css";


export default function ProductManager() {


const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [shortDescription,setShortDescription] = useState("");
const [shopName,setShopName] = useState("");
const [brand,setBrand] = useState("");
const [showPreview, setShowPreview] = useState(false);
const [spotlight, setSpotlight] = useState(false);

const [targetType, setTargetType] = useState("global");
const [targetCountries, setTargetCountries] = useState<string[]>([]);
const [primaryMarket, setPrimaryMarket] = useState("");
const [currency, setCurrency] = useState("");

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



/* LOAD PRODUCTS */

useEffect(()=>{

fetchProducts();

},[]);

const fetchProducts = async()=>{

const {error}=await supabase
.from("products")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.log(error);

return;

}
};

/* =========================
CATEGORY DROPDOWN DATA
========================= */
const selectedMainCategory = categories.find(
(item:any)=>item.slug === department
);

const selectedCategory = selectedMainCategory?.children?.find(
(item:any)=>item.slug === category
);

const departmentList = categories;
const subcategoryList = selectedCategory?.children || [];

const countryList = [
        "USA",
        "Canada",
        "UK",
        "Australia",
        "Germany",
        "France",
        "Global"
        ];

/* RESET CHILDREN */

useEffect(()=>{

setCategory("");
setSubcategory("");

},[department]);
useEffect(()=>{

setSubcategory("");

},[category]);

        
/* ADD PRODUCT */

const addProduct = async()=>{


const {error}=await supabase
.from("products")
.insert([

{


product_id:productId,
title,
brand: brand,
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

target_type: targetType,
target_countries: targetCountries,
primary_market: primaryMarket,
currency,

department,
category,
subcategory,

season,
style,
occasion,
material,
fit,

hair_type: hairType,
skin_type: skinType,
ingredients,
volume_size: volumeSize,
scent,
benefits,
suitable_for: suitableFor,

dimensions,
color,
room_type: roomType,
weight,

age_range: ageRange,
educational_features: educationalFeatures,


}

]);
if(error){

console.log(error);

return;

}



setProductId("");
setTitle("");
setDescription("");
setShortDescription("");

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

setTargetType("global");
setTargetCountries([]);
setPrimaryMarket("");
setCurrency("");

fetchProducts();

};

    return (

        <div className="product-manager">
        
        
        <form className="product-form" onSubmit={(e)=>e.preventDefault()}>

        {/* PRODUCT IMPORT */}

{/* PRODUCT IMPORT */}

<div className="form-section">

<h3>Product Import</h3>

<input
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


{detectedMarketplace && (

<p>
Detected: {detectedMarketplace}
</p>

)}



</div>

{/* TARGET MARKET */}

<div className="form-section">

<h3>
Target Market
</h3>


<div className="input-grid">


<select

value={targetType}

onChange={(e)=>setTargetType(e.target.value)}

>

<option value="global">
Global
</option>

<option value="selected_countries">
Selected Countries
</option>

<option value="specific_country">
Specific Country
</option>


</select>



<select

value={primaryMarket}

onChange={(e)=>{

setPrimaryMarket(e.target.value);


if(e.target.value==="USA"){
setCurrency("USD");
}

else if(e.target.value==="UK"){
setCurrency("GBP");
}

else if(e.target.value==="Australia"){
setCurrency("AUD");
}

else{
setCurrency("EUR");
}


}}

>

<option value="">
Primary Country
</option>


{
countryList.map(country=>(

<option
key={country}
value={country}
>

{country}

</option>

))

}


</select>



<input

placeholder="Currency"

value={currency}

readOnly

/>


</div>


{
targetType==="selected_countries" && (

<div className="country-checkbox">


{
countryList
.filter(c=>c!=="Global")
.map(country=>(


<label key={country}>


<input

type="checkbox"

checked={
targetCountries.includes(country)
}

onChange={(e)=>{


if(e.target.checked){

setTargetCountries([
...targetCountries,
country
]);

}

else{

setTargetCountries(
targetCountries.filter(
(item)=>item!==country
)
);

}


}}

/>


{country}


</label>


))


}


</div>

)


}


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
        onChange={(e)=>setProductId(e.target.value)}
        />
        
        
        
        <input
        placeholder="Product Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

<div className="brand-group">

<input
placeholder="Brand"
value={brand}
onChange={(e)=>setBrand(e.target.value)}
/>

</div>

{department === "fashion" && (
        <div className="form-section category-details">

<h3>Fashion Details</h3>

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
)}


{department === "beauty" && (
<div className="form-section">

<h3>Beauty Details</h3>

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
)}


{department === "home-living" && (
<div className="form-section">

<h3>Home & Living Details</h3>

<input
placeholder="Material"
value={material}
onChange={(e)=>setMaterial(e.target.value)}
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
)}


{department === "toys-gifts" && (
<div className="form-section">

<h3>Toys & Gifts Details</h3>

<input
placeholder="Age Range"
value={ageRange}
onChange={(e)=>setAgeRange(e.target.value)}
/>

<input
placeholder="Material"
value={material}
onChange={(e)=>setMaterial(e.target.value)}
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
)}
        
        </div>
        
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
        
        </div>
        
        
        
        
        
        {/* IMAGES */}
        
        <div className="form-section">
        
        <h3>
        Product Images
        </h3>
        
        
        <div className="input-grid">
        
        
        <input
        placeholder="Image 1 URL"
        value={image1}
        onChange={(e)=>setImage1(e.target.value)}
        />
        
        
        <input
        placeholder="Image 2 URL"
        value={image2}
        onChange={(e)=>setImage2(e.target.value)}
        />
        
        
        <input
        placeholder="Image 3 URL"
        value={image3}
        onChange={(e)=>setImage3(e.target.value)}
        />
        
        
        <input
        placeholder="Image 4 URL"
        value={image4}
        onChange={(e)=>setImage4(e.target.value)}
        />

<input
placeholder="Image 5 URL"
value={image5}
onChange={(e)=>setImage5(e.target.value)}
/>
        
        
        
        </div>
        
        </div>
        
        
        {/* AFFILIATE */}
        
        <div className="form-section">
        
        <h3>
        Affiliate Information
        </h3>
        
        
        <div className="input-grid">
        
        
        <input
        placeholder="Affiliate URL"
        value={affiliateUrl}
        onChange={(e)=>setAffiliateUrl(e.target.value)}
        />

<select

value={shopName}

onChange={(e)=>setShopName(e.target.value)}

>

<option value="">
Select Marketplace
</option>

<option value="Amazon">
Amazon
</option>

<option value="Temu">
Temu
</option>

<option value="AliExpress">
AliExpress
</option>

<option value="Other">
Other
</option>

</select>
        
        
        <input
        placeholder="Marketplace"
        value={marketplace}
        onChange={(e)=>setMarketplace(e.target.value)}
        />
        
        
        </div>
        
        
        </div>
        
        
        
        
        
        
        {/* CATEGORY */}
        
        <div className="form-section">
        
        <h3>
        Category
        </h3>
        
        
        <div className="input-grid">
        
        
        
        <select
        
        value={department}
        
        onChange={(e)=>setDepartment(e.target.value)}
        
        >
        
        <option value="">
        Select Department
        </option>
        
        
        {
        departmentList.map((item:any)=>(
        
        <option
        
        key={item.slug}
        
        value={item.slug}
        
        >
        
        {item.name}
        
        </option>
        
        ))
        
        }
        
        
        </select>
        
        
        
        
        
        <select

value={category}

onChange={(e)=>setCategory(e.target.value)}

disabled={!department}

>

<option value="">
Select Category
</option>


{
selectedMainCategory?.children?.map((cat:any)=>(

<option

key={cat.slug}

value={cat.slug}

>

{cat.name}

</option>

))

}


</select>
        
        
        
        
        <select
        
        value={subcategory}
        
        disabled={!category}
        
        onChange={(e)=>setSubcategory(e.target.value)}
        
        >
        
        <option value="">
        Select Subcategory
        </option>
        
        
        {
        subcategoryList.map((item:any)=>(
        
        <option
        
        key={item.slug}
        
        value={item.slug}
        
        >
        
        {item.name}
        
        </option>
        
        ))
        
        }
        
        
        </select>
        
        
        
        </div>
        
        
        </div>
        
        
        
        
        
        
        
        
        {/* PRODUCT DETAILS */}
        
        <div className="form-section">
        
        <h3>
        Product Details
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
        
        placeholder="Season"
        
        value={season}
        
        onChange={(e)=>setSeason(e.target.value)}
        
         />
        
        
        <input
        
        placeholder="Occasion"
        
        value={occasion}
        
        onChange={(e)=>setOccasion(e.target.value)}
        
         />
        
        
        </div>
        
        
        </div>
        
        
        
        
        
        
        
        
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
onClick={()=>setShowPreview(true)}
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

{showPreview && (

<div className="product-preview">

<div className="preview-card">

<img
src={image1 || "/placeholder.png"}
alt={title}
/>

<h3>
{title || "Product Title"}
</h3>

<p>
{shortDescription || "Short description"}
</p>

<div className="preview-category">

{department || "Department"} /
{category || "Category"} /
{subcategory || "Subcategory"}

</div>


<div className="preview-actions">

<a
href={`/product/${productId}`}
className="view-more-link"
target="_blank"
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


{showPreview && (

<div className="product-preview">

<div className="preview-card">


<img

src={image1 || "/placeholder.png"}

alt={title}

/>


<h3>
{title || "Product Title"}
</h3>


<p>
{shortDescription}
</p>


<p>

{department} /

{category} /

{subcategory}

</p>



<div className="preview-actions">


<a

href={`/product/${productId}`}

target="_blank"

className="view-more-link"

>

View More

</a>



<a

href={affiliateUrl || "#"}

target="_blank"

rel="noopener noreferrer"

className="shop-now-btn"

>

Shop Now

</a>


</div>


</div>

</div>

)}
</form>

</div>

);

}