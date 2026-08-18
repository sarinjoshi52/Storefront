import { Button, Col, Form, Input, message, Row } from "antd";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/customer.services";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { SignUpDTO } from "../types/customer.type";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      console.log(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          form.setFields([
            {
              name: error.response?.data?.field,
              errors: [error.response?.data?.message],
            },
          ]);
        } else {
          message.error("Something went wrong!");
        }
      } else {
        message.error("Something went wrong");
      }
    },
  });

  const onFinish = (values: SignUpDTO) => {
    signUpMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-black/10 overflow-hidden">
      <div className="flex flex-col gap-5 w-[30%] font-Montserrat! bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg p-5">
        <div className="flex flex-col w-full items-center">
          <img
            src="/Logo.svg"
            alt="Logo"
            className="w-20 h-20 object-contain hover:scale-120 hover:-rotate-5 duration-300 transition-transform"
          />
          <span className="font-bold text-xl text-black">
            Create New Account
          </span>
        </div>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[24, 0]}>
            <Col md={24}>
              <Form.Item
                label={<span className="font-bold! font-Montserrat">Name</span>}
                key="name"
                name="name"
                className="text-start!"
              >
                <Input size="large" className="font-medium!" />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item
                label={
                  <span className="font-bold! font-Montserrat">Email</span>
                }
                key="email"
                name="email"
                className="text-start!"
              >
                <Input size="large" className="font-medium!" />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item
                label={
                  <span className="font-bold! font-Montserrat">Password</span>
                }
                key="password"
                name="password"
                className="text-start!"
              >
                <Input.Password size="large" className="font-medium!" />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item
                label={
                  <span className="font-bold! font-Montserrat">
                    Confirm Password
                  </span>
                }
                key="confirmPassword"
                name="confirmPassword"
                className="text-start!"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" className="font-medium!" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex flex-col gap-5 font-Montserrat!">
            <Button
              type="default"
              htmlType="submit"
              size="large"
              className="bg-red-500! font-bold! font-Montserrat! border-0! hover:text-white! hover:bg-black! transition-colors! duration-300! text-white! mt-5"
            >
              Create Account
            </Button>

            <span>
              Already have an Account?{" "}
              <a href="/login" className="font-bold">
                Login
              </a>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
