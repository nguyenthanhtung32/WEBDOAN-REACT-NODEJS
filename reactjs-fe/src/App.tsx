import React, { useState } from "react";
import "./App.css";
<<<<<<< HEAD
import Categories from "./pages/Categories/index";
import Customers from "./pages/Customers/index";
import Suppliers from "./pages/Suppliers/index";
import Employees from "./pages/Employees/index";
import Products from "./pages/Products/index";
import Cart from "./pages/Cart/index";
import Orders from "./pages/Orders";
import CreateProduct from "./pages/Products/create";
import CreateCategory from "./pages/Categories/create";
import CreateCustomer from "./pages/Customers/create";
import CreateSupplier from "./pages/Suppliers/create";
import CreateEmployee from "./pages/Employees/create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import NavigationBar from "./components/Navigation/NavigationBar";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";

const headerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
};
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ffcccc",
};
const contentStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  margin: "0 20px"
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />

        <nav style={{margin: "0 20px"}}>
          <NavigationBar setIsLogin={function (value: boolean): void {
            throw new Error("Function not implemented.");
          } } />
        </nav>
        <Content style={contentStyle}>
          <SideBar/>
          {/* <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Routes>
            <Route path="/category" element={<CreateCategory />} />
            <Route path="/product" element={<CreateProduct />} />
            <Route path="/customer" element={<CreateCustomer />} />
            <Route path="/supplier" element={<CreateSupplier />} />
            <Route path="/employee" element={<CreateEmployee />} />
          </Routes> */}
        </Content>
        {/* <Footer style={footerStyle}>Web Design Ideas Copyright © 2023.</Footer> */}
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}
=======
import BaseWeb from "./components/ReadMore/BaseWeb";
import Login from "./pages/Auth/Login";
//   import Login from "./Components/pages/Auth/Login";
function App() {
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9

    const[isLogin, setIsLogin] = useState(false);

  return (
    <>
    {isLogin ? (
        < BaseWeb setIsLogin={setIsLogin}/>
      ) : (<Login setIsLogin={setIsLogin}/>)} 
      {/* <BaseWeb/> */}
    </>
    );
}
export default App;