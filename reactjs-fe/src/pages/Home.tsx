import { Card, Col, Row } from "antd";
import axios from "../libraries/axiosClient";
import React from "react";
import { useNavigate } from "react-router-dom";

const apiName = "/products";

export default function Home() {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);

  const [refresh] = React.useState<number>(0);

  const navigate = useNavigate();

  const onClickFilter = (_id: any) => {
    console.log("_id", _id);
    navigate("/renderCategory", {
      state: {
        nameCategory: _id,
      },
    });
    // call api voi param name
  };

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

  return (
    <>
      <div
        style={{
          border: "0.5px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
          backgroundColor: "#e6f2ff",
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
                      onClickFilter(item._id);
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
                    <strong
                    //   style={{ display: "flex", justifyContent: "center" , width : 'auto'}}
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

      <div
        style={{
          border: "1px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
          backgroundColor: "#e6f2ff",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>Flash Sale</h2>
        <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map(
            (item: {
              _id: string;
              name: string;
              img: string;
              discount: number;
            }) => {
              if (item.discount > 0) {
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
              }
            }
          )}
        </Row>
      </div>
    </>
  );
}
