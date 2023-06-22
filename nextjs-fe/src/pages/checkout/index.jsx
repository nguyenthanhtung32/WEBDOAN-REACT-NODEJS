import React, { memo } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./checkout.module.css";
import { Button } from "antd";

function CheckOut() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <CheckCircleOutlined  className={styles.icon}/> Đặt hàng thành công!
        </div>
        <button className={styles.btn} href="/">
          Trang Chủ
        </button>
      </div>
    </>
  );
}
export default memo(CheckOut);
