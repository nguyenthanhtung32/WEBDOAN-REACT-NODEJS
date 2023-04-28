import React from "react";
import { Card, Col, Row } from "antd";
import styles from "./Home.module.css";

const { Meta } = Card;

const flashSaleProducts = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg",
    originalPrice: 100,
    salePrice: 50,
  },
  {
    id: 2,
    name: "Product 2",
    image:
      "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg",
    originalPrice: 200,
    salePrice: 100,
  },
  {
    id: 3,
    name: "Product 3",
    image:
      "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg",
    originalPrice: 300,
    salePrice: 150,
  },
];

export default function Home() {
  return (
    <>
      <div className={styles.category_wrapper}>
        <h1>Danh Mục</h1>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 1"
          ></img>
          <h2>Category 1</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 2"
          ></img>
          <h2>Category 2</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 3"
          ></img>
          <h2>Category 3</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 4"
          ></img>
          <h2>Category 4</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 5"
          ></img>
          <h2>Category 5</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 6"
          ></img>
          <h2>Category 6</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 7"
          ></img>
          <h2>Category 7</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 8"
          ></img>
          <h2>Category 8</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 9"
          ></img>
          <h2>Category 9</h2>
        </div>
        <div className={styles.category}>
          <img
            src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
            alt="Category 10"
          ></img>
          <h2>Category 10</h2>
        </div>
      </div>
      <div className={styles.flash_sale_wrapper}>
        <h1>Flash sale</h1>
        <Row gutter={[16, 16]}>
          {flashSaleProducts.map((product) => (
            <Col span={8} key={product.id}>
              <Card
                style={{ textAlign: "center", width: "200px", marginBottom: "10px" }}
                cover={<img alt={product.name} src={product.image} />}
              >
                <Meta
                  title={product.name}
                  description={
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "16px",
                        }}
                      >
                        {product.originalPrice}đ
                      </span>
                      <span style={{ color: "red" }}>{product.salePrice}đ</span>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
