import { useState } from "react";
import { supabase } from "../../lib/supabase";
import "./CategoryManager.css";


export default function CategoryManager(){

const [department,setDepartment] = useState("");
const [message,setMessage] = useState("");
const [error,setError] = useState("");
const [collection,setCollection] = useState("");

const [category,setCategory] = useState("");
const [subcategory,setSubcategory] = useState("");

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
        
        subcategory_id:1
        
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
            
            department_id:1
            
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
                
                category_id:1
                
                });
                
                
                if(error){
                
                setError(error.message);
                
                return;
                
                }
                
                
                setMessage("Subcategory added successfully");
                
                setSubcategory("");
                
                };

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
            
            
                <input
            
                  placeholder="Category Name"
            
                  value={category}
            
                  onChange={(e)=>
                    setCategory(e.target.value)
                  }
            
                />
            
            
                <button
                  onClick={addCategory}
                >
            
                  Add Category
            
                </button>
            
            
              </div>
            
            
            
            
            
              {/* ADD SUBCATEGORY */}
            
              <div className="category-card">
            
                <h3>
                  Add New Subcategory
                </h3>
            
            
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
            
            
                <input
            
                  placeholder="Collection Name"
            
                  value={collection}
            
                  onChange={(e)=>
                    setCollection(e.target.value)
                  }
            
                />
            
            
                <button
                  onClick={addCollection}
                >
            
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