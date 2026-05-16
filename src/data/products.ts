import ladiesTshirt from "@/assets/ladies-tshirt.jpg";
import ladiesHoodie from "@/assets/ladies-hoodie.jpg";
import ladiesDress from "@/assets/ladies-dress.jpg";
import mensPolo from "@/assets/mens-polo.jpg";
import mensSweatshirt from "@/assets/mens-sweatshirt.jpg";
import mensJacket from "@/assets/mens-jacket.jpg";
import childrenPajama from "@/assets/children-pajama.jpg";

export type FabricationType = "Knit" | "Woven" | "Leather" | "Sweater" | "Lingerie";

export type Product = {
  id: string;
  name: string;
  category: "ladies" | "mens" | "children";
  subcategory: string;
  fabric: string;
  gsm: string;
  color: string;
  printEffect: string;
  image: string;
  description?: string;
  tags?: string[];
  /** Product type/fabrication tags (Knit, Woven, etc.). Used by the advanced filter. */
  fabrications?: FabricationType[];
};

export const products: Product[] = [
  { id: "L001", name: "Classic Crew Neck T-Shirt", category: "ladies", subcategory: "T-Shirts", fabric: "95% Cotton 5% Elastane S/J", gsm: "160 GSM", color: "White / Multi", printEffect: "HD Print", image: ladiesTshirt, description: "A timeless crew neck tee with a relaxed fit, crafted from soft cotton-elastane blend for all-day comfort.", tags: ["Bestseller", "Stretch"], fabrications: ["Knit"] },
  { id: "L002", name: "Relaxed Tank Top", category: "ladies", subcategory: "Tank Tops", fabric: "100% Cotton S/J", gsm: "140 GSM", color: "Off-White", printEffect: "Discharge Print", image: ladiesTshirt, description: "Lightweight and breezy tank top in pure cotton, perfect for warm-weather layering.", tags: ["Lightweight"], fabrications: ["Knit"] },
  { id: "L003", name: "Oversized Pullover Hoodie", category: "ladies", subcategory: "Hoodies", fabric: "80% Cotton 20% Polyester Fleece", gsm: "300 GSM", color: "Grey Melange", printEffect: "Rubber Print", image: ladiesHoodie, description: "Cozy oversized hoodie in heavyweight fleece with a kangaroo pocket and premium rubber print finish.", tags: ["Fleece", "Oversized"], fabrications: ["Knit", "Sweater"] },
  { id: "L004", name: "Fitted Knit Dress", category: "ladies", subcategory: "Dresses", fabric: "95% Cotton 5% Elastane S/J", gsm: "180 GSM", color: "Taupe", printEffect: "Garment Wash", image: ladiesDress, description: "Elegant fitted dress with a garment-washed finish for a soft, lived-in feel.", tags: ["Stretch", "Elegant"], fabrications: ["Knit"] },
  { id: "L005", name: "Nightdress with Lace Trim", category: "ladies", subcategory: "Nightdresses", fabric: "100% Cotton S/J", gsm: "160 GSM", color: "Soft Pink", printEffect: "AOP (All Over Print)", image: ladiesDress, description: "Delicate cotton nightdress featuring all-over print and feminine lace trim detail.", tags: ["Sleepwear", "AOP"], fabrications: ["Knit", "Lingerie"] },
  { id: "L006", name: "Zip-Through Onesie", category: "ladies", subcategory: "Onesies", fabric: "100% Cotton Fleece", gsm: "280 GSM", color: "Heather Grey", printEffect: "Embroidery", image: ladiesHoodie, description: "Full-zip cotton fleece onesie with embroidered details, perfect for lounging at home.", tags: ["Fleece", "Loungewear"], fabrications: ["Knit"] },
  { id: "L007", name: "Wide Leg Lounge Trouser", category: "ladies", subcategory: "Trousers", fabric: "95% Cotton 5% Elastane French Terry", gsm: "240 GSM", color: "Navy / Cream", printEffect: "Puff Print", image: ladiesTshirt, description: "Relaxed wide-leg trousers in French terry with a puff print accent and elasticated waist.", tags: ["French Terry", "Comfort"], fabrications: ["Knit"] },
  { id: "L008", name: "Cropped Graphic T-Shirt", category: "ladies", subcategory: "T-Shirts", fabric: "100% Organic Cotton S/J", gsm: "155 GSM", color: "Coral / Black", printEffect: "Plastisol Print", image: ladiesTshirt, description: "Trendy cropped tee in organic cotton with a bold plastisol graphic print.", tags: ["Organic", "Cropped"], fabrications: ["Knit"] },
  { id: "M001", name: "Classic Polo Shirt", category: "mens", subcategory: "Polo Shirts", fabric: "100% Cotton Pique", gsm: "220 GSM", color: "Navy / White", printEffect: "Embroidery", image: mensPolo, description: "Timeless polo in cotton pique with a ribbed collar and embroidered chest logo.", tags: ["Pique", "Classic"], fabrications: ["Knit"] },
  { id: "M002", name: "Premium Crew Neck Tee", category: "mens", subcategory: "T-Shirts", fabric: "100% Organic Cotton S/J", gsm: "180 GSM", color: "Black / Olive", printEffect: "HD Print", image: mensPolo, description: "Premium-weight organic cotton tee with high-definition print for crisp, detailed graphics.", tags: ["Organic", "Premium"], fabrications: ["Knit"] },
  { id: "M003", name: "Bomber Jacket", category: "mens", subcategory: "Jackets", fabric: "100% Cotton Twill", gsm: "280 GSM", color: "Charcoal", printEffect: "Rubber Print", image: mensJacket, description: "Structured cotton twill bomber with ribbed cuffs and a durable rubber print finish.", tags: ["Outerwear", "Twill"], fabrications: ["Woven"] },
  { id: "M004", name: "Heavyweight Sweatshirt", category: "mens", subcategory: "Sweatshirts", fabric: "80% Cotton 20% Polyester Fleece", gsm: "350 GSM", color: "Grey Melange", printEffect: "Puff Print", image: mensSweatshirt, description: "Ultra-heavyweight 350 GSM fleece sweatshirt with raised puff print detail.", tags: ["Heavyweight", "Fleece"], fabrications: ["Knit", "Sweater"] },
  { id: "M005", name: "Zip-Through Hoodie", category: "mens", subcategory: "Hoodies", fabric: "100% Cotton French Terry", gsm: "300 GSM", color: "Ecru / Navy", printEffect: "Discharge Print", image: mensSweatshirt, description: "Full-zip hoodie in soft French terry with a vintage-inspired discharge print.", tags: ["French Terry", "Zip"], fabrications: ["Knit", "Sweater"] },
  { id: "M006", name: "Jogger Trouser", category: "mens", subcategory: "Trousers", fabric: "95% Cotton 5% Elastane French Terry", gsm: "260 GSM", color: "Black", printEffect: "Plastisol Print", image: mensJacket, description: "Tapered joggers in stretch French terry with cuffed ankles and plastisol branding.", tags: ["Stretch", "Jogger"], fabrications: ["Knit"] },
  { id: "M007", name: "Casual Chino Shorts", category: "mens", subcategory: "Shorts", fabric: "100% Cotton Twill", gsm: "200 GSM", color: "Khaki / Stone", printEffect: "Garment Dye", image: mensPolo, description: "Relaxed-fit chino shorts in garment-dyed cotton twill for a soft, broken-in feel.", tags: ["Garment Dye", "Casual"], fabrications: ["Woven"] },
  { id: "C001", name: "Animal Print Pajama Set", category: "children", subcategory: "Pajamas", fabric: "100% Cotton S/J", gsm: "160 GSM", color: "Multi / Cream", printEffect: "AOP (All Over Print)", image: childrenPajama, description: "Fun all-over animal print pajama set in soft cotton for cozy bedtime comfort.", tags: ["AOP", "Kids"], fabrications: ["Knit"] },
  { id: "C002", name: "Fun Graphic Outfit Set", category: "children", subcategory: "Outfits", fabric: "100% Organic Cotton S/J", gsm: "155 GSM", color: "Sky Blue / White", printEffect: "HD Print", image: childrenPajama, description: "Playful matching outfit set with vibrant HD-printed graphics in organic cotton.", tags: ["Organic", "Kids"], fabrications: ["Knit"] },
  { id: "C003", name: "Cozy Fleece Pajama Set", category: "children", subcategory: "Pajamas", fabric: "100% Cotton Fleece", gsm: "240 GSM", color: "Pink / Grey", printEffect: "Embroidery", image: childrenPajama, description: "Warm cotton fleece pajama set with charming embroidered motifs for little ones.", tags: ["Fleece", "Kids"], fabrications: ["Knit", "Sweater"] },
  { id: "C004", name: "Romper with Snap Closure", category: "children", subcategory: "Outfits", fabric: "95% Cotton 5% Elastane Rib", gsm: "180 GSM", color: "Sage Green", printEffect: "Rubber Print", image: childrenPajama, description: "Easy-on ribbed romper with snap closures, ideal for active toddlers.", tags: ["Stretch", "Kids"], fabrications: ["Knit"] },
];

export const categories = [
  { id: "all", label: "All Collections" },
  { id: "ladies", label: "Ladies' Knitwear" },
  { id: "mens", label: "Men's Collection" },
  { id: "children", label: "Children's Products" },
] as const;

export const fabricationTypes: { id: "all" | FabricationType; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "Knit", label: "Knit" },
  { id: "Woven", label: "Woven" },
  { id: "Leather", label: "Leather" },
  { id: "Sweater", label: "Sweater" },
  { id: "Lingerie", label: "Lingerie" },
];
