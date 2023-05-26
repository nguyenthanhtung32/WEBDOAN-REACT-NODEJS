import { Button, Card, Col, Input, message, Row } from "antd";
import axios from "../../libraries/axiosClient";
import React, { useState } from "react";
import { useRouter } from "next/router";
import numeral from "numeral";
import Link from "next/link";

import { getParamsFromObject } from "../../utils";

const apiName = "/products";

const initialState = {
  category: "",
  stockStart: "",
  stockEnd: "",
  priceStart: "",
  priceEnd: "",
  discountStart: "",
  discountEnd: "",
};

export default function Products({ products }) {
  const router = useRouter();
  const nameCategory = router.query.nameCategory;
  console.log("products", products);

  const [filter, setFilter] = useState(initialState);

  // const onClickFilter = (description) => {
  //   router.push("/detail", {
  //     query: {
  //       productDetail: description,
  //     },
  //   });
  // };
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
    // const a = filterFields.map((key) => {
    //   return [key, filter[key]];
    // });
    // const b = ["productName", nameCategory];
    // a.push(b);
    const searchParams = new URLSearchParams(a);

    // Gọi API với các query params đã tạo
    axios
      .get(`${apiName}?${searchParams}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ padding: 24, display: "flex" }}>
      {/* <div>
        <h1>DANH MỤC</h1>
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
          placeholder="Giám giá cao nhất"
          name="discountEnd"
          value={filter.discountEnd}
          onChange={onChangeFilter}
          allowClear
        />
        <Button onClick={onSearch}>
          Tìm Kiếm
        </Button>
      </div> */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        {products.map((item) => (
          <Col
            key={item._id}
            /* xs={24} sm={24} md={12} lg={6} xl={6} */ xs={12}
            sm={9}
            md={6}
            lg={3}
          >
            <Link href={`/products/${item._id}`}>
              <Card
                key={item._id}
                title={item.name}
                bordered={false}
                style={{ width: 300, height: 400 }}
                hoverable
                // onClick={() => {
                //   onClickFilter(item?.description);
                // }}
                cover={
                  <img
                    alt=""
                    style={{ width: "auto", height: 150, marginTop: 20 }}
                    src={item.img}
                  />
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>{item.description}</strong>
                </div>
                <div style={{ display: "flex", color: "#ff3300" }}>
                  <span>
                    Giá: <span>{numeral(item.price).format("0,0")}</span>
                  </span>
                </div>
                <div style={{ display: "flex", color: "#ff3300" }}>
                  <span>
                    Giảm giá:{" "}
                    <span>{numeral(item.discount).format("0,0")}%</span>;
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
  const { nameCategory } = context.query;
  let products = {};

  const searchString = getParamsFromObject({
    category: nameCategory,
  });

  try {
    const response = await axios.get(`${apiName}${searchString}`);
    products = response?.data?.payload || [];

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
