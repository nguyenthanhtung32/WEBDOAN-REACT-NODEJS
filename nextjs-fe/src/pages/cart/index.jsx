// import React, { memo } from "react";
// import { Button, Card, Col, message } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import numeral from "numeral";
// import { useRouter } from "next/router";
// import jwt_decode from "jwt-decode";
// import styles from "./cart.module.css";

// import axios from "../../libraries/axiosClient";

// function Cart() {
//   const router = useRouter();
//   const [carts, setCarts] = React.useState([]);
//   const [selectedProducts, setSelectedProducts] = React.useState([]);

//   React.useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const decoded = jwt_decode(token);
//         const customerId = decoded._id;

//         const response = await axios.get(`/carts/${customerId}`);

//         const data = response.data;

//         setCarts(data.payload.results);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchCart();
//   }, [router]);

//   const handleQuantityChange = async (productId, action) => {
//     try {
//       const newCarts = [...carts];
//       const cartIndex = newCarts.findIndex((cart) =>
//         cart.products.some((product) => product.productId === productId)
//       );
//       const productIndex = newCarts[cartIndex].products.findIndex(
//         (product) => product.productId === productId,
//       );
//       let newQuantity = newCarts[cartIndex].products[productIndex].quantity;

//       if (action === "increase") {
//         // Increase quantity
//         newQuantity += 1;
//       } else if (action === "decrease") {
//         // Decrease quantity
//         newQuantity -= 1;

//         if (newQuantity < 1) {
//           // Remove product from cart if quantity is less than 1
//           newCarts[cartIndex].products.splice(productIndex, 1);
//         }
//       }

//       newCarts[cartIndex].products[productIndex].quantity = newQuantity;

//       setCarts(newCarts);

//       const token = localStorage.getItem("token");
//       const decoded = jwt_decode(token);
//       const customerId = decoded._id;

//       await axios.put(`/carts/${customerId}`, {
//         productId,
//         quantity: newQuantity,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRemoveCart = async (productId) => {
//     if (
//       window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
//     ) {
//       try {
//         const newCarts = [...carts];
//         const cartIndex = newCarts.findIndex((cart) =>
//           cart.products.some((product) => product.productId === productId)
//         );
//         const productIndex = newCarts[cartIndex].products.findIndex(
//           (product) => product.productId === productId,
//         );

//         newCarts[cartIndex].products.splice(productIndex, 1);

//         setCarts(newCarts);
//         const token = localStorage.getItem("token");
//         const decoded = jwt_decode(token);
//         const customerId = decoded._id;

//         await axios.delete(`/carts/${customerId}/${productId}`);
//         message.success("xóa thành công!", 1.5);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const handleAddOrder = async () => {
//     const token = localStorage.getItem("token");
//     const decoded = jwt_decode(token);
//     const customerId = decoded._id;
//     console.log("customerId", customerId);

//     const orderDetails = carts[0].products.map((p) => {
//       return {
//         productId: p.product._id,
//         quantity: p.quantity,
//         price: p.product.price - (p.product.price * p.product.discount / 100),
//         discount: p.product.discount,
//       };
//     });

//     const shippedDate = new Date("2023-07-07T00:00:00.000Z");

//     const order = {
//       createdDate: new Date(),
//       shippedDate: shippedDate,
//       paymentType: "CASH",
//       shippingAddress: "38 Yên Bái - Đà Nẵng",
//       status: "WAITING",
//       description: "Hàng dễ vỡ xin nhẹ tay ",
//       customerId: customerId,
//       employeeId : "64571f01c7efda89297503e8",
//       orderDetails: orderDetails,
//     };

//     console.log("order", order);
//     try {
//       // const response = await fetch(`/orders`, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(order),
//       // });
//       const response = await axios.post("/orders", order);
//       console.log("response", response);

//       if (response) {
//         alert("Đặt hàng thành công!");
//         // localStorage.removeItem("cart");
//         await axios.delete(`/carts/${customerId}`);
//         window.location.href = "/checkout";
//       } else {
//         throw new Error("Đặt hàng thất bại!");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleProductSelection = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(
//         selectedProducts.filter((item) => item !== productId),
//       );
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.row}>
//         <Col
//           xs={24}
//           //   sm={4}
//           //   md={2}
//           lg={16}
//           className={styles.col}
//         >
//           <Card title="Giỏ hàng">
//             {carts.length > 0 &&
//               carts.map((cart) => (
//                 <div className={styles.cart_list} key={cart._id}>
//                   {cart.products.map((product) => (
//                     <div className={styles.cart_item} key={product.productId}>
//                       <div className={styles.cart_item_checkbox}>
//                         <input
//                           type="checkbox"
//                           checked={selectedProducts.includes(product.productId)}
//                           onChange={() =>
//                             handleProductSelection(product.productId)}
//                         />
//                       </div>
//                       <img
//                         alt=""
//                         src={product.product.img}
//                         className={styles.cart_item_image}
//                       />
//                       <div className={styles.cart_item_details}>
//                         <p className={styles.cart_item_name}>
//                           {product.product.name}
//                         </p>
//                         <div className={styles.cart_item_quantity}>
//                           <div className={styles.quantity_btn}>
//                             <div
//                               className={`${styles.btn} ${styles.btn_outline}`}
//                               onClick={() =>
//                                 handleQuantityChange(
//                                   product.product._id,
//                                   "decrease",
//                                 )}
//                             >
//                               -
//                             </div>
//                             <input
//                               className={styles.quantity_input}
//                               type="number"
//                               min="1"
//                               max={product.stock}
//                               value={product.quantity}
//                               onChange={(e) =>
//                                 handleQuantityChange(
//                                   product.product._id,
//                                   parseInt(e.target.value),
//                                 )}
//                             />
//                             <div
//                               className={`${styles.btn} ${styles.btn_outline}`}
//                               onClick={() =>
//                                 handleQuantityChange(
//                                   product.product._id,
//                                   "increase",
//                                 )}
//                             >
//                               +
//                             </div>
//                           </div>
//                         </div>
//                         <p className={styles.cart_item_price}>
//                           {numeral(product.product.price).format("0,0")}₫
//                         </p>
//                         <Button
//                           type="danger"
//                           onClick={() => handleRemoveCart(product.product._id)}
//                           icon={<DeleteOutlined />}
//                           style={{ color: "red" }}
//                         >
//                           Xóa
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//           </Card>
//         </Col>

//         <Col xs={24} sm={4} md={2} lg={8}>
//           <Card title="Thông tin giỏ hàng">
//             {carts.length > 0 &&
//               carts.map((cart) => {
//                 let totalPrice = 0;
//                 let selectedProductsInCart = cart.products.filter((product) =>
//                   selectedProducts.includes(product.productId)
//                 );
//                 return (
//                   <div className={styles.cart_summary} key={cart._id}>
//                     {selectedProductsInCart.map((product) => {
//                       totalPrice += product.quantity *
//                         product.product.price *
//                         (1 - product.product.discount / 100);
//                       return (
//                         <div
//                           className={styles.cart_summary_item}
//                           key={product.productId}
//                         >
//                           <img
//                             alt=""
//                             src={product.product.img}
//                             className={styles.cart_summary_item_image}
//                           />
//                           <div className={styles.cart_summary_item_details}>
//                             <h3 className={styles.cart_summary_item_name}>
//                               {product.product.name}
//                             </h3>
//                             <p className={styles.cart_summary_item_quantity}>
//                               Số lượng: {product.quantity}
//                             </p>
//                             <p className={styles.cart_summary_item_price}>
//                               Giá gốc:
//                               {numeral(
//                                 product.quantity * product.product.price,
//                               ).format("0,0")}
//                               ₫
//                             </p>
//                             <p className={styles.cart_summary_item_discount}>
//                               Giảm giá:
//                               {numeral(product.product.discount).format("0,0")}%
//                             </p>
//                             <p className={styles.cart_summary_item_subtotal}>
//                               Thành tiền:
//                               {numeral(
//                                 product.quantity *
//                                   product.product.price *
//                                   (1 - product.product.discount / 100),
//                               ).format("0,0")}
//                               ₫
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <p className={styles.cart_summary_total}>
//                       Tổng cộng: {numeral(totalPrice).format("0,0")} ₫
//                     </p>
//                   </div>
//                 );
//               })}
//             <Button
//               className={styles.checkout_button}
//               onClick={() => handleAddOrder()}
//             >
//               Đặt hàng
//             </Button>
//           </Card>
//         </Col>
//       </div>
//     </div>
//   );
// }

// export default memo(Cart);

import React, { memo } from "react";
import {
  Button,
  Badge,
  Card,
  Col,
  Input,
  Row,
  message,
  Result,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styles from "./cart.module.css";

import axios from "../../libraries/axiosClient";

function Cart() {
  const router = useRouter();
  const [carts, setCarts] = React.useState([]);

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        const response = await axios.get(`/carts/${customerId}`);

        const data = response.data;

        setCarts(data.payload.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [router]);

  // Handle quantity change
  const handleQuantityChange = async (id, size, quantity) => {
    try {
      const response = await axios.put(`/carts/${id}`, { size, quantity });
      const updatedCart = response.data;
      const newCarts = carts.map((cart) =>
        cart._id === updatedCart._id ? updatedCart : cart
      );
      setCarts(newCarts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCart = async (productId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      try {
        const newCarts = [...carts];
        const cartIndex = newCarts.findIndex((cart) =>
          cart.products.some((product) => product.productId === productId)
        );
        const productIndex = newCarts[cartIndex].products.findIndex(
          (product) => product.productId === productId,
        );

        newCarts[cartIndex].products.splice(productIndex, 1);

        setCarts(newCarts);
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        await axios.delete(`/carts/${customerId}/${productId}`);
        message.success("Xóa sản phẩm thành công!", 1.5);
      } catch (error) {
        console.log(error);
        message.success("Xóa sản phẩm thất bại!", 1.5);
      }
    }
  };

  const handleAddOrder = async () => {
    // const token = localStorage.getItem("token");
    // const decoded = jwt_decode(token);
    // const customerId = decoded._id;
    // console.log("customerId", customerId);

    // const orderDetails = carts[0].products.map((p) => {
    //   return {
    //     productId: p.product._id,
    //     quantity: p.quantity,
    //     price: p.product.price - (p.product.price * p.product.discount / 100),
    //     discount: p.product.discount,
    //   };
    // });

    router.push(
      {
        pathname: "/order",
      },
    );

    // const shippedDate = new Date("2023-07-07T00:00:00.000Z");

    // const order = {
    //   createdDate: new Date(),
    //   shippedDate: shippedDate,
    //   paymentType: "CASH",
    //   shippingAddress: "38 Yên Bái - Đà Nẵng",
    //   status: "WAITING",
    //   description: "Hàng dễ vỡ xin nhẹ tay ",
    //   customerId: customerId,
    //   employeeId: "64571f01c7efda89297503e8",
    //   orderDetails: orderDetails,
    // };

    // console.log("order", order);
    // try {
    //   const response = await axios.post("/orders", order);
    //   console.log("response", response);

    //   if (response) {
    //     message.success("Đặt hàng thành công!", 1.5);
    //     await axios.delete(`/carts/${customerId}`);
    //     window.location.href = "/checkout";
    //   } else {
    //     message.success("Đặt hàng thất bại!", 1.5);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="container">
      <div className="row">
        <Col span={16}>
          <Card title="Giỏ hàng">
            <div>
              {carts?.length > 0 &&
                carts.map((cart) => (
                  <Row className="cart-item" key={cart._id}>
                    <Col span={16} className="cart-item-info">
                      {cart?.products.length > 0
                        ? (
                          cart?.products?.map((product) => (
                            <div
                              className="cart-item-quantity d-flex"
                              key={product.productId}
                            >
                              <img
                                alt=""
                                src={product.product.img}
                                width="50px"
                                height="50px"
                              />
                              <p>{product.product.name}</p>
                              <Input
                                type="number"
                                value={product.quantity}
                                min={1}
                                max={10}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product.product._id,
                                    parseInt(e.target.value),
                                  )}
                                style={{ marginRight: "10px" }}
                              />
                              <p>{product.product.price}</p>
                              <Badge
                                count={<DeleteOutlined
                                  style={{ color: "#f5222d" }}
                                  onClick={() =>
                                    handleRemoveCart(product.product._id)}
                                />}
                              />
                            </div>
                          ))
                        )
                        : (<Result
                          title="There are no products in your cart yet"
                          extra={<Button
                            type="submit"
                            style={{
                              backgroundColor: "#1C86EE",
                              color: "#fff",
                            }}
                            key="console"
                          >
                            <Link href="/products">Keep Shopping</Link>
                          </Button>}
                        />)}
                    </Col>
                  </Row>
                ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Thông tin giỏ hàng">
            {carts.length > 0 &&
              carts.map((cart) => {
                let totalPrice = 0; // khởi tạo biến totalPrice bằng 0
                return (
                  <div key={cart._id}>
                    {cart?.products?.map((product) => {
                      // tính giá tiền của từng sản phẩm và cộng dồn vào biến totalPrice
                      totalPrice += product.quantity *
                        (product.product.price -
                          (product.product.price *
                              product.product.discount *
                              1) /
                            100);
                      return (
                        <>
                          <div key={product.productId}>
                            <img
                              alt=""
                              src={product.product.img}
                              width="50px"
                              height="50px"
                            />
                            <p>{product.product.name}</p>
                            <p>Số lượng: {product.quantity}</p>
                            <p>
                              Giá gốc :{" "}
                              {numeral(
                                product.quantity * product.product.price,
                              ).format("0,0")}
                              ₫
                            </p>
                            <p>Discount : {product.product.discount}%</p>
                            <p style={{ fontWeight: "bold" }}>
                              Giá:
                              {numeral(
                                product.quantity *
                                  (product.product.price -
                                    (product.product.price *
                                        product.product.discount *
                                        1) /
                                      100),
                              ).format("0,0")}
                              ₫
                            </p>
                          </div>

                          <p style={{ fontWeight: "bold" }}>
                            Tổng giá: {numeral(totalPrice).format("0,0")}₫
                          </p>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            <Button
              className="checkout-button"
              onClick={() => handleAddOrder()}
            >
              Đặt hàng
            </Button>
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default memo(Cart);
