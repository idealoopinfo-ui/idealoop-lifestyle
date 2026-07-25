import { getCategories } from "../../../utils/categoryHelper";

interface Props {

department:string;
setDepartment:(value:string)=>void;

category:string;
setCategory:(value:string)=>void;

subcategory:string;
setSubcategory:(value:string)=>void;

collection: string;
setCollection: React.Dispatch<React.SetStateAction<string>>;

productType:string;
setProductType:(value:string)=>void;

}


export default function CategorySelector({

        department,
        setDepartment,
        
        category,
        setCategory,
        
        subcategory,
        setSubcategory,
        
        collection,
        setCollection,
        
        productType,
        setProductType
        
        }:Props){
    const categories = getCategories();


const selectedDepartment = categories.find(
(item:any)=>item.slug === department
);


const selectedCategory = selectedDepartment?.children?.find(
(item:any)=>item.slug === category
);

const selectedSubcategory = selectedCategory?.children?.find(
(item:any)=>item.slug === subcategory
);

const selectedCollection = selectedSubcategory?.children?.find(
(item:any)=>item.slug === collection
);

console.log("Selected Subcategory:", selectedSubcategory);
console.log("Children:", selectedSubcategory?.children)

return (

<div className="form-section">

<h3>
Category
</h3>


<div className="input-grid">


<select

value={department}

onChange={(e)=>{

    setDepartment(e.target.value);
    setCategory("");
    setSubcategory("");
    setCollection("");
    setProductType("");
    
    }}

>

<option value="">
Select Department
</option>


{
categories.map((item:any)=>(

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

disabled={!department}

onChange={(e)=>{

    setCategory(e.target.value);
    setSubcategory("");
    setCollection("");
    setProductType("");
    }}

>

<option value="">
Select Category
</option>


{
selectedDepartment?.children?.map((item:any)=>(

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

value={subcategory}

disabled={!category}

onChange={(e)=>{

    setSubcategory(e.target.value);
    setCollection("");
    setProductType("");
    }}
>

<option value="">
Select Subcategory
</option>


{
selectedCategory?.children?.map((item:any)=>(

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

value={collection}

disabled={!subcategory}

onChange={(e)=>{
    setCollection(e.target.value);
    setProductType("");
    }}

>

<option value="">
Select Collection
</option>

{
selectedSubcategory?.children?.map((item:any)=>(

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

value={productType}

disabled={!collection}

onChange={(e)=>setProductType(e.target.value)}

>

<option value="">
Select Product Type
</option>

{
selectedCollection?.children?.map((item:any)=>(

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

)

}