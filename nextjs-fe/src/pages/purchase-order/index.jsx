import React, { useState, useEffect } from "react";
import axios from "../../libraries/axiosClient";
import jwt_decode from "jwt-decode";
import numeral from "numeral";
import styles from "./purchase-order.module.css";

const PurchaseOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    axios
      .get(`/orders/${customerId}`)
      .then((response) => {
        const { data } = response;
        setOrders(data.payload.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      {orders?.length === 0 ? (
        <div>Bạn chưa từng mua hàng</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.order}>
            <div className={styles.status}>
              <div className={styles.title}>Trạng Thái Đơn Hàng</div>
              <div className={styles.value}>{order.status}</div>
            </div>
            <div className={styles.status}>
              <div className={styles.title}>Địa Chỉ Giao Hàng</div>
              <div className={styles.value}>{order.shippingAddress}</div>
            </div>
            {order.orderDetails.length > 0 ? (
              <div>
                {order.orderDetails.map((product) => (
                  <div className={styles.product} key={product.productId}>
                    <div className={styles.product_left}>
                      <img
                        alt=""
                        src={product.product.img}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className={styles.product_right}>
                      <div className={styles.product_top}>
                        {product.product.name}
                      </div>
                      <div className={styles.product_center}>
                        <div className={styles.product_description}>
                          {product.product.description}
                        </div>
                        <div className={styles.product_quantity}>
                          x{product.quantity}
                        </div>
                      </div>
                      <div className={styles.product_bottom}>
                        <div className={styles.price}>
                          {" "}
                          đ{numeral(product.product.price).format("0,0")}
                        </div>
                        <div className={styles.priceDiscount}>
                          đ{numeral(product.price).format("0,0")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>Không có thông tin sản phẩm</div>
            )}
            <div className={styles.status}>
              <div className={styles.title}>Phương Thức Thanh Toán</div>
              <div className={styles.value}>{order.paymentType}</div>
            </div>
            <div className={styles.status}>
              <div className={styles.title}>Thời Gian Đặt Hàng</div>
              <div className={styles.value}>{order.createdDate}</div>
            </div>
            <div className={styles.status}>
              <div className={styles.title}>Thời Gian Hoàn Thành</div>
              <div className={styles.value}>{order.shippedDate}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseOrder;
