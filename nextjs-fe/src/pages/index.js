import React, { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import numeral from "numeral";
import { Card, Carousel, Col, Row, Pagination } from "antd";

import axios from "../libraries/axiosClient";
import styles from "@/styles/Home.module.css";

const apiName = "/products";

function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [refresh] = React.useState(0);
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 6;
  const totalProduct = products.filter((item) => item.discount > 0).length;
  const totalPages = Math.ceil(totalProduct / pageSize);

  const onClickFilter = (_id) => {
    router.push({
      pathname: "/products",
      query: {
        _id: _id,
      },
    });
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
  }, [refresh]);

  return (
    <>
      <div>
        <div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Carousel autoplay>
            <div>
              <h3>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-440c89823337cc1fb4591834c65a0225_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-3a1f19249482dcdac154ea3666bb4076_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-fa79715264f5c973648d8096a8aa9773_xxhdpi"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src="https://cf.shopee.vn/file/vn-50009109-1a6095f0c892a26625c343726f14ba1f_xxhdpi"
                />
              </h3>
            </div>
          </Carousel>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            background: "white",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>Danh Mục</h2>
          <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
            {categories.map((item) => {
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
                      border: "1px solid #ccc",
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

        <div
          style={{
            border: "1px solid #ccc",
            margin: "20px 50px 0px 50px",
            padding: "10px",
            background: "white",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>
            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/fb1088de81e42c4e538967ec12cb5caa.png"></img>
          </h2>
          <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
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
                  <Link href={`/products/${item._id}`}>
                    <Card
                      style={{ height: "100%", border: "1px solid #ccc" }}
                      hoverable
                      cover={
                        <img
                          alt=""
                          style={{
                            width: "100%",
                            height: "100px",
                            margin: "10px 0 10px 0",
                            objectFit: "contain",
                          }}
                          src={item.img}
                        />
                      }
                    >
                      <div
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <strong>{item.name}</strong>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: "10px",
                        }}
                      >
                        <span style={{ color: "#ff3300", fontWeight: "bold" }}>
                          {numeral(
                            item.price - (item.price * item.discount * 1) / 100
                          ).format("0,0")}
                          ₫
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
                        <div className={styles.off_info}>
                          <div className={styles.giam}>
                            <h2 className={styles.sm_title}>
                              Giảm {item.discount}%
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
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

      <section className={styles.contact}>
        <div className={`${styles.contact} ${styles.container}`}>
          <div class="map">
            <iframe
              className={styles.iframe}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d904.6861084836736!2d108.22204402373808!3d16.069331231775447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ca4f97c919%3A0x24a85e2091f793fc!2zVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIFThur8gLSBTb2Z0ZWNoIEFwdGVjaCAtIMSQw6BvIFThuqFvIE3hu7kgVGh14bqtdCDEkGEgUGjGsMahbmcgVGnhu4duIFF14buRYyBU4bq_IC0gU29mdGVjaCBBcmVuYQ!5e0!3m2!1svi!2s!4v1685118183538!5m2!1svi!2s"
              width="100%"
              height="450"
            ></iframe>
          </div>
          <form action="https://formspree.io/f/xzbowpjq" method="POST">
            <div className={styles.form}>
              <div className={styles.form_txt}>
                <h2>Thông tin</h2>
                <h1>Liên hệ với chúng tôi</h1>
                <span>
                  Như bạn có thể mong đợi của một công ty, chúng tôi chú trọng
                  đến việc chăm sóc và quản lý chặt chẽ.
                </span>
                <h3>Nguyễn Thanh Tùng</h3>
                <p>
                  Đà Nẵng<br></br>+84 905875294
                </p>
                <h3>Phan Thị Hoàng Vinh</h3>
                <p>
                  Quảng Nam.<br></br>+84 906428501
                </p>
              </div>
              <div class={styles.form_details}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  style={{ marginRight: "15px" }}
                ></input>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                ></input>
                <textarea
                  name="message"
                  id="message"
                  cols="52"
                  rows="7"
                  placeholder="Message"
                  required
                ></textarea>
                <button>SEND MESSAGE</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default memo(Home);
