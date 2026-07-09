import "./WhyChoose.css";

const features = [
{
icon:"🛍️",
title:"All Products in One Place",
text:"Discover fashion, home, and beauty products from trusted marketplaces in one simple view."
},
{
icon:"⚡",
title:"Fast Discovery",
text:"Find trending and useful products without searching across many websites."
},
{
icon:"🔗",
title:"Trusted Marketplace Links",
text:"We connect you with trusted external stores through carefully selected affiliate products."
},
{
icon:"💡",
title:"Smart Selection",
text:"Explore relevant, useful, and trending products chosen for everyday lifestyles."
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