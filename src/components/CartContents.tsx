import { DeleteOutlined } from "@ant-design/icons";
import { Button, Listy } from "antd";
import Item from "antd/es/list/Item";
import { useState } from "react";
import { useGetCart, useRemoveFromCart, useUpdateCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

interface CartContentsProps {
  path: (productId: string) => string;
  onClose?: () => void;
}

const CartContents = ({ path, onClose }: CartContentsProps) => {
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const updateCart = useUpdateCart();
  const removeFromCart = useRemoveFromCart();
  const { data } = useGetCart();
  const navigate = useNavigate();

  const cartItem = data?.data.cart?.items ?? [];

  const handleClick = (productId: string) => {
    setDeletingItem(productId);
    removeFromCart.mutate(productId, {
      onSettled: () => {
        setDeletingItem(null);
      },
    });
  };

  const handleIncrement = (productId: string) => {
    updateCart.mutate({ productId, change: 1 });
  };

  const handleDecrement = (productId: string) => {
    updateCart.mutate({ productId, change: -1 });
  };

  return (
    <Listy
      rowKey={(item) => item.productId._id}
      items={cartItem}
      className="overflow-y-auto!"
      itemRender={(item) => (
        <Item
          onClick={() => {
            navigate(path(item.productId._id)), onClose?.();
          }}
        >
          <div className="flex w-full justify-between border p-2 rounded-lg group cursor-pointer">
            <div className="flex w-full items-center gap-3">
              <img
                src={item.productId.images[0]?.url}
                alt={item.productId.name}
                className="w-16 h-16 object-cover rounded group-hover:scale-102 transition-transfrom duration-75"
              />

              <div className="flex-1 font-Montserrat">
                <div className="font-bold line-clamp-1 flex justify-start">
                  {item.productId.name}
                </div>

                <div className="flex justify-start">
                  Rs. {item.productId.price}
                </div>

                <span className="flex flex-row gap-1 items-center">
                  Quantity:{" "}
                  <div className="flex flex-row gap-1 items-center">
                    <Button
                      size="small"
                      type="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrement(item.productId._id);
                      }}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      size="small"
                      type="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncrement(item.productId._id);
                      }}
                      disabled={item.quantity === 10}
                    >
                      +
                    </Button>
                  </div>
                </span>
              </div>
            </div>

            <div className="flex-1">
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(item.productId._id);
                }}
                loading={deletingItem === item.productId._id}
              />
            </div>
          </div>
        </Item>
      )}
    />
  );
};

export default CartContents;
