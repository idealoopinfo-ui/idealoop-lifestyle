import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import "./CategoryManager.css";


export default function CategoryManager(){


const [department,setDepartment] = useState("");
const [message,setMessage] = useState("");
const [error,setError] = useState("");

const [collection,setCollection] = useState("");

const [category,setCategory] = useState("");
const [subcategory,setSubcategory] = useState("");


// Dropdown data
const [departments,setDepartments] = useState<any[]>([]);
const [categories,setCategories] = useState<any[]>([]);
const [subcategories,setSubcategories] = useState<any[]>([]);

// Selected values
const [selectedDepartment,setSelectedDepartment] = useState("");
const [selectedCategory,setSelectedCategory] = useState("");
const [selectedSubcategory,setSelectedSubcategory] = useState("");


const loadDepartments = async()=>{

  console.log("Loading departments...");
  
  
  const {data,error}=await supabase
  .from("departments")
  .select("*")
  .order("name");
  
  
  console.log("Department data:", data);
  console.log("Department error:", error);
  
  
  if(error){
  
  return;
  
  }
  
  
  setDepartments(data || []);
  
  };
const addDepartment = async()=>{

    setMessage("");
    setError("");
    
    
    if(!department.trim()){
    
    setError("Department name required");
    return;
    
    }
    
    
    const slug = department
    .toLowerCase()
    .replace(/\s+/g,"-");
    
    
    const {error} = await supabase
    .from("departments")
    .insert({
    
    name:department,
    slug:slug
    
    });
    
    
    if(error){
    
    setError(error.message);
    return;
    
    }
    
    
    setMessage("Department added successfully");
    
    setDepartment("");
    
    };

    const addCollection = async()=>{

        setMessage("");
        setError("");

        if (!selectedSubcategory) {
          setError("Please select a subcategory.");
          return;
        }
        
        if(!collection.trim()){
        
        setError("Collection name required");
        return;
        
        }
        
        
        const slug = collection
        .toLowerCase()
        .replace(/\s+/g,"-");
        
        
        const {error}=await supabase
        .from("collections")
        .insert({
        
        name:collection,
        
        slug:slug,
        
        subcategory_id: selectedSubcategory
        
        });
        
        
        if(error){
        
        setError(error.message);
        return;
        
        }
        
        
        setMessage("Collection added successfully");
        
        setCollection("");
        
        };

        const addCategory = async()=>{

            setMessage("");
            setError("");
            
            
            if(!category.trim()){
            
            setError("Category name required");
            return;
            
            }
            
            
            const slug = category
            .toLowerCase()
            .replace(/\s+/g,"-");
            
            
            const {error}=await supabase
.from("categories")
.insert({

name:category,

slug:slug,

department_id:selectedDepartment

});
            
            
            if(error){
            
            setError(error.message);
            return;
            
            }
            
            
            setMessage("Category added successfully");
            
            setCategory("");
            
            };

            const addSubcategory = async()=>{

                setMessage("");
                setError("");
                
                
                if(!subcategory.trim()){
                
                setError("Subcategory name required");
                return;
                
                }
                
                
                const slug = subcategory
                .toLowerCase()
                .replace(/\s+/g,"-");
                
                
                const {error}=await supabase
                .from("subcategories")
                .insert({
                
                name:subcategory,
                
                slug:slug,
                
                category_id:selectedCategory
                
                });
                
                
                if(error){
                
                setError(error.message);
                
                return;
                
                }
                
                
                setMessage("Subcategory added successfully");
                
                setSubcategory("");
                
                };

                const loadCategories = async()=>{

                  const {data,error}=await supabase
                  .from("categories")
                  .select("*")
                  .order("name");
                  
                  
                  if(error){
                  
                  console.log("Category Load Error:",error);
                  return;
                  
                  }
                  
                  
                  setCategories(data || []);
                  
                  };

                  const loadSubcategories = async () => {

                    const { data, error } = await supabase
                      .from("subcategories")
                      .select("*")
                      .order("name");
                  
                    if (error) {
                      console.log("Subcategory Load Error:", error);
                      return;
                    }
                  
                    setSubcategories(data || []);
                  
                  };

                  useEffect(()=>{

                    console.log("Category Manager Loaded");
                    
                    loadDepartments();
                    loadCategories();
                    loadSubcategories();
                    
                    },[]);
        return (

            <div className="category-manager">
            
            
              <h1>
                Category Management
              </h1>
            
            
            
              {/* ADD DEPARTMENT */}
            
              <div className="category-card">
            
                <h3>
                  Add New Department
                </h3>
            
            
                <input
            
                  placeholder="Department Name"
            
                  value={department}
            
                  onChange={(e)=>
                    setDepartment(e.target.value)
                  }
            
                />
            
            
                <button
                  onClick={addDepartment}
                >
            
                  Add Department
            
                </button>
            
            
              </div>
            
            
            
            
            
             {/* ADD CATEGORY */}

<div className="category-card">

<h3>
  Add New Category
</h3>

<select
  value={selectedDepartment}
  onChange={(e)=>setSelectedDepartment(e.target.value)}
>

  <option value="">
    Select Department
  </option>

  {
    departments.map((item)=>(
      <option
        key={item.id}
        value={item.id}
      >
        {item.name}
      </option>
    ))
  }

</select>

<input
  placeholder="Category Name"
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
/>

<button onClick={addCategory}>
  Add Category
</button>

</div>
            
              {/* ADD SUBCATEGORY */}
            
              <div className="category-card">
            
                <h3>
                  Add New Subcategory
                </h3>
            
                <select

value={selectedCategory}

onChange={(e)=>
setSelectedCategory(e.target.value)
}

>

<option value="">
Select Category
</option>


{
categories.map((item)=>(

<option

key={item.id}

value={item.id}

>

{item.name}

</option>

))
}


</select>
            
                <input
            
                  placeholder="Subcategory Name"
            
                  value={subcategory}
            
                  onChange={(e)=>
                    setSubcategory(e.target.value)
                  }
            
                />
            
            
                <button
                  onClick={addSubcategory}
                >
            
                  Add Subcategory
            
                </button>
            
            
              </div>
            
            
            
            
            
              {/* ADD COLLECTION */}

<div className="category-card">

<h3>
  Add New Collection
</h3>

<select
  value={selectedSubcategory}
  onChange={(e) => setSelectedSubcategory(e.target.value)}
>

  <option value="">
    Select Subcategory
  </option>

  {subcategories.map((item) => (
    <option
      key={item.id}
      value={item.id}
    >
      {item.name}
    </option>
  ))}

</select>

<input
  placeholder="Collection Name"
  value={collection}
  onChange={(e) => setCollection(e.target.value)}
/>

<button onClick={addCollection}>
  Add Collection
</button>

</div>
            
            
            
            
              {/* STATUS MESSAGES */}
            
            
              {
                message && (
            
                  <p className="success">
                    {message}
                  </p>
            
                )
              }
            
            
            
              {
                error && (
            
                  <p className="error">
                    {error}
                  </p>
            
                )
              }
            
            
            
            </div>
            
            );
            }