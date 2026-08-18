export interface AllProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  userId: {
    _id: string;
    name: string;
  };
  images: ProductImage[];
}

export interface CartProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  userId: {
    _id: string;
    name: string;
  };
  images: ProductImage[];
}

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface GetAllProductsResponse {
  products: AllProductType[];
}

export interface GetOneProductResponse {
  product: AllProductType;
}
