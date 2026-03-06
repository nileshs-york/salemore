export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  is_featured: number;
  packaging_size?: string;
  shape?: string;
  packaging?: string;
  color?: string;
  per_piece_price?: string;
  mrp?: string;
}

export interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  avatar: string;
}
