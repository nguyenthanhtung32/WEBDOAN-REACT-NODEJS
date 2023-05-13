import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import axios from "../../libraries/axiosClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = {
      email,
      password,
    };

    try {
      const response = await axios.post("/employees/login", token);
      console.log(response);
      
      localStorage.setItem("token", response.data.token);
      alert("Đăng nhập thành công");
      window.location.href = "/home";

    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại");
      
    }
  };


  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Email address"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
