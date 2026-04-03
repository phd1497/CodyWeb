/* ── Product Types ── */

export type ProductCategory = 'Juice' | 'Coffee' | 'Milk Tea' | 'Soft Drink';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription: string;
  rating: number;
  stock: number;
}
