import { Button, Card, Form, Input, InputNumber, message, Modal } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
// import Styles from "./index.module.css";
// import { useNavigate } from "react-router-dom";

import numeral from "numeral";
import { useLocation } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const apiName = "/products";

export default function Products() {
//   const navigate = useNavigate();
  const location = useLocation();
  const productDetail = location.state.productDetail;

  const [products, setProducts] = React.useState<any[]>([]);

  const [updateForm] = Form.useForm();

  const [open, setOpen] = React.useState<boolean>(false);
  const [updateId, setUpdateId] = React.useState<number>(0);
  const [refresh, setRefresh] = React.useState<number>(0);

  React.useEffect(() => {
    if (!productDetail) return;

    axios
      .get(`${apiName}?description=${productDetail}`)
      .then((response) => {
        const { data } = response;

        // Lọc ra sản phẩm có description trùng với productDetail
        const filteredProducts = data.payload.filter(
          (product: any) => product.description === productDetail
        );

        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh, productDetail]);

  React.useEffect(() => {
    axios
      .get(`${apiName}?description=${productDetail}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh, productDetail]);

  const onUpdateFinish = (values: any) => {
    axios
      .patch(apiName + "/" + updateId, values)
      .then((response) => {
        setRefresh((f) => f + 1);
        updateForm.resetFields();
        message.success("Cập nhật thành công!", 1.5);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ padding: 24, display: "flex" }}>
      <div style={{ marginLeft: "24px", flex: "1", display: "flex" }}>
        {products.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            style={{ width: 300, margin: "12px" }}
            hoverable
          >
            <img alt="" style={{ width: "auto", height: 150 }} src={item.img} />
            <div style={{ display: "flex" }}>
              <span>{item.description}</span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Giá: <span>{numeral(item.price).format("0,0")}</span>
              </span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Giảm giá: <span>{numeral(item.discount).format("0,0")}%</span>
              </span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Tồn kho: <span>{numeral(item.stock).format("0,0")}</span>
              </span>
            </div>
            <div style={{ marginTop: 10 }}>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setOpen(true);
                  setUpdateId(item.id);
                  updateForm.setFieldsValue(item);
                }}
              />
            </div>
          </Card>
        ))}
      </div>
      
      <Modal
        open={open}
        title="Cập nhật danh mục"
        onCancel={() => {
          setOpen(false);
        }}
        cancelText="Đóng"
        okText="Lưu thông tin"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="update-form"
          onFinish={onUpdateFinish}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            hasFeedback
            required={true}
            rules={[
              {
                required: true,
                message: "Tên sản phẩm bắt buộc phải nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả/ Ghi chú" name="description" hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá bán"
            name="price"
            hasFeedback
            required={true}
            rules={[
              {
                required: true,
                message: "Giá bán bắt buộc phải nhập",
              },
            ]}
          >
            <InputNumber style={{ width: 200 }} />
          </Form.Item>

          <Form.Item label="Giảm giá" name="discount" hasFeedback>
            <InputNumber style={{ width: 200 }} />
          </Form.Item>

          <Form.Item label="Tồn kho" name="stock" hasFeedback>
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}