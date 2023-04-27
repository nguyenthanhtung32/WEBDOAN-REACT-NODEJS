<<<<<<< HEAD
import React, { useCallback } from "react";
import { Button, Input, message } from "antd";
import { Layout, Menu, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
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
import axios from "../../libraries/axiosClient";

const { Sider } = Layout;
const initialState = {
  category: "",
  supplier: "",
  productName: "",
  stockStart: "",
  stockEnd: "",
  priceStart: "",
  priceEnd: "",
  discountStart: "",
  discountEnd: "",
};
const allOption = [{ _id: "", name: "----All----" }];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [products, setProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [suppliers, setSuppliers] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<any>(initialState);
  const onChangeFilter = useCallback((e: any) => {
    setFilter((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const callApi = useCallback((searchParams: any) => {
    axios
      .get(`${"/products"}?${searchParams}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const onSearch = useCallback(() => {
    const checkInputData = (input: any, name: any) => {
      if ((input && isNaN(input)) || (input && input < 0)) {
        message.error(`Dữ liệu nhập vào ô ${name} không hợp lệ!`);

        return true;
      }

      return false;
    };
    // Kiểm tra dữ liệu nhập vào từng ô tìm kiếm
    const isInvalidData =
      checkInputData(filter.stockStart, "Tồn kho") ||
      checkInputData(filter.stockEnd, "Tồn kho") ||
      checkInputData(filter.priceStart, "Giá bán") ||
      checkInputData(filter.priceEnd, "Giá bán") ||
      checkInputData(filter.discountStart, "Giảm giá") ||
      checkInputData(filter.discountEnd, "Giảm giá");

    if (isInvalidData) return;
    // Lọc các trường có giá trị để tạo query params
    const filterFields = Object.keys(filter).filter(
      (key) => filter[key] !== undefined && filter[key] !== ""
    );

    // Tạo query params từ các trường đã lọc
    const searchParams = new URLSearchParams(
      filterFields.map((key) => {
        return [key, filter[key]];
      })
    );

    // Gọi API với các query params đã tạo
    callApi(searchParams);
  }, [callApi, filter]);
  React.useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Get categories
  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories([...allOption, ...data.payload]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Get suppliers
  React.useEffect(() => {
    axios
      .get("/suppliers")
      .then((response) => {
        const { data } = response;
        setSuppliers([...allOption, ...data.payload]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const resetFilter = useCallback(() => {
    setFilter(initialState);
    callApi(initialState);
  }, [callApi]);

  return (
      <Layout>
        <Sider
          width={200}
          style={{ height: "300px", background: colorBgContainer }}
        >
          <select
            id="category"
            name="category"
            value={filter.category}
            onChange={onChangeFilter}
          >
            <option value="">{`Category`}</option>
            {categories.length > 0 &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          <select
            id="supplier"
            name="supplier"
            value={filter.supplier}
            onChange={onChangeFilter}
          >
            <option value="">{`Supplier`}</option>
            {suppliers.length > 0 &&
              suppliers.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          <Input
            placeholder="Product name"
            name="productName"
            value={filter.productName}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Lowest stock"
            name="stockStart"
            value={filter.stockStart}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Highest stock"
            name="stockEnd"
            value={filter.stockEnd}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Lowest price"
            name="priceStart"
            value={filter.priceStart}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Highest price"
            name="priceEnd"
            value={filter.priceEnd}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Lowest discount"
            name="discountStart"
            value={filter.discountStart}
            onChange={onChangeFilter}
            allowClear
          />
          <Input
            placeholder="Highest discount"
            name="discountEnd"
            value={filter.discountEnd}
            onChange={onChangeFilter}
            allowClear
          />
          <Button onClick={onSearch}>Search</Button>
          <Button onClick={resetFilter}>Refresh</Button>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
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
        </Layout>
      </Layout>
  );
};

export default App;
=======
import  Styles from "./SideBar.module.css";

const SideBar: React.FC = () => {
//   const { title } = props
  return (
    <header className={`py-3 ps-2 mb-5 ${Styles.width_30} `}>
      <h1>The Pulpit </h1>
    </header>
  );
};

export default SideBar;
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
