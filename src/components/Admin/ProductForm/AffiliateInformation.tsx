export default function AffiliateInformation({

    affiliateUrl,
    setAffiliateUrl,

    sourceUrl,
    setSourceUrl,

    shopName,
    setShopName,

    marketplace,
    setMarketplace,

    marketplaceProductId,
    setMarketplaceProductId,

    duplicateMessage

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


<div className="marketplace-product-id-field">

<input
    placeholder="Marketplace Product ID"
    value={marketplaceProductId}
    onChange={(e)=>setMarketplaceProductId(e.target.value)}
/>

{duplicateMessage && (
    <div className="duplicate-product-message">
        {duplicateMessage}
    </div>
)}

</div>


</div>

</div>

)

}