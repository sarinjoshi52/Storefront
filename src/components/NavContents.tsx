import {
  DownOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, message, type MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavContents = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const dropDownItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("accessToken");
      setLoggedIn(false);
      message.success("Logout successful");
    }
  };

  const menuItems = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/contact",
      name: "Contact",
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
              className="font-bold! font-Montserrat! "
            >
              <Avatar size={32} icon={<UserOutlined />} />
              User Name
              <DownOutlined />
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
    </div>
  );
};

export default NavContents;
