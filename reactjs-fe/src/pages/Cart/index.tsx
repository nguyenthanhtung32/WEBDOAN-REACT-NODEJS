import { Button, Form, message, Space, Modal, Input, Table } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

const apiName = "/carts";

export default function Cart() {
  const [cart, setCart] = React.useState<any[]>([]);
  const [customers, setCustomers] = React.useState<any[]>([]);

  const [refresh, setRefresh] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [updateId, setUpdateId] = React.useState<number>(0);

  const [deleteOrderId, setOrderId] = React.useState<number>(0);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    React.useState<boolean>(false);

  const [updateForm] = Form.useForm();

  // Hàm hiển thị xác nhận xóa
  const showConfirmDelete = (orderId: number) => {
    setOrderId(orderId);
    setShowDeleteConfirm(true);
  };
  // Hàm xóa sản phẩm
  const handleDeleteProduct = () => {
    axios.delete(apiName + "/" + deleteOrderId).then((response) => {
      setRefresh((f) => f + 1);
      message.success("Xóa sản phẩm thành công!", 1.5);
      setShowDeleteConfirm(false);
    });
  };

  // Modal xác nhận xóa sản phẩm
  const deleteConfirmModal = (
    <Modal
      title="Xóa sản phẩm"
      open={showDeleteConfirm}
      onOk={handleDeleteProduct}
      onCancel={() => setShowDeleteConfirm(false)}
      okText="Xóa"
      cancelText="Hủy"
    >
      <p>Bạn có chắc chắn muốn xóa sản phẩm?</p>
    </Modal>
  );

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      width: "1%",
      align: "right",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer.name",
      key: "customer.name",
      render: (text, record, index) => {
        const fullNameCustomer = `${record.customer.firstName} ${record.customer.lastName}`;
        return <span>{fullNameCustomer}</span>;
      },
    },
    {
      title: "Hành động",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setOpen(true);
                setUpdateId(record._id);
                updateForm.setFieldsValue(record);
              }}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                showConfirmDelete(record._id);
              }}
            />
             <Button
              icon={<EditOutlined />}
              onClick={() => {
                setOpen(true);
                setUpdateId(record._id);
                updateForm.setFieldsValue(record);
              }}
            />
          </Space>
        );
      },
    },
  ];

  // Call api to get data
  React.useEffect(() => {
    axios
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setCart(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  React.useEffect(() => {
    axios
      .get("/customers")
      .then((response) => {
        const { data } = response;
        setCustomers(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onUpdateFinish = (values: any) => {
    axios
      .patch(apiName + "/" + updateId, values)
      .then((response) => {
        setRefresh((f) => f + 1);
        updateForm.resetFields();
        message.success("Cập nhật danh mục thành công!", 1.5);
        setOpen(false);
      })
      .catch((err) => {});
  };

  return (
    <div style={{ padding: 24 }}>
      {/* TABLE */}
      <div>
        <Table rowKey="_id" dataSource={cart} columns={columns} />
        {deleteConfirmModal}
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
          <Form.Item label="Trạng thái" name="status">
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả / Ghi chú" name="description">
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ giao hàng"
            name="shippingAddress"
            required={true}
            rules={[
              {
                required: true,
                message: "Bắt buộc phải nhập địa chỉ giao hàng",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hình thức thanh toán"
            name="paymentType"
            required={true}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
