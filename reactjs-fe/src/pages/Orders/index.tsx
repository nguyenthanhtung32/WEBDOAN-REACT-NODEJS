import {
  Button,
  Form,
  message,
  Space,
  Modal,
  Input,
  Table,
  Select,
} from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

const apiName = "/orders";

export default function Orders() {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [employees, setEmployees] = React.useState([]);
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
  const handleDeleteOrders = () => {
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
      onOk={handleDeleteOrders}
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
      title: "Tên nhân viên",
      dataIndex: "employees.name",
      key: "employees.name",
      render: (text, record, index) => {
        const fullNameEmployee = `${record?.employee?.firstName} ${record?.employee?.lastName}`;
        return <span>{fullNameEmployee}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return <strong style={{ color: "#6c5ce7" }}>{text}</strong>;
      },
    },
    {
      title: "Mô tả / Ghi chú",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (_text, record) => {
        return (
          <span>
            Quantity: {record.orderDetails[0].quantity}
            <br />
            Product: {record.orderDetails[0].productId}
          </span>
        );
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
              danger
              icon={<DownCircleOutlined />}
              onClick={() => {
                setOpen(true);
                // setUpdateId(record._id);
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
        setOrders(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  React.useEffect(() => {
    axios
      .get("/employees")
      .then((response) => {
        const { data } = response;
        setEmployees(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("/customers")
      .then((response) => {
        const { data } = response;
        setCustomers(data);
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
        <Table rowKey="_id" dataSource={orders} columns={columns} />
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
          <Form.Item label="Status" name="status">
            <Select style={{ width: "80%" }}>
              <Select.Option value="WAITING">WAITING</Select.Option>
              <Select.Option value="COMPLETED">COMPLETED</Select.Option>
              <Select.Option value="CANCELED">CANCELED</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
              label="Nhà cung cấp"
              name="employeeId"
              hasFeedback
            //   required={true}
            //   rules={[
            //     {
            //       required: true,
            //       message: "Nhà cung cấp bắt buộc phải chọn",
            //     },
            //   ]}
            >
              <Select
                style={{ width: "100%" }}
                options={employees.map((c : any) => {
                  return { value: c._id, label: c.firstName };
                })}
              />
            </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
