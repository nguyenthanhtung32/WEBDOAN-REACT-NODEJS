import React, { memo } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./checkout.module.css";
import Link from "next/link";

function CheckOut() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <CheckCircleOutlined className={styles.icon} /> Đặt hàng thành công!
        </div>
        <Link href="/">
          <button className={styles.btn}>Trang Chủ</button>
        </Link>
      </div>
    </>
  );
}
export default memo(CheckOut);
