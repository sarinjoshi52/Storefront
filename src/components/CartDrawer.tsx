import { Button, Drawer, Empty, Listy, Spin } from "antd";
import { useGetCart, useRemoveFromCart, useUpdateCart } from "../hooks/useCart";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Item from "antd/es/list/Item";
import { useState } from "react";

interface CardDrawerProp {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CardDrawerProp) => {
  const { data, isLoading } = useGetCart();
  const removeFromCart = useRemoveFromCart();
  const updateCart = useUpdateCart();
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const cartItem = data?.data?.cart.items ?? [];

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
    <Drawer
      title="Your Cart"
      closable={{ "aria-label": "Close Button" }}
      open={open}
      onClose={onClose}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : cartItem.length === 0 ? (
        <Empty description="Your cart is empty" />
      ) : (
        <Listy
          rowKey={"productId"}
          items={cartItem}
          itemRender={(item) => (
            <Item
              onClick={() => {
                navigate(`/products/${item.productId._id}`), onClose();
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
                    <div className="font-bold line-clamp-1">
                      {item.productId.name}
                    </div>

                    <div>Rs. {item.productId.price}</div>

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
                          disabled={updateCart.isPending}
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
                          disabled={updateCart.isPending}
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
                      console.log("PRODUCT ID: ", item.productId._id);
                      handleClick(item.productId._id);
                    }}
                    loading={deletingItem === item.productId._id}
                  />
                </div>
              </div>
            </Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;
