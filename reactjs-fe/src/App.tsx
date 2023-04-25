import "antd/dist/reset.css";
import "./App.css";
import Categories from "./pages/Categories/index";
import Customers from "./pages/Customers/index";
import Suppliers from "./pages/Suppliers/index";
import Employees from "./pages/Employees/index";
import Products from "./pages/Products/index";
import CreateProduct from "./pages/Products/create"
import CreateCategory from "./pages/Categories/create"
import CreateCustomer from "./pages/Customers/create"
import CreateSupplier from "./pages/Suppliers/create"
import CreateEmployee from "./pages/Employees/create"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";

const headerStyle: React.CSSProperties = {
    backgroundColor: "dark",
  };
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#ffcccc",
  };
  const contentStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  };

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={headerStyle}>
          <NavigationBar />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
          <Routes>
            <Route path="/category" element={<CreateCategory />} />
            <Route path="/product" element={<CreateProduct />} />
            <Route path="/customer" element={<CreateCustomer />} />
            <Route path="/supplier" element={<CreateSupplier />} />
            <Route path="/employee" element={<CreateEmployee />} />
          </Routes>
        </Content>
        <Footer style={footerStyle}>Web Design Ideas Copyright © 2023.</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
