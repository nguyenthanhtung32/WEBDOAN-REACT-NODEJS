import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import axios from "../../libraries/axiosClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBrithday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      birthday,
    };

    try {
      const response = await axios.post("/customers", payload);
      console.log(response);
      alert("Đăng kí thành công");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Đăng kí thất bại");
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
        label="Họ"
        name="firstName"
        hasFeedback
        required={true}
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập họ",
          },
        ]}
      >
        <Input
          placeholder="Nhập họ"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Tên"
        name="lastName"
        hasFeedback
        required={true}
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập tên",
          },
        ]}
      >
        <Input
          placeholder="Nhập tên"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          allowClear
        />
      </Form.Item>

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
        label="Địa chỉ"
        name="address"
        hasFeedback
        required={true}
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập địa chỉ",
          },
        ]}
      >
        <Input
          type="Nhập địa chỉ"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        hasFeedback
        required={true}
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập số điện thoại",
          },
        ]}
      >
        <Input
          type="Nhập số điện thoại"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Address"
        />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="birthday"
        hasFeedback
        required={true}
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập ngày sinh",
          },
        ]}
      >
        <Input
          type="Nhập ngày sinh của b"
          name="birthday"
          value={birthday}
          onChange={(e) => setBrithday(e.target.value)}
          placeholder="Address"
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
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
}
