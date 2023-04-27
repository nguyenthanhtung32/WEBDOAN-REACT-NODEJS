import "antd/dist/reset.css";
import Categories from "../../pages/Categories/index";
import Customers from "../../pages/Customers/index";
import Suppliers from "../../pages/Suppliers/index";
import Employees from "../../pages/Employees/index";
import Products from "../../pages/Products/index";
import Cart from "../../pages/Cart/index";
import Orders from "../../pages/Orders";
import CreateProduct from "../../pages/Products/create";
import CreateCategory from "../../pages/Categories/create";
import CreateCustomer from "../../pages/Customers/create";
import CreateSupplier from "../../pages/Suppliers/create";
import CreateEmployee from "../../pages/Employees/create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
<<<<<<< HEAD
import NavigationBar from "../Navigation/NavigationBar";
=======
import NavigationBar from "../NavigationBar/NavigationBar";
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
import SideBar from "../SideBar/SideBar";
import Home from "../../pages/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

<<<<<<< HEAD
const headerStyle: React.CSSProperties = {
  backgroundColor: "dark",
};
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ffcccc",
};
=======
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
const contentStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
<<<<<<< HEAD
  width: "100%",
=======
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
};

interface IProps {
  setIsLogin: (value: boolean) => void;
}

function BaseWeb(props: IProps) {
<<<<<<< HEAD
  const { setIsLogin } = props;
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <NavigationBar
          setIsLogin={function (value: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
=======
  return (
    <BrowserRouter>
      <Layout>
        <Header/>
          <NavigationBar
            setIsLogin={function (value: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
        <Content style={contentStyle}>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </Content>
<<<<<<< HEAD
        <Footer />
=======
        <Footer/>
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
      </Layout>
    </BrowserRouter>
  );
}

export default BaseWeb;
