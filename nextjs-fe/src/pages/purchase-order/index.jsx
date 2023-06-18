import React, { useState, useEffect } from "react";
import axios from "../../libraries/axiosClient";
import jwt_decode from "jwt-decode";
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
    <div className="d-flex">
      {orders?.length === 0
        ? (
          <div>Bạn chưa từng mua hàng</div>
        )
        : (
          orders.map((order) => (
           
            <div key={order._id} className={styles.order}>
              <p className={styles.order__title}>{order.createdDate}</p>
              <p className={styles.order__status}>{order.status}</p>
              <p className={styles.order__quantity}>{order.shippedDate}</p>
              <p className={styles.order__quantity}>{order.description}</p>
              <p className={styles.order__quantity}>{order.shippingAddress}</p>
              <p className={styles.order__quantity}>{order.paymentType}</p>

              {order?.orderDetails?.length > 0
                ? (
                  <div>
                    {order.orderDetails.map((product) => (
                      <div key={product.productId}>
                        <p>name :{product.product.name}</p>
                        <img
                          alt=""
                          src={product.product.img}
                          width="50px"
                          height="50px"
                        />
                        <p>Quantity: {product.quantity}</p>
                        <p>discount: {product.discount}</p>
                        <p>Gía đã discount: {product.price}</p>
                        <p>Gía gốc: {product.product.price}</p>
                      </div>
                    ))}
                  </div>
                )
                : (
                  <div>Không có thông tin sản phẩm</div>
                )}
            </div>
          ))
        )}
    </div>
  );
};

export default PurchaseOrder;
