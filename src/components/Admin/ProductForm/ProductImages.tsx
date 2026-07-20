export default function ProductImages({

    image1,
    setImage1,
    
    image2,
    setImage2,
    
    image3,
    setImage3,
    
    image4,
    setImage4,
    
    image5,
    setImage5
    
    }:any){
    
    return (
    
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
    
    )
    
    }