import { getCategories } from "../../../utils/categoryHelper";

interface Props {

department:string;
setDepartment:(value:string)=>void;

category:string;
setCategory:(value:string)=>void;

subcategory:string;
setSubcategory:(value:string)=>void;

}


export default function CategorySelector({

        department,
        setDepartment,
        
        category,
        setCategory,
        
        subcategory,
        setSubcategory,
        
        collection,
        setCollection
        
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

onChange={(e)=>setCollection(e.target.value)}

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

</div>

</div>

)

}