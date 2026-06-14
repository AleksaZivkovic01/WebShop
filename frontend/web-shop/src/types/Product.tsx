export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  categoryId: number;
  description?: string;
}
