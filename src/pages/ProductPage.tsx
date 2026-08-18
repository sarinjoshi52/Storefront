import { Button, Carousel, Col, Divider, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { useGetOneProduct } from "../hooks/useProduct";
import { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./../styles/richtext.css";
import "./../styles/antd-override.css";
import DOMPurify from "dompurify";
import { useAddToCart } from "../hooks/useCart";

const ProductPage = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetOneProduct(productId);
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useAddToCart();

  const decQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  const incQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decDisable = quantity <= 1;
  const incDisable = quantity === 10;

  const product = data?.data?.product;
  const images = data?.data.product?.images;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleAddToCart = (productId: string, quantity: number) => {
    addToCart.mutate({ productId, quantity });
  };

  return (
    <div className="flex flex-col gap-5 text-start pb-10">
      <Row gutter={[32, 32]} align={"middle"} className="mt-10">
        <Col xs={18} md={12}>
          <Carousel arrows infinite={true}>
            {images.map((img) => (
              <Image
                key={img.publicId}
                src={img.url}
                className="object-contain! w-full! h-100!"
              />
            ))}
          </Carousel>
        </Col>
        <Col xs={18} md={12}>
          <div className="flex flex-col font-Montserrat text-start mt-5 ">
            <div className="flex flex-col">
              <h2 className="text-[36px]! font-bold! text-black! capitalize">
                {product.name}
              </h2>
              <span className="text-base  text-black/90">
                <strong>NPR</strong> {product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <Divider />

            {/* quantity and button */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-base">Quantity</span>
                <div className="flex flex-row items-center gap-1">
                  <Button
                    type="default"
                    onClick={decQuantity}
                    disabled={decDisable}
                    style={{
                      border: "none",
                      boxShadow: "none",
                      color: "black",
                    }}
                  >
                    -
                  </Button>
                  <span className="px-6 text-sm">{quantity}</span>
                  <Button
                    type="default"
                    onClick={incQuantity}
                    disabled={incDisable}
                    style={{
                      border: "none",
                      boxShadow: "none",
                      color: "black",
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-row text-white gap-2">
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={() => handleAddToCart(product._id, quantity)}
                  icon={<ShoppingCartOutlined />}
                  className="bg-red-500! border-red-400! rounded-md py-5 hover:bg-red-800! hover:border-red-800! hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Add to Cart
                </Button>
                <Button
                  type="default"
                  block
                  size="large"
                  className="inline-block w-full rounded-md py-2 text-red-500! border-red-500!  cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="flex flex-col gap-5">
        <span className="text-black font-Montserrat text-xl font-bold">
          About
        </span>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description),
          }}
          className="text-black text-sm font-Montserrat text-justify prose ProseMirror-output"
        />
      </div>
    </div>
  );
};

export default ProductPage;
