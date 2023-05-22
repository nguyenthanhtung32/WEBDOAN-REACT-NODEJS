import React, { useState } from "react";
import axios from "../../libraries/axiosClient";
import Styles from "./Login.module.css";
import {
  SlSocialFacebook,
  SlSocialGoogle,
  SlSocialTwitter,
} from "react-icons/sl";
import { Alert } from "antd";

const Login= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = {
      email,
      password,
    };

    try {
      const response = await axios.post("/employees/login", token);
      console.log(response);

      localStorage.setItem("token", response.data.token);
      <Alert message="Đăng nhập thành công!" type="success" showIcon />
      setIsLogin(true);
    } catch (error) {
      console.error(error);
      <Alert message="Đăng nhập thất bại" type="error" showIcon />
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

        <p className={Styles.text}>Or SignUp Using</p>
        <div className={Styles.icons}>
          <a href="https://www.facebook.com/">
            <i className={Styles.fa_facebook_f}>
              <SlSocialFacebook />
            </i>
          </a>
          <a href="https://twitter.com/">
            <i className={Styles.fa_twitter}>
              <SlSocialTwitter />
            </i>
          </a>
          <a href="https://mail.google.com/">
            <i className={Styles.fa_google}>
              <SlSocialGoogle />
            </i>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
