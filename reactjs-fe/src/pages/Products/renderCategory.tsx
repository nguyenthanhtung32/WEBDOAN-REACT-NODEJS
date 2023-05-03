import { Button, Card, Input, message } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";

import numeral from "numeral";
import { useLocation } from "react-router-dom";

const apiName = "/products";

const initialState = {
  stockStart: "",
  stockEnd: "",
  priceStart: "",
  priceEnd: "",
  discountStart: "",
  discountEnd: "",
};

export default function Products() {
  const [products, setProducts] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const nameCategory = location?.state?.nameCategory;

  const [filter, setFilter] = React.useState<any>(initialState);

  const onClickFilter = (description: string | undefined) => {
    console.log("description", description);
    navigate("/detail", {
      state: {
        productDetail: description,
      },
    });
  };
  const onChangeFilter = (e: any) => {
    setFilter((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const callApi = (searchParams: any) => {
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

  const onSearch = () => {
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
    const a = filterFields.map((key) => {
      return [key, filter[key]];
    });
    const b = ["productName", nameCategory];
    a.push(b);
    const searchParams = new URLSearchParams(a);

    // Gọi API với các query params đã tạo
    callApi(searchParams);
  };

  React.useEffect(() => {
    axios
      .get(`${apiName}?productName=${nameCategory}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [nameCategory]);
  return (
    <div style={{ padding: 24, display: "flex" }}>
      <div className={Styles.filter}>
        <h1 className={Styles.h1}>DANH MỤC</h1>
        <Input
          placeholder="Tồn kho thấp nhất"
          name="stockStart"
          value={filter.stockStart}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Input
          placeholder="Tồn kho cao nhất"
          name="stockEnd"
          value={filter.stockEnd}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Input
          placeholder="Giá thấp nhất"
          name="priceStart"
          value={filter.priceStart}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Input
          placeholder="Giá cao nhất"
          name="priceEnd"
          value={filter.priceEnd}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Input
          placeholder="Giảm giá thấp nhất"
          name="discountStart"
          value={filter.discountStart}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Input
          placeholder="Giám giá cao nhất"
          name="discountEnd"
          value={filter.discountEnd}
          onChange={onChangeFilter}
          className={Styles.input}
          allowClear
        />
        <Button className={Styles.button} onClick={onSearch}>
          Tìm Kiếm
        </Button>
      </div>
      <div style={{ marginLeft: "24px", flex: "1", display: "flex" }}>
        {products.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            style={{ width: 300, margin: "12px" }}
            hoverable
            onClick={() => {
              onClickFilter(item?.description);
            }}
          >
            <img alt="" style={{ width: "auto", height: 150 }} src={item.img} />
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
                Giảm giá: <span>{numeral(item.discount).format("0,0")}%</span>;
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
