import "./WhyChoose.css";

const features = [
    {
    icon:"🛍️",
    title:"Curated Product Selection",
    text:"We research and select useful lifestyle products to help you discover items worth considering."
    },
    {
    icon:"⚡",
    title:"Easy Product Discovery",
    text:"Explore trending fashion, beauty, wellness, home, and gift ideas without endless searching."
    },
    {
    icon:"🔗",
    title:"Trusted Shopping Partners",
    text:"We connect shoppers with trusted retailers through carefully selected affiliate links."
    },
    {
    icon:"💡",
    title:"Helpful Recommendations",
    text:"Discover products, trends, and ideas chosen to make everyday shopping easier."
    }
    ];

export default function WhyChoose(){

return(

<section className="why-choose">

<h2>
Why Choose Idealoop?
</h2>

<p className="why-description">
Simple product discovery across fashion, home, and beauty categories.
</p>


<div className="feature-grid">

{
features.map((item,index)=>(

<div
className="feature-card"
key={index}
>

<div className="icon">
{item.icon}
</div>

<h3>
{item.title}
</h3>

<p>
{item.text}
</p>

</div>

))
}

</div>

</section>

);

}