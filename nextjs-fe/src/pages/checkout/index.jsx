import React, { memo } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./checkout.module.css";

function CheckOut() {
  return (
    <>
      <div className={styles.container}>
        <CheckCircleOutlined /> Đặt hàng thành công!
        <Button style={{ marginTop: "20px" }} href="/">Trang Chủ</Button>
      </div>
    </>
  );
}
export default memo(CheckOut);
