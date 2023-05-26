import React, { useState } from "react";
import axios from "../../libraries/axiosClient";
import Styles from "./Login.module.css";
import {
  SlSocialFacebook,
  SlSocialGoogle,
  SlSocialTwitter,
} from "react-icons/sl";
import { Alert } from "antd";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = {
      email,
      password,
    };

    try {
      const response = await axios.post("/customers/login", token);
      console.log(response);

      localStorage.setItem("token", response.data.token);
      //   <Alert message="Đăng nhập thành công!" type="success" showIcon />;
      alert("đăng nhập thành công");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      //   <Alert message="Đăng nhập thất bại" type="error" showIcon />;
      alert("đăng nhập thất bại");
    }
  };

  return (
    <div className={Styles.container}>
      <form className={Styles.form_1}>
        <h1 className={Styles.login}>Login</h1>
        <label htmlFor="email" className={Styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className={Styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={Styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={Styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className={Styles.span}>Forgot Password</span>
        <button className={Styles.button} onClick={(e) => handleSubmit(e)}>
          Login
        </button>
        <div className="d-flex justify-content-center ">
          <p className={Styles.text}>Don't have an acount ?</p>
          <Link href="/signup" className={Styles.text2}>
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
