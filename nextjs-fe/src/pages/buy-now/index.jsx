import React, { memo } from "react";
import { Input, message, Select } from "antd";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styles from "../order/order.module.css";

import axios from "../../libraries/axiosClient";

function Order() {

  const router = useRouter();
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("CASH");
  const [description, setDescription] = React.useState("");

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn chưa đăng nhập!", 1.5);
      router.push("/login");
      return;
    }
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    console.log("customerId22", customerId);

    // Lấy dữ liệu từ query orderDetails
    const orderDetails = JSON.parse(router.query.orderDetails);

    const shippedDate = new Date("2023-07-07T00:00:00.000Z");

    const order = {
      createdDate: new Date(),
      shippedDate: shippedDate,
      paymentType: paymentType,
      shippingAddress: shippingAddress,
      status: "WAITING",
      description: description,
      customerId: customerId,
      employeeId: null,
      orderDetails: orderDetails,
    };

    try {
      const response = await axios.post("/orders", order);

      if (response) {
        message.success("Đặt hàng thành công!", 1.5);
        router.push("/checkout");
      } else {
        message.success("Đặt hàng thất bại!", 1.5);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Thanh Toán</h1>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <div className={styles.column_title}>
          <div className={styles.product_image}>Hình Ảnh</div>
          <div className={styles.product_details}>Sản Phẩm</div>
          <div className={styles.product_price}>Giá Tiền</div>
          <div className={styles.product_discount}>Giảm Giá</div>
          <div className={styles.product_quantity}>Số Lượng</div>
          <div className={styles.product_line_price}>Thành Tiền</div>
        </div>
        <Input
          className={styles.chat}
          style={{ marginTop: "10px" }}
          placeholder="Lời nhắn cho người bán"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.payment}>
          Quý khách vui lòng thanh toán khi nhận hàng
        </div>

        <button className={styles.checkout} onClick={() => handleBuyNow()}>
          Đặt hàng
        </button>
      </div>
    </>
  );
}
export default memo(Order);
