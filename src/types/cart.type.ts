import type { CartProductType } from "./product.type";

export interface CartDTO {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  message: string;
  _id: string;
  customerId: string;
  items: [
    {
      productId: string;
      quantity: number;
    }
  ];
}

export interface getCartResponse {
  cart: {
    _id: string;
    customerId: string;
    items: [
      {
        productId: CartProductType;
        quantity: number;
      }
    ];
  };
}

export type removeFromCartResponse = AddToCartResponse;

export interface updateCartDTO {
  productId: string;
  change: 1 | -1;
}
export type updateCartResponse = AddToCartResponse;
