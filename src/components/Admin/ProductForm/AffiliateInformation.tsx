export default function AffiliateInformation({

    affiliateUrl,
    setAffiliateUrl,

    sourceUrl,
    setSourceUrl,

    shopName,
    setShopName,

    marketplace,
    setMarketplace

}: any) {

return (

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


<input
    placeholder="Product Source URL (for monitoring)"
    value={sourceUrl}
    onChange={(e)=>setSourceUrl(e.target.value)}
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

)

}