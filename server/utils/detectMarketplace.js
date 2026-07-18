function detectMarketplace(url) {

    const lower = url.toLowerCase();

    if (lower.includes("aliexpress"))
        return "AliExpress";

    if (lower.includes("amazon"))
        return "Amazon";

    if (lower.includes("temu"))
        return "Temu";

    if (lower.includes("walmart"))
        return "Walmart";

    if (lower.includes("ebay"))
        return "eBay";

    return "Unknown";
}

module.exports = detectMarketplace;