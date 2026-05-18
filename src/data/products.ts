import ladiesTshirt from "@/assets/ladies-tshirt.jpg";
import ladiesHoodie from "@/assets/ladies-hoodie.jpg";
import ladiesDress from "@/assets/ladies-dress.jpg";
import mensPolo from "@/assets/mens-polo.jpg";
import mensSweatshirt from "@/assets/mens-sweatshirt.jpg";
import mensJacket from "@/assets/mens-jacket.jpg";
import childrenPajama from "@/assets/children-pajama.jpg";

export type FabricationType = "Knit" | "Woven" | "Leather" | "Sweater" | "Lingerie";

/**
 * Lean product schema. Only the fields driving the catalog card are required.
 * The catalog loader (useCatalog) normalizes both the new clean schema
 * (`type`, `print`) and the legacy schema (`fabrications`, `printEffect`,
 * `subcategory`, `description`, `gsm`) so existing data keeps working.
 */
export type Product = {
  id: string;
  name: string;
  image: string;
  category: "ladies" | "mens" | "children";
  fabric: string;
  color: string;
  /** Normalized print field — overlay row */
  print: string;
  /** Normalized product-type array (badge + filter) */
  fabrications: FabricationType[];
  tags?: string[];

  // ─── Legacy / optional fields kept for search backwards-compat ───
  subcategory?: string;
  description?: string;
  gsm?: string;
  /** @deprecated use `print` */
  printEffect?: string;
};

export const products: Product[] = [
  { id: "L001", name: "Classic Crew Neck T-Shirt", category: "ladies", fabric: "95% Cotton 5% Elastane S/J · 160 GSM", color: "White / Multi", print: "HD Print", image: ladiesTshirt, tags: ["Bestseller", "Stretch"], fabrications: ["Knit"] },
  { id: "L002", name: "Relaxed Tank Top", category: "ladies", fabric: "100% Cotton S/J · 140 GSM", color: "Off-White", print: "Discharge Print", image: ladiesTshirt, tags: ["Lightweight"], fabrications: ["Knit"] },
  { id: "L003", name: "Oversized Pullover Hoodie", category: "ladies", fabric: "80% Cotton 20% Polyester Fleece · 300 GSM", color: "Grey Melange", print: "Rubber Print", image: ladiesHoodie, tags: ["Fleece"], fabrications: ["Knit", "Sweater"] },
  { id: "L004", name: "Fitted Knit Dress", category: "ladies", fabric: "95% Cotton 5% Elastane S/J · 180 GSM", color: "Taupe", print: "Garment Wash", image: ladiesDress, tags: ["Elegant"], fabrications: ["Knit"] },
  { id: "L005", name: "Nightdress with Lace Trim", category: "ladies", fabric: "100% Cotton S/J · 160 GSM", color: "Soft Pink", print: "AOP (All Over Print)", image: ladiesDress, tags: ["Sleepwear"], fabrications: ["Knit", "Lingerie"] },
  { id: "L006", name: "Zip-Through Onesie", category: "ladies", fabric: "100% Cotton Fleece · 280 GSM", color: "Heather Grey", print: "Embroidery", image: ladiesHoodie, tags: ["Loungewear"], fabrications: ["Knit"] },
  { id: "L007", name: "Wide Leg Lounge Trouser", category: "ladies", fabric: "95% Cotton 5% Elastane French Terry · 240 GSM", color: "Navy / Cream", print: "Puff Print", image: ladiesTshirt, fabrications: ["Knit"] },
  { id: "L008", name: "Cropped Graphic T-Shirt", category: "ladies", fabric: "100% Organic Cotton S/J · 155 GSM", color: "Coral / Black", print: "Plastisol Print", image: ladiesTshirt, tags: ["Organic"], fabrications: ["Knit"] },
  { id: "M001", name: "Classic Polo Shirt", category: "mens", fabric: "100% Cotton Pique · 220 GSM", color: "Navy / White", print: "Embroidery", image: mensPolo, tags: ["Classic"], fabrications: ["Knit"] },
  { id: "M002", name: "Premium Crew Neck Tee", category: "mens", fabric: "100% Organic Cotton S/J · 180 GSM", color: "Black / Olive", print: "HD Print", image: mensPolo, tags: ["Organic"], fabrications: ["Knit"] },
  { id: "M003", name: "Bomber Jacket", category: "mens", fabric: "100% Cotton Twill · 280 GSM", color: "Charcoal", print: "Rubber Print", image: mensJacket, tags: ["Outerwear"], fabrications: ["Woven"] },
  { id: "M004", name: "Heavyweight Sweatshirt", category: "mens", fabric: "80% Cotton 20% Polyester Fleece · 350 GSM", color: "Grey Melange", print: "Puff Print", image: mensSweatshirt, tags: ["Heavyweight"], fabrications: ["Knit", "Sweater"] },
  { id: "M005", name: "Zip-Through Hoodie", category: "mens", fabric: "100% Cotton French Terry · 300 GSM", color: "Ecru / Navy", print: "Discharge Print", image: mensSweatshirt, fabrications: ["Knit", "Sweater"] },
  { id: "M006", name: "Jogger Trouser", category: "mens", fabric: "95% Cotton 5% Elastane French Terry · 260 GSM", color: "Black", print: "Plastisol Print", image: mensJacket, fabrications: ["Knit"] },
  { id: "M007", name: "Casual Chino Shorts", category: "mens", fabric: "100% Cotton Twill · 200 GSM", color: "Khaki / Stone", print: "Garment Dye", image: mensPolo, fabrications: ["Woven"] },
  { id: "C001", name: "Animal Print Pajama Set", category: "children", fabric: "100% Cotton S/J · 160 GSM", color: "Multi / Cream", print: "AOP (All Over Print)", image: childrenPajama, tags: ["Kids"], fabrications: ["Knit"] },
  { id: "C002", name: "Fun Graphic Outfit Set", category: "children", fabric: "100% Organic Cotton S/J · 155 GSM", color: "Sky Blue / White", print: "HD Print", image: childrenPajama, tags: ["Organic"], fabrications: ["Knit"] },
  { id: "C003", name: "Cozy Fleece Pajama Set", category: "children", fabric: "100% Cotton Fleece · 240 GSM", color: "Pink / Grey", print: "Embroidery", image: childrenPajama, tags: ["Fleece"], fabrications: ["Knit", "Sweater"] },
  { id: "C004", name: "Romper with Snap Closure", category: "children", fabric: "95% Cotton 5% Elastane Rib · 180 GSM", color: "Sage Green", print: "Rubber Print", image: childrenPajama, fabrications: ["Knit"] },
];

export const categories = [
  { id: "all", label: "All Collections" },
  { id: "ladies", label: "Women's Wear" },
  { id: "mens", label: "Men's Wear" },
  { id: "children", label: "Kid's Wear" },
] as const;

export const fabricationTypes: { id: "all" | FabricationType; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "Knit", label: "Knit" },
  { id: "Woven", label: "Woven" },
  { id: "Leather", label: "Leather" },
  { id: "Sweater", label: "Sweater" },
  { id: "Lingerie", label: "Lingerie" },
];
