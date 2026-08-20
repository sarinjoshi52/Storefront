import {
  DownOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, message, Space, type MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../hooks/useCustomer";
import CartDrawer from "./CartDrawer";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/customer.services";

const NavContents = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<any>(
    !!localStorage.getItem("accessToken")
  );
  const { data, isLoading } = useGetMe();

  const customer = data?.data?.customer;

  const dropDownItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const queryClient = useQueryClient();

  const handleClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "logout") {
      try {
        await logout();
        queryClient.clear();
        localStorage.removeItem("accessToken");
        setLoggedIn(false);
        message.success("Logout successful");
      } catch (error) {
        console.error(error);
        message.error("Logout failed");
      }
    }
  };

  const menuItems = [
    {
      path: "/",
      name: "Home",
    },
  ];

  return (
    <div className="relative w-full flex flex-row justify-between px-5 items-center py-2.5">
      <img
        src="/Logo.svg"
        alt="storefront"
        className="object-contain w-15 h-15 hover:-rotate-10 hover:scale-130 cursor-pointer transition-all duration-300"
        onClick={() => navigate("/")}
      />

      <ul className="absolute left-1/2 -translate-x-1/2 w-fit flex flex-row items-center justify-between gap-5">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col text-sm overflow-hidden h-[25px] group font-Montserrat "
          >
            <span
              onClick={() => navigate(`${item.path}`)}
              className="capitalize font-bold group-hover:-translate-y-full transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </span>
            <span
              onClick={() => navigate(`${item.path}`)}
              className="capitalize font-bold group-hover:-translate-y-full transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-row gap-5 items-center">
        <Button
          type="text"
          onClick={() => setOpen(true)}
          icon={<ShoppingCartOutlined className="text-lg!" />}
        />

        {loggedIn ? (
          <Dropdown
            menu={{ items: dropDownItems, onClick: handleClick }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              size="large"
              type="text"
              loading={isLoading}
              className="font-Montserrat!"
            >
              <Space size="medium" align="center">
                <Avatar size={32} icon={<UserOutlined />} />
                <div className="flex flex-row items-center gap-1">
                  {customer?.name}
                  <DownOutlined className="text-xs!" />
                </div>
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
            icon={<UserOutlined />}
            className="bg-red-500! text-white! border-0 hover:border-0! focus:border-0! font-bold! font-Montserrat!"
          >
            Login
          </Button>
        )}
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default NavContents;
