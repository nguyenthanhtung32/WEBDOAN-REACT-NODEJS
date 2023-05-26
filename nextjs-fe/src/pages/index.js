import { Card, Carousel, Col, Row, Pagination } from "antd";
import axios from "../libraries/axiosClient";
import React from "react";
import { useRouter } from "next/router";
import numeral from "numeral";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const apiName = "/products";

export default function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [refresh] = React.useState(0);
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 6;
  const totalProduct = products.filter((item) => item.discount > 0).length;
  const totalPages = Math.ceil(totalProduct / pageSize);

  // const navigate = useNavigate();

  const onClickFilter = (_id) => {
    console.log("_id", _id);
    router.push({
      pathname: "/products",
      query: {
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

  // const contentStyle: CSSProperties: any = {
  //   height: "200px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };

  return (
    <>
      <Header />
      <div>
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
              <h3 /* style={contentStyle} */>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-440c89823337cc1fb4591834c65a0225_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3 /* style={contentStyle} */>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-3a1f19249482dcdac154ea3666bb4076_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3 /* style={contentStyle} */>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-fa79715264f5c973648d8096a8aa9773_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3 /* style={contentStyle} */>
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
            <img
              style={{ height: "100%", width: "30%" }}
              src="https://cf.shopee.vn/file/vn-50009109-c621578f239c62ce7917370f5d077bbb_xhdpi"
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
              (item) => {
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
          <h2 style={{ marginLeft: "10px" }}>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/fb1088de81e42c4e538967ec12cb5caa.png"></img>
          </h2>
          <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap"}}>
            {products
              .filter((item) => item.discount > 0)
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <Col
                  key={item._id}
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  style={{ marginBottom: "16px" }}
                >
                  <Card
                  style={{height: "100%"}}
                    onClick={() => {
                      onClickFilter(item?.name);
                    }}
                    hoverable
                    cover={
                      <img
                        alt=""
                        style={{
                          width: "100%",
                          height: "100px",
                          margin: "10px 0 10px 0",
                          objectFit: "contain"
                        }}
                        src={item.img}
                      />
                    }
                  >
                    <div style={{ textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <strong>{item.name}</strong>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      <span style={{ color: "#ff3300", fontWeight: "bold" }}>
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
                  </Card>
                </Col>
              ))}
          </Row>
          {totalPages > 1 && (
            <Pagination
              style={{ marginTop: "16px", textAlign: "center" }}
              current={currentPage}
              pageSize={pageSize}
              total={totalProduct}
              onChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
