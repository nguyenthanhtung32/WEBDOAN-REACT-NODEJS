import React, { memo } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./checkout.module.css";
import { Button } from "antd";

function CheckOut() {
  return (
    <>
      <div className={styles.container}>
        <CheckCircleOutlined /> Đặt hàng thành công!
        <Button style={{marginTop: "20px"}} href="/">Trang Chủ</Button>
      </div>
     
    </>
  );
}
export default memo(CheckOut);
