export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  size: string;
  condition: "Like New" | "Excellent" | "Good" | "Fair";
  estimatedValue: number;
  location: string;
  image: string;
  images?: string[];
  category: "Tops" | "Bottoms" | "Dresses" | "Outerwear" | "Ethnic" | "Accessories" | "Suits" | "Shoes"; // Fixed syntax error & added Shoes
  user: string;
  description?: string;
}

export const sampleItems: ClothingItem[] = [
  {
    id: "1",
    name: "Classic Nike Tshirt",
    brand: "Nike",
    size: "M",
    condition: "Excellent",
    estimatedValue: 2200,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1666910800969-9b68cd1ac34e?q=80&w=736&auto=format&fit=crop",
    user: "Soumya R.",
    location: "Hyderabad",
    description: "A comfortable, breathable classic sportswear fit."
  },
  {
    id: "2",
    name: "Oversized Grey Sweatshirt",
    brand: "H&M",
    size: "S",
    condition: "Like New",
    estimatedValue: 1500,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1692558588426-3d0b83ccaabe?q=80&w=765&auto=format&fit=crop",
    user: "Netra",
    location: "Bengaluru",
    description: "Super cozy premium fleece sweatshirt from H&M."
  },
  {
    id: "3",
    name: "Printed Anarkali Kurta set",
    brand: "FabIndia",
    size: "M",
    condition: "Good",
    estimatedValue: 2500,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1669196582366-8ddd42222370?q=80&w=735&auto=format&fit=crop",
    user: "Shikha R.",
    location: "Hyderabad",
    description: "Elegant traditional wear set in shade of blue. Cotton-rich fabric, airy and with dupatta."
  },
  {
    id: "4",
    name: "Cargo Pants",
    brand: "Roadster",
    size: "L",
    condition: "Excellent",
    estimatedValue: 2500,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1766575694179-e159f786d2e3?q=80&w=687&auto=format&fit=crop",
    user: "Noah V.",
    location: "New Delhi",
    description: "Multi-pocket durable street utility cargos. Adjusts neatly at the waist."
  },
  {
    id: "5",
    name: "Formal Suit",
    brand: "Armani",
    size: "L",
    condition: "Like New",
    estimatedValue: 70000,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1603394151492-5e9b974b090b?q=80&w=684&auto=format&fit=crop",
    user: "Taraksh B.",
    location: "Mumbai",
    description: "Well-maintained suit set with a refined silhouette, suitable for both business and formal gatherings."
  },
  {
    id: "6",
    name: "Cropped Black Blazer",
    brand: "Uniqlo",
    size: "S",
    condition: "Excellent",
    estimatedValue: 4100,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1702904651130-817572ca1ab7?q=80&w=688&auto=format&fit=crop",
    user: "Deshna M.",
    location: "Nagpur",
    description: "Minimalist modern tailoring drop from Uniqlo. Clean finish & look sharp casually or formally."
  },
  {
    id: "7",
    name: "White Tennis Skirt",
    brand: "Levi's",
    size: "S",
    condition: "Excellent",
    estimatedValue: 5500,
    category: "Bottoms",
    image: "https://plus.unsplash.com/premium_photo-1671586882442-d1ea6b88e968?q=80&w=687&auto=format&fit=crop",
    user: "Jess",
    location: "Pune",
    description: "White tennis skirt in excellent condition. Stylish, comfortable, and perfect for sports or casual wear."
  },
  {
    id: "8",
    name: "Summer Dress",
    brand: "Forever 21",
    size: "S",
    condition: "Like New",
    estimatedValue: 3800,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop",
    user: "Garima Duggal",
    location: "Goa",
    description: "Lightweight, breathable, flowy dress with an open-back string ties accent. Perfect for warm days."
  },
  {
    id: "9",
    name: "Beige Shirt",
    brand: "Puma",
    size: "8",
    condition: "Good",
    estimatedValue: 4900,
    category: "Outerwear",
    image: "https://plus.unsplash.com/premium_photo-1673734625879-2dd5410bc3e1?q=80&w=687&auto=format&fit=crop",
    user: "Agastya G.",
    location: "Kolkata",
    description: "Classic beige layering jacket in great condition, perfect for all seasons"
  },
  {
    id: "10",
    name: "Charcoal gray scarf",
    brand: "Marks & Spencer",
    size: "XL",
    condition: "Like New", // Fixed: Changed from "New" to valid option
    estimatedValue: 3500,
    category: "Accessories",
    image: "https://plus.unsplash.com/premium_photo-1731355899385-0d19166f584d?q=80&w=687&auto=format&fit=crop",
    user: "Judy H.",
    location: "Mumbai",
    description: "Comfortable and versatile with a sleek, modern appearance."
  },
  {
    id: "11",
    name: "Wide leg Denim Jeans",
    brand: "Zara",
    size: "28",
    condition: "Excellent",
    estimatedValue: 4500,
    category: "Bottoms",
    image: "https://plus.unsplash.com/premium_photo-1664451820896-49ba66fc9d3b?q=80&w=687&auto=format&fit=crop",
    user: "Ashi K.",
    location: "Chandigarh",
    description: "Classic blue wide-leg denim jeans with a relaxed fit and timeless style."
  },
  {
    id: "12",
    name: "Silk Saree",
    brand: "Craftsvilla",
    size: "One Size",
    condition: "Like New",
    estimatedValue: 5700,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1770838446951-23c2e61c3d1c?q=80&w=687&auto=format&fit=crop",
    user: "Sargun N.",
    location: "Varanasi",
    description: "Intricate golden zari border weave on pure dark green silk."
  },
  {
    id: "13",
    name: "Suede Chelsea Boots",
    brand: "Woodland",
    size: "9",
    condition: "Good",
    estimatedValue: 4500,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=700&auto=format&fit=crop",
    user: "Vikram",
    location: "Jaipur",
    description: "Premium tan suede pull-on boots with elastic side panels. Rugged but looks formal too."
  },
  {
    id: "14",
    name: "Basic Crop Top",
    brand: "H&M",
    size: "S",
    condition: "Good",
    estimatedValue: 1800,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1690179756660-2ad2cd03bca1?q=80&w=627&auto=format&fit=crop",
    user: "Nikita Reddy",
    location: "Kochi",
    description: "A staple basic crop top, versatile for any casual outfit."
  },
  {
    id: "15",
    name: "Cotton Kurta",
    brand: "Manyavar",
    size: "L",
    condition: "Like New",
    estimatedValue: 1600,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1708157460851-534333725779?q=80&w=736&auto=format&fit=crop",
    user: "Arjun R.",
    location: "Indore",
    description: "Elegant traditional kurta in a soft neutral tone, comfortable and stylish for any celebration."
  },
  {
    id: "16",
    name: "Classic cream corduroy cap",
    brand: "Adidas",
    size: "One size",
    condition: "Excellent",
    estimatedValue: 2200,
    category: "Accessories",
    image: "https://plus.unsplash.com/premium_photo-1763749475653-a39347fc6aac?q=80&w=687&auto=format&fit=crop",
    user: "Bilaal",
    location: "Bangalore",
    description: "Cream corduroy baseball cap in excellent condition — stylish, comfortable, and easy to pair."
  },
  {
    id: "17",
    name: "Party wear dress",
    brand: "Sherri Hill",
    size: "S",
    condition: "Like New", // Fixed: Changed from "New" to valid option
    estimatedValue: 25000,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1700065404033-da12489d9738?q=80&w=687&auto=format&fit=crop",
    user: "Vrushali R.",
    location: "Mumbai",
    description: "Emerald green sequin evening gown. Glamorous, perfect for weddings and formal events."
  },
  {
    id: "18",
    name: "Gold Waist Chain",
    brand: "Unbranded",
    size: "One Size",
    condition: "Good",
    estimatedValue: 2300,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1672909777646-fc4b41387927?q=80&w=687&auto=format&fit=crop",
    user: "Rechal Jemini",
    location: "Nagpur",
    description: "Stylish gold body chain that adds a chic and sophisticated accent to any look."
  },
  {
    id: "19",
    name: "Rolex Datejust",
    brand: "Rolex",
    size: "36",
    condition: "Excellent", // Fixed: Changed from "Great" to valid option
    estimatedValue: 300000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1617714651073-17a0fcd14f9e?q=80&w=687&auto=format&fit=crop",
    user: "Nick Wilde",
    location: "Mumbai",
    description: "Classic timepiece with a stainless steel and gold finish, in great working condition."
  },
  {
    id: "20",
    name: "Beige single-breasted blazer.",
    brand: "Raymond",
    size: "36",
    condition: "Excellent", // Fixed: Changed from "Great" to valid option
    estimatedValue: 65800,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1523211737006-e54a3c7299ab?q=80&w=1170&auto=format&fit=crop",
    user: "Aniket k.",
    location: "Mumbai",
    description: "Sophisticated beige blazer features a refined, textured finish and structured tailoring."
  }
];

export const getItemsByUser = (userName: string) => {
  return sampleItems.filter((item) => item.user === userName);
};

export const getItemsByCategory = (category: ClothingItem["category"]) => {
  return sampleItems.filter((item) => item.category === category);
};

export const searchItems = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return sampleItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.brand.toLowerCase().includes(lowerQuery)
  );
};

export const sampleUsers = [
  { id: "1", name: "Soumya R.", email: "soumya@gmail.com" },
  { id: "2", name: "Netra", email: "netra@gmail.com" },
  { id: "3", name: "Shikha R.", email: "shikha@gmail.com" },
  { id: "4", name: "Noah V.", email: "noah@gmail.com" },
  { id: "5", name: "Taraksh B.", email: "taraksh@gmail.com" },
  { id: "6", name: "Deshna M.", email: "deshna@gmail.com" },
  { id: "7", name: "Jess", email: "Jess@gmail.com" },
  { id: "8", name: "Garima Duggal", email: "garima@gmail.com" },
  { id: "9", name: "Agastya G.", email: "agastya@gmail.com" },
  { id: "10", name: "Judy H.", email: "judy@gmail.com" },
  { id: "11", name: "Ashi K.", email: "ashi@gmail.com" },
  { id: "12", name: "Sargun N.", email: "sargun@gmail.com" },
  { id: "13", name: "Vikram", email: "vikram@gmail.com" },
  { id: "14", name: "Nikita Reddy", email: "nikita@gmail.com" },
  { id: "15", name: "Arjun R.", email: "arjun@gmail.com" },
  { id: "16", name: "Bilaal", email: "bilaal@gmail.com" },
  { id: "17", name: "Vrushali R.", email: "vrushali@gmail.com" },
  { id: "18", name: "Rechal Jemini", email: "rechal@gmail.com" },
  { id: "19", name: "Nick Wilde", email: "nick@gmail.com" },
  { id: "20", name: "Aniket k.", email: "aniket@gmail.com" },
];