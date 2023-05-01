import { Card, Carousel, Col, Row } from "antd";
import axios from "../libraries/axiosClient";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const apiName = "/products";

const initialState = {
  category: "",
};

export default function Home() {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  //   const [filter, setFilter] = React.useState<any>(initialState);
  const navigate = useNavigate();

  const onClickFilter = (name: string | undefined) => {
    console.log("name", name);
    navigate("/renderCategory", {
      state: {
        nameCategory: name,
      },
    });
    // call api voi param name
  };

  const [refresh] = React.useState<number>(0);
  React.useEffect(() => {
    axios
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "70%",
  };

  return (
    <>
      <div style={{ margin: "20px 50px 0px 50px", width: "100%" }}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-440c89823337cc1fb4591834c65a0225_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-3a1f19249482dcdac154ea3666bb4076_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-fa79715264f5c973648d8096a8aa9773_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-1a6095f0c892a26625c343726f14ba1f_xxhdpi"
              />
            </h3>
          </div>
        </Carousel>
        <img
          style={{ height: "100%", width: "30%" }}
          src="https://cf.shopee.vn/file/vn-50009109-32bdb495b5f3dbeb18919678a77b01f6_xxhdpi"
        />
      </div>

      <div style={{ border: "1px solid #ccc", margin: "20px 50px 0px 50px" }}>
        <h2 style={{ marginLeft: "10px" }}>Danh Mục</h2>
        <Row>
          {categories.map(
            (item: { _id: string; name: string; img: string }) => {
              return (
                <Col
                  xl={{ span: 3, offset: 1 }}
                  sm={{ span: 12, offset: 2 }}
                  md={{ span: 6, offset: 2 }}
                >
                  <Card
                    onClick={() => {
                      onClickFilter(item?.name);
                    }}
                    hoverable
                    style={{
                      width: "145px",
                      height: "150px",
                      margin: "20px 10px 10px 10px",
                    }}
                    cover={
                      <img
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                        src={item.img}
                      />
                    }
                  >
                    <strong
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {item.name}
                    </strong>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>
      <div style={{ border: "1px solid #ccc", margin: "20px 50px 0px 50px" }}>
        <h2 style={{ marginLeft: "10px" }}>Flash sale</h2>
        <Row>
          {products.map((item: { _id: string; name: string; img: string }) => {
            return (
              <Col
                xl={{ span: 3, offset: 1 }}
                sm={{ span: 12, offset: 2 }}
                md={{ span: 6, offset: 2 }}
              >
                <Card
                  onClick={() => {
                    onClickFilter(item?.name);
                  }}
                  hoverable
                  style={{
                    width: "145px",
                    height: "150px",
                    margin: "20px 10px 10px 10px",
                  }}
                  cover={
                    <img
                      alt=""
                      style={{ width: "100%", height: "100px" }}
                      src={item.img}
                    />
                  }
                >
                  <strong style={{ display: "flex", justifyContent: "center" }}>
                    {item.name}
                  </strong>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
