import { SearchOutlined } from "@ant-design/icons";
import ProductCard from "../components/ProductCard";
import { Col, Input, Pagination, Row } from "antd";
import "./../styles/antd-override.css";
import { useGetProducts } from "../hooks/useProduct";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const productPerPage = 4;
  const start = (page - 1) * productPerPage;
  const end = start + productPerPage;
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading } = useGetProducts();

  const products = data?.data?.products ?? [];
  const currentDisplayProduct = products.slice(start, end);

  useEffect(() => {
    if (!search.trim()) {
      setDebounce("");
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setDebounce(search);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredProduct = products.filter((product) =>
    product.name.toLowerCase().includes(debounce.toLowerCase())
  );

  const loader = loading || isLoading;

  return (
    <div className="mt-15 py-5 flex flex-col gap-10">
      <span className="font-Cinzel text-[54px] justify-center">
        All Products
      </span>

      <Input
        placeholder="Search..."
        size="large"
        value={search}
        className="w-80! font-Montserrat! mt-10"
        onChange={(e) => setSearch(e.target.value)}
        prefix={<SearchOutlined />}
      />

      {debounce === "" ? (
        <Row gutter={[18, 18]}>
          {currentDisplayProduct.map((product) => (
            <Col key={product._id} xs={24} md={6}>
              <ProductCard product={product} loader={loader} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[18, 18]}>
          {filteredProduct.length > 0 ? (
            filteredProduct.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} loader={loader} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div className="text-center py-10">
                <span>Product Not Found</span>
              </div>
            </Col>
          )}
        </Row>
      )}

      <div className="flex justify-center">
        <Pagination
          pageSize={productPerPage}
          current={page}
          onChange={setPage}
          total={products.length}
        />
      </div>
    </div>
  );
};

export default HomePage;
