import {
  Button,
  Carousel,
  Col,
  Divider,
  Empty,
  Image,
  Radio,
  Row,
  Spin,
  Tooltip,
} from "antd";
import { useGetOneProduct } from "../hooks/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import CartContents from "../components/CartContents";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CreditCardOutlined,
  DollarOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useGetCart } from "../hooks/useCart";
import { useState } from "react";
import "./../styles/antd-override.css";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    images: {
      url: string;
      publicId: string;
    }[];
  };
  quantity: number;
}

const CheckoutPage = () => {
  const { productId } = useParams();
  const cartItem = useGetCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const navigate = useNavigate();

  const item: CartItem[] = cartItem?.data?.data?.cart?.items ?? [];
  console.log(item);

  const selectedItem = item.find(
    (itm) => (itm?.productId?._id as string) === productId
  );

  const { data: productData, isLoading: productLoading } =
    useGetOneProduct(productId);

  const discountAmount = 0;

  const images = productData?.data?.product?.images ?? [];
  const productDetail = productData?.data?.product ?? null;
  const subTotal = productDetail?.price * selectedItem?.quantity;
  const totalPrice = subTotal - discountAmount;

  const grandTotal = item.reduce(
    (total, itm) => total + itm.productId.price * itm.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-5 py-20 font-Montserrat!">
      {localStorage.getItem("accessToken") ? (
        <Row gutter={24}>
          <Col
            span={8}
            offset={1}
            className="rounded-lg bg-white h-150 shadow-md"
          >
            <div className="flex h-full flex-col p-7">
              <span className="flex text-start font-Montserrat font-bold text-xl">
                Cart Items
              </span>

              <CartContents path={(productId) => `/checkout/${productId}`} />
            </div>
          </Col>
          {productId ? (
            <Col
              span={13}
              offset={1}
              className="rounded-lg bg-white h-150 shadow-md"
            >
              <Row gutter={24} className="flex! justify-center! h-[60%]! py-7!">
                <Col span={14}>
                  {productLoading ? (
                    <div className="flex justify-center items-center flex-1">
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ fontSize: 100 }} spin />
                        }
                      />
                    </div>
                  ) : (
                    <Carousel arrows infinite={true}>
                      {images.map((img) => (
                        <Image
                          key={img.publicId}
                          src={img.url}
                          className="object-contain! w-full! h-80!"
                        />
                      ))}
                    </Carousel>
                  )}
                </Col>
                <Col span={10}>
                  <div className="flex flex-col gap-10">
                    <div className="flex justify-start flex-col text-start gap-2">
                      <span
                        onClick={() =>
                          navigate(`/products/${productDetail._id}`)
                        }
                        className="font-Montserrat flex gap-2 justify-end text-xs cursor-pointer pr-5 hover:-translate-y-0.5 duration-300 transition-transform"
                      >
                        <ArrowLeftOutlined />
                        View Product
                      </span>
                      <span className="font-Montserrat uppercase font-bold text-xl">
                        {productDetail?.name}
                      </span>
                      <span className="font-Montserrat text-sm">
                        <strong>NPR:</strong>{" "}
                        {productDetail?.price.toLocaleString("en-IN")}
                      </span>
                      <span className="font-Montserrat text-sm">
                        <strong>Quantity:</strong> {selectedItem?.quantity}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 px-5">
                      <span className="font-Montserrat text-sm flex justify-between">
                        <strong>Sub Total:</strong>{" "}
                        <span>
                          <strong>NPR: </strong>
                          {subTotal.toLocaleString("en-IN")}
                        </span>
                      </span>
                      <span className="font-Montserrat text-sm flex justify-between">
                        <strong>Discount:</strong>{" "}
                        <span>{discountAmount.toLocaleString("en-IN")}%</span>
                      </span>
                      <Divider size="small" />
                      <span className="font-Montserrat text-sm flex justify-between">
                        <strong>Total Amount:</strong>{" "}
                        <span>
                          <strong>NPR: </strong>
                          {totalPrice.toLocaleString("en-IN")}
                        </span>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Divider size="middle" />
              <Row gutter={24} align="stretch">
                <Col span={12}>
                  <div className="flex flex-col gap-2 items-start mt-10 px-5">
                    <span className="font-Montserrat! text-sm font-base text-black/50">
                      Payment Method
                    </span>

                    <Radio.Group
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      vertical
                      options={[
                        {
                          value: "cash",
                          label: (
                            <span className="flex items-center gap-1 text-sm font-Montserrat ">
                              <DollarOutlined /> Cash in Hand
                            </span>
                          ),
                        },
                        {
                          value: "online",
                          disabled: true,
                          label: (
                            <Tooltip title="Coming Soon...">
                              <span className="flex items-center gap-1 text-sm font-Montserrat">
                                <CreditCardOutlined /> Online Method
                              </span>
                            </Tooltip>
                          ),
                        },
                      ]}
                    ></Radio.Group>
                  </div>
                </Col>
                <Col span={10} offset={2}>
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col mt-5">
                      <span className="flex flex-row justify-between">
                        <strong>Sub Total: </strong>
                        <div>
                          <strong>NPR: </strong>
                          {grandTotal.toLocaleString("en-IN")}
                        </div>
                      </span>
                      <span className="flex flex-row justify-between">
                        <strong>Shipping: </strong>
                        Free
                      </span>
                      <Divider size="small" />
                      <span className="flex flex-row justify-between">
                        <strong>Grand Total: </strong>
                        <div>
                          <strong>NPR: </strong>
                          {grandTotal.toLocaleString("en-IN")}
                        </div>
                      </span>
                    </div>
                    <Button
                      icon={<ArrowRightOutlined />}
                      type="primary"
                      size="large"
                      className="font-Montserrat! font-bold! bg-green-500! border-green-500! items-center! hover:-translate-y-0.5 hover:shadow-md! transition-all duration-300 w-full!"
                    >
                      Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          ) : (
            <Empty description="Select a product" />
          )}
        </Row>
      ) : (
        <Empty description="Login to make a purchase" />
      )}
    </div>
  );
};

export default CheckoutPage;
