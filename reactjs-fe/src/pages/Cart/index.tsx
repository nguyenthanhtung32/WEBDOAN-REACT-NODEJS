import { Button, message, Modal, Space, Table } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const apiName = "/carts";

export default function Cart() {
  const [cart, setCart] = React.useState<any[]>([]);
  const [customers, setCustomers] = React.useState<any[]>([]);

  const [refresh, setRefresh] = React.useState<number>(0);

  const [deleteCartId, setCartId] = React.useState<number>(0);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    React.useState<boolean>(false);
  const [selectedCartId, setSelectedCartId] = React.useState<number>(0);

  const navigate = useNavigate();

  const cartDetails = (cartId: any) => {
    setSelectedCartId(cartId); // Lưu Id của cart vào state selectedCartId
    navigate("/details-cart/" + cartId); // Chuyển hướng sang trang CartDetails
  };

  // Hàm hiển thị xác nhận xóa
  const showConfirmDelete = (CartId: number) => {
    setCartId(CartId);
    setShowDeleteConfirm(true);
  };
  // Hàm xóa sản phẩm
  const handleDeleteCart = () => {
    axios.delete(apiName + "/" + deleteCartId).then((response) => {
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
      onOk={handleDeleteCart}
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
        return <strong>{fullNameCustomer}</strong>;
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "cartDetails",
      key: "cartDetails",
      render: (cartDetails, record, index) => {
        return (
          <strong>
            {cartDetails.map((product: any) => product.productId).join(", ")}
          </strong>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "cartDetails",
      key: "quantity",
      render: (cartDetails, record, index) => {
        //const quantity = {cartDetails.reduce((product: any) => product.quantity)}.join(", ");
        return (
          <strong>
            {cartDetails.map((product: any) => product.quantity).join(", ")}
          </strong>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record, index) => {
        const createdDate = moment(text).format("DD/MM/YYYY");
        return <span>{createdDate}</span>;
      },
    },
    {
      title: "Hành động",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                showConfirmDelete(record._id);
              }}
            />
            <Button
              disabled={!record.cartDetails.length}
              onClick={() => {
                cartDetails(record._id);
              }}
            >
              Chi tiết giỏ hàng
            </Button>
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

  return (
    <div style={{ padding: 24 }}>
      {/* TABLE */}
      <Table rowKey="_id" dataSource={cart} columns={columns} />
      {deleteConfirmModal}
    </div>
  );
}
