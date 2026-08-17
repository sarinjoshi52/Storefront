import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import NavContents from "../components/NavContents";
import { Outlet } from "react-router-dom";

const StoreLayout = () => {
  return (
    <Layout className="flex! flex-col! w-full!">
      {/* header */}
      <Header className="flex z-20! bg-white! shadow-md fixed! w-full! h-15!">
        <NavContents />
      </Header>

      {/* pages */}
      <Content className="flex-1! min-h-0! overflow-y-auto! px-20 mt-15">
        <Outlet />
      </Content>
      {/* footer */}
    </Layout>
  );
};

export default StoreLayout;
