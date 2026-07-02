export interface Country {
    name: string;
    code: string;
    flag: string;
    region: "Asia" | "Europe" | "North America" | "Other";
  }
  
  export const countries: Country[] = [
    // 🌏 Asia
    { name: "Sri Lanka", flag: "🇱🇰", region: "Asia" },
    { name: "India", code: "IN", flag: "🇮🇳", region: "Asia" },
    { name: "Pakistan", code: "PK", flag: "🇵🇰", region: "Asia" },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩", region: "Asia" },
    { name: "Nepal", code: "NP", flag: "🇳🇵", region: "Asia" },
  
    // 🌏 East Asia
    { name: "China", code: "CN", flag: "🇨🇳", region: "Asia" },
    { name: "Japan", code: "JP", flag: "🇯🇵", region: "Asia" },
    { name: "South Korea", code: "KR", flag: "🇰🇷", region: "Asia" },
  
    // 🌍 Europe
    { name: "United Kingdom", code: "GB", flag: "🇬🇧", region: "Europe" },
    { name: "Germany", code: "DE", flag: "🇩🇪", region: "Europe" },
    { name: "France", code: "FR", flag: "🇫🇷", region: "Europe" },
    { name: "Italy", code: "IT", flag: "🇮🇹", region: "Europe" },
    { name: "Spain", code: "ES", flag: "🇪🇸", region: "Europe" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱", region: "Europe" },
  
    // 🌎 North America
    { name: "United States", code: "US", flag: "🇺🇸", region: "North America" },
    { name: "Canada", code: "CA", flag: "🇨🇦", region: "North America" },
  
    // 🌍 Other
    { name: "Australia", code: "AU", flag: "🇦🇺", region: "Other" },
    { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", region: "Other" }
  ];