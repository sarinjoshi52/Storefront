import { Button, Form, Input, message } from "antd";
import type { LoginDTO } from "../types/customer.type";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/customer.services";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.data.accessToken);
      message.success(res.data.message);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          setErrorMessage(error.response?.data?.message);
          form.setFields;
        } else {
          message.error("Something went wrong!");
        }
      } else {
        message.error("Something went wrong");
      }
    },
  });

  const onFinish = (values: LoginDTO) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const handleChange = () => {
    setErrorMessage("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black/10">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        labelAlign="left"
        autoComplete="off"
        className="p-5! h-120! w-100! bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
      >
        <div className="flex flex-col items-center mb-5">
          <img
            src="/Logo.svg"
            className="w-20 h-20 object-contain hover:scale-120 hover:-rotate-5 duration-300 transition-transform"
          />
          <span className="font-Montserrat font-bold text-lg">
            Login to your Account
          </span>
        </div>

        <Form.Item
          key="email"
          name="email"
          label={<span className="font-bold font-Montserrat">Email</span>}
          className="font-Montserrat! text-start!"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <Input size="large" className="font-medium" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          key="password"
          name="password"
          label={<span className="font-bold font-Montserrat">Password</span>}
          className="font-Montserrat! text-start!"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password
            size="large"
            className="font-medium"
            onChange={handleChange}
          />
        </Form.Item>

        {errorMessage && (
          <span className="text-red-500 font-Montserrat font-base text-start">
            {errorMessage}
          </span>
        )}

        <Button
          type="default"
          htmlType="submit"
          size="large"
          className="bg-red-500! font-bold! font-Montserrat! border-0! hover:text-white! hover:bg-black! transition-colors! duration-300! text-white! mt-5"
        >
          Login
        </Button>

        <span className="mt-10 font-Montserrat">
          Don't have an Account?{" "}
          <a href="/signup" className="font-bold">
            Create an Account
          </a>
        </span>
      </Form>
    </div>
  );
};

export default LoginPage;
