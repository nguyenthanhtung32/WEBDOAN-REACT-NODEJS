import { Card, Carousel, Col, Row } from "antd";
import axios from "../libraries/axiosClient";
import React from "react";
import { useNavigate } from "react-router-dom";

const apiName = "/products";

export default function Home() {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
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
    height: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div
        style={{
          margin: "20px auto",
          width: "94%",
          height: "100%",
          textAlign: "center",
        }}
      >
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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img
            style={{ height: "100%", width: "30%" }}
            src="https://cf.shopee.vn/file/vn-50009109-32bdb495b5f3dbeb18919678a77b01f6_xxhdpi"
          />
          <img
            style={{ height: "100%", width: "30%" }}
            src="https://cf.shopee.vn/file/vn-50009109-d02dfb0938956b674846428074581299_xhdpi"
          />
        </div>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>Danh Mục</h2>
        <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
          {categories.map(
            (item: { _id: string; name: string; img: string }) => {
              return (
                <Col
                  key={item._id}
                  xs={12}
                  sm={9}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "16px" }}
                >
                  <Card
                    onClick={() => {
                      onClickFilter(item?.name);
                    }}
                    hoverable
                    style={{
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      transform: "scale(0.8)",
                    }}
                    cover={
                      <img
                        alt=""
                        style={{
                          width: "100%",
                          height: "100px",
                          margin: "10px 0 10px 0",
                        }}
                        src={item.img}
                      />
                    }
                  >
                    <strong>{item.name}</strong>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>Flash Sale</h2>
        <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((item: { _id: string; name: string; img: string }) => {
            return (
              <Col
                key={item._id}
                xs={12}
                sm={9}
                md={6}
                lg={3}
                style={{ marginBottom: "16px" }}
              >
                <Card
                  onClick={() => {
                    onClickFilter(item?.name);
                  }}
                  hoverable
                  style={{
                    height: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "scale(0.8)",
                  }}
                  cover={
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "100px",
                        margin: "10px 0 10px 0",
                      }}
                      src={item.img}
                    />
                  }
                >
                  <strong>{item.name}</strong>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
