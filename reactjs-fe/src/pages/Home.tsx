import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

export default function Home() {
  return (
    <>
      <h3>Danh Mục</h3>
      <Row gutter={16}>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
           <strong>Điện Thoại</strong>
          </Card>
        </Col>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
           <strong>Thiết Bị Điện Tử</strong>
          </Card>
        </Col>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
            <Meta title="Điện Thoại" />
          </Card>
        </Col>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
            <Meta title="Điện Thoại" />
          </Card>
        </Col>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
            <Meta title="Điện Thoại" />
          </Card>
        </Col>
        <Col span={2}>
          <Card
            hoverable
            style={{ width: 100 }}
            cover={
              <img
                alt="example"
                src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
              />
            }
          >
            <Meta title="Điện Thoại" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
