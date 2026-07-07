import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { categories } from "../../data/categories";
import SearchBar from "../Search/SearchBar";
import "./CategoryNavbar.css";


export default function CategoryNavbar() {

const navigate = useNavigate();


const [activeCategory, setActiveCategory] = useState<any | null>(null);

const [activeChild, setActiveChild] = useState<any | null>(null);



return (

<div

className="category-navbar"

onMouseLeave={() => {

setActiveCategory(null);

setActiveChild(null);

}}

>



  {/* LEFT CATEGORY MENU */}

  <div className="category-menu">


    {categories.map((category) => (

      <div

        key={category.slug}

        className="nav-item"

        onMouseEnter={() => {

          setActiveCategory(category);

          setActiveChild(category.children[0]);

        }}

      >

        {category.name}

      </div>


    ))}




    {/* CONTACT US */}

    <Link

      to="/contact"

      className="nav-item static-link"

    >

      Contact Us

    </Link>




    {/* HELP */}

    <Link

      to="/help"

      className="nav-item static-link"

    >

      Help

    </Link>



  </div>





  {/* RIGHT SEARCH */}

  <div className="category-search">

    <SearchBar />

  </div>







  {/* NIKE STYLE DROPDOWN */}

  {activeCategory && (

    <div className="dropdown">


      {/* FIRST COLUMN */}

      <div className="dropdown-column main-column">


        {activeCategory.children.map((child:any)=>(

          <div

            key={child.slug}

            className={`dropdown-item ${
              activeChild?.slug === child.slug
              ?
              "active"
              :
              ""
            }`}

            onMouseEnter={() => setActiveChild(child)}

          >

            {child.name}


          </div>


        ))}



      </div>







      {/* SECOND COLUMN */}

      {activeChild && (

        <div className="dropdown-column">


          {activeChild.children.map((item:any)=>(

            <div

              key={item.slug}

              className="group-item"

              onClick={() =>

                navigate(

                  `/category/${activeCategory.slug}/${activeChild.slug}/${item.slug}`

                )

              }

            >

              {item.name}


            </div>


          ))}



        </div>


      )}




    </div>


  )}



</div>


);


}