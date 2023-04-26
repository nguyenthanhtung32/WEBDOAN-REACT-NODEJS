import { Table } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";

import type { ColumnsType } from "antd/es/table";
import moment from "moment";

const apiName = "/carts";

export default function Cart() {
  const [cart, setCart] = React.useState<any[]>([]);

  const [refresh, setRefresh] = React.useState<number>(0);

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

  return (
    <div style={{ padding: 24 }}>
      {/* TABLE */}
      <Table rowKey="_id" dataSource={cart} columns={columns} />
    </div>
  );
}