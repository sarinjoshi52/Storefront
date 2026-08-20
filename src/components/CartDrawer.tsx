import { Button, Divider, Drawer, Empty, Spin } from "antd";
import { useGetCart } from "../hooks/useCart";
import { LoadingOutlined } from "@ant-design/icons";

import CartContents from "./CartContents";
import { useNavigate } from "react-router-dom";

interface CardDrawerProp {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CardDrawerProp) => {
  const { data, isLoading } = useGetCart();
  const navigate = useNavigate();

  const cartItem = data?.data?.cart.items ?? [];
  const firstItem = data?.data?.cart.items?.[0];

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
        <>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <CartContents
              path={(productId) => `/product/${productId}`}
              onClose={onClose}
            />
          </div>
          <Divider size="small" />
          <Button
            onClick={() => {
              navigate(`/checkout/${firstItem?.productId._id}`), onClose();
            }}
            size="large"
            type="primary"
            className="font-Montserrat! font-bold! bg-green-500! border-green-500! items-center! hover:-translate-y-0.5 hover:shadow-md! transition-all duration-300 w-full!"
          >
            Checkout
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
