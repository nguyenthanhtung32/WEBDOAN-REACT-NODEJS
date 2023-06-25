import React, { memo } from "react";
import { useRouter } from "next/router";
import { Input, message } from "antd";
import numeral from "numeral";
import jwt_decode from "jwt-decode";

import styles from "../order/order.module.css";
import axios from "../../libraries/axiosClient";

function Order() {
  const [product, setProduct] = React.useState(null);

  const [shippingAddress, setShippingAddress] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("CASH");
  const [description, setDescription] = React.useState("");

  const router = useRouter();
  const { orderDetails } = router.query;

  React.useEffect(() => {
    if (orderDetails) {
      const parsedOrderDetails = JSON.parse(orderDetails);
      const productData = parsedOrderDetails[0];
      setProduct(productData);
      console.log("productData", productData);
    }
  }, [orderDetails]);

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
    const createDate = new Date();
    const shippedDate = new Date(createDate);
    shippedDate.setDate(createDate.getDate() + 3);

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
        
        {product
          ? (
            <div key={product._id} className={styles.product}>
              <img className={styles.product_images} alt="" src={product.img}>
              </img>
              <div className={styles.product_details}>
                <h2 className={styles.h2}>name :{product.name}</h2>
                <h3 className={styles.h3}>
                  Giá :
                  <span
                    style={{
                      color: "#ff3300",
                      fontWeight: "bold",
                      marginLeft: "5px",
                    }}
                  >
                    {numeral(
                      product.price -
                        (product.price * product.discount * 1) / 100,
                    ).format("0,0")}
                    ₫
                  </span>
                  {product.discount > 0 && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "8px",
                      }}
                    >
                      {numeral(product.price).format("0,0")}₫
                    </span>
                  )}
                </h3>
                <h4 className={styles.h4}>
                  Giảm giá : <span>
                    {numeral(product.discount).format("0,0")}
                  </span>
                  {" "}
                  %
                </h4>

                <div className={styles.about}>
                  <p className={styles.p}>
                    Tồn kho: <span>{product.stock}</span>
                  </p>
                  <p className={styles.p}>
                    Mã sản phẩm: <span>{product.productId}</span>
                  </p>
                </div>
                <p className={styles.p}>số lượng :{product.quantity}</p>
              </div>
            </div>
          )
          : (
            <span>Loading...</span>
          )}

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
