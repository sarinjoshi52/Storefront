import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/Router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBorderColor: "none", // border on hover
            activeBorderColor: "none", // border on focus
            activeShadow: "none",
          },
          Pagination: {
            colorBorder: "none",
            colorPrimary: "none",
            colorPrimaryActive: "none",
            colorPrimaryHover: "none",
          },
          Listy: {
            controlItemBgHover: "none",
            lineType: "none",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
