export type Page = "home" | "catalog" | "details" | "cart" | "about" | "contact" | "privacy";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  color: string;
  details: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};
