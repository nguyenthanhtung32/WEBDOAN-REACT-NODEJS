import { Button, Card, Col, Input, message, Row } from "antd";
import axios from "../../libraries/axiosClient";
import React, { useState } from "react";
import { useRouter } from "next/router";
import numeral from "numeral";
import Link from "next/link";

import { getParamsFromObject } from "../../utils";

const apiName = "/products";

const initialState = {
  stockStart: "",
  stockEnd: "",
  priceStart: "",
  priceEnd: "",
  discountStart: "",
  discountEnd: "",
};

export default function Products({ products: initialProducts }) {
  const router = useRouter();
  const nameCategory = router.query.nameCategory;
  const stockStart = router.query.stockStart;

  const [filter, setFilter] = useState(initialState);
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState(nameCategory);
  const [stock, setStock] = useState(stockStart);

  const onChangeFilter = (e) => {
    setFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSearch = () => {
    const checkInputData = (input, name) => {
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
    const a = filterFields.map((key) => {
      return [key, filter[key]];
    });

    a.push(['category', nameCategory]);

    // Thêm trường tên danh mục vào query params
    const searchParams = new URLSearchParams();
    a.forEach(([key, value]) => {
      if (key === "category") {
        searchParams.append(key, category);
      } else {
        searchParams.append(key, value);
      }
    });

    console.log('searchParams', searchParams.toString());

    const queryString = searchParams.toString();

    // Gọi API với các query params đã tạo
    axios
      .get(`${apiName}?${queryString}`)
      .then((response) => {
        const { data } = response;
        console.log('response', response);
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ padding: 24, display: "flex" }}>
      <div>
        <h1>Tìm Kiếm</h1>
        <Input
          placeholder="Tồn kho thấp nhất"
          name="stockStart"
          value={filter.stockStart}
          onChange={onChangeFilter}
          allowClear
        />
        <Input
          placeholder="Tồn kho cao nhất"
          name="stockEnd"
          value={filter.stockEnd}
          onChange={onChangeFilter}
          allowClear
        />
        <Input
          placeholder="Giá thấp nhất"
          name="priceStart"
          value={filter.priceStart}
          onChange={onChangeFilter}
          allowClear
        />
        <Input
          placeholder="Giá cao nhất"
          name="priceEnd"
          value={filter.priceEnd}
          onChange={onChangeFilter}
          allowClear
        />
        <Input
          placeholder="Giảm giá thấp nhất"
          name="discountStart"
          value={filter.discountStart}
          onChange={onChangeFilter}
          allowClear
        />
        <Input
          placeholder="Giâm giá cao nhất"
          name="discountEnd"
          value={filter.discountEnd}
          onChange={onChangeFilter}
          allowClear
        />
        <Button onClick={onSearch}>Tìm Kiếm</Button>
      </div>
      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "24px",
          width: "1000px",
        }}
      >
        {products.map((item) => (
          <Col
            key={item._id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            style={{ marginBottom: "24px" }}
          >
            <Link href={`/products/${item._id}`}>
              <Card
                key={item._id}
                title={item.name}
                bordered={false}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                }}
                hoverable
                cover={
                  <img
                    alt=""
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                    src={item.img}
                  />
                }
              >
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginBottom: "16px",
                    }}
                  >
                    {item.description}
                  </div>
                  <div style={{ color: "#ff3300", marginLeft: "0" }}>
                    <span>
                      {numeral(item.price - item.discount).format("0,0")}₫
                    </span>
                    {item.discount > 0 && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginLeft: "8px",
                        }}
                      >
                        {numeral(item.price).format("0,0")}₫
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <span
                    style={{
                      backgroundColor: "#ff3300",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Mua ngay
                  </span>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { nameCategory,queryString } = context.query;
  let products = {};

  const searchString = getParamsFromObject({
    category: nameCategory,
    queryString : queryString,
  });

  try {
    const response = await axios.get(`${apiName}${searchString}`);
    products = response.data.payload || null;
    return {
      props: {
        products,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
