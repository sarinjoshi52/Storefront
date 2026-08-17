import { Card, Skeleton } from "antd";
import type { AllProductType } from "../types/product.type";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: AllProductType;
  loader?: boolean;
};

const { Meta } = Card;
const ProductCard = ({ product, loader }: ProductCardProps) => {
  const card = (
    <Card
      hoverable
      variant="borderless"
      cover={
        loader ? (
          <Skeleton active className="h-70! w-full!" />
        ) : (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-70 object-cover"
          />
        )
      }
      className="xl:w-60 hover:scale-102 transition-all! duration-200!"
    >
      {loader ? (
        <Skeleton
          active
          title={{ width: "80%" }}
          paragraph={{ rows: 1, width: "50%" }}
        />
      ) : (
        <Meta
          title={
            <span className="text-base text-start block w-full font-Montserrat font-bold truncate capitalize">
              {product.name}
            </span>
          }
          description={
            <span className="text-sm text-start block w-full font-Montserrat text-black">
              NPR {product.price.toLocaleString("en-IN")}
            </span>
          }
        />
      )}
    </Card>
  );

  return loader ? card : <Link to={`/products/${product._id}`}>{card}</Link>;
};

export default ProductCard;
