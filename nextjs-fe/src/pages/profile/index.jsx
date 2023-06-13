import React, { memo } from "react";
import jwt_decode from "jwt-decode";

import axios from "../../libraries/axiosClient";

function Profile() {
  const [customer, setCustomer] = React.useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    axios
      .get(`/customers/${customerId}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {customer
        ? (
          <div key={customer._id}>
            <h1>Thông tin cá nhân</h1>
            <p>Họ và tên: {customer.firstName} {customer.lastName}</p>
            <p>Email: {customer.email}</p>
            <p>Ngày sinh: {formatDate(customer.birthday)}</p>
            <p>Số điện thoại: {customer.phoneNumber}</p>
            <p>Địa chỉ: {customer.address}</p>
            <p>Ngày tạo tài khoản: {formatDate(customer.createdAt)}</p>
            <p>Ngày sửa thông tin gần nhất: {formatDate(customer.updatedAt)}</p>
          </div>
        )
        : (<div>Loading...</div>)}
    </>
  );
}

export default memo(Profile);
