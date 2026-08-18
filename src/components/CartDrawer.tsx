import { Drawer, Empty, List, Spin } from "antd";
import { useGetCart } from "../hooks/useCart";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface CardDrawerProp {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CardDrawerProp) => {
  const { data, isLoading } = useGetCart();
  const navigate = useNavigate();

  const cartItem = data?.data?.cart.items ?? [];

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
        <List
          dataSource={cartItem}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                navigate(`/products/${item.productId._id}`), onClose();
              }}
            >
              <div className="flex w-full items-center gap-3 hover:bg-black/10 rounded-lg transition-color duration-300 cursor-pointer">
                <img
                  src={item.productId.images[0]?.url}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="font-bold">{item.productId.name}</div>

                  <div>Rs. {item.productId.price}</div>

                  <div>Quantity: {item.quantity}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;
