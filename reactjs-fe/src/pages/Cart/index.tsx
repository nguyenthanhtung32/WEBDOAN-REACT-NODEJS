import {
  Button,
  Form,
  message,
  Modal,
  Space,
  Table,
} from "antd";
import axios from "../../libraries/axiosClient";
import React, { useCallback } from "react";
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

  const [updateForm] = Form.useForm();

  const callApi = useCallback((searchParams: any) => {
    axios
      .get(`${apiName}?${searchParams}`)
      .then((response) => {
        const { data } = response;
        setCart(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
        return <span>{record.customer.name}</span>;
      },
    },
    {
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setOpen(true);
                setUpdateId(record.id);
                updateForm.setFieldsValue(record);
              }}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                
              }}
            />
          </Space>
        );
      },
    },
  ];

  // Get products
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

        <Table
          rowKey="id"
          dataSource={cart}
          columns={columns}  
        />
    </div>
  );
}
