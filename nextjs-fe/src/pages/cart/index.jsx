// import React, { memo } from "react";
// import { Button, Badge, Card, Col, Input, Row, message } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import numeral from "numeral";
// import { useRouter } from "next/router";
// import jwt_decode from "jwt-decode";
// import styles from "./cart.module.css";

// import axios from "../../libraries/axiosClient";

// function Cart() {
//   const router = useRouter();
//   const [carts, setCarts] = React.useState([]);

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

//   // Handle quantity change
//   const handleQuantityChange = async (id, size, quantity) => {
//     try {
//       const response = await axios.put(`/carts/${id}`, { size, quantity });
//       const updatedCart = response.data;
//       const newCarts = carts.map((cart) =>
//         cart._id === updatedCart._id ? updatedCart : cart
//       );
//       setCarts(newCarts);
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
//           (product) => product.productId === productId
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

//   return (
//     <div className={styles.container}>
//       <div className={styles.row}>
//         <Col span={16}>
//           <Card title="Giỏ hàng">
//             {carts.length > 0 &&
//               carts.map((cart) => (
//                 <div className={styles.cart_list} key={cart._id}>
//                   {cart.products.map((product) => (
//                     <div className={styles.cart_item} key={product.productId}>
//                       <img
//                         alt=""
//                         src={product.product.img}
//                         className={styles.cart_item_image}
//                       />
//                       <div className={styles.cart_item_details}>
//                         <h3 className={styles.cart_item_name}>
//                           {product.product.name}
//                         </h3>
//                         {/* <Input
//                           type="number"
//                           value={product.quantity}
//                           min={1}
//                           max={10}
//                           onChange={(e) =>
//                             handleQuantityChange(
//                               product.product._id,
//                               parseInt(e.target.value)
//                             )
//                           }
//                           className={styles.cart_item_quantity}
//                         /> */}
//                         <div className={styles.cart_item_quantity}>
//                           <div className={styles.quantity_btn}>
//                             <div
//                               className={`${styles.btn} ${styles.btn_outline}`}
//                               onClick={() => handleQuantityChange("decrease")}
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
//                                 setQuantity(parseInt(e.target.value))
//                               }
//                             />
//                             <div
//                               className={`${styles.btn} ${styles.btn_outline}`}
//                               onClick={() => handleQuantityChange("increase")}
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

//         <Col span={8}>
//           <Card title="Thông tin giỏ hàng">
//             {carts.length > 0 &&
//               carts.map((cart) => {
//                 let totalPrice = 0;
//                 return (
//                   <div className={styles.cart_summary} key={cart._id}>
//                     {cart.products.map((product) => {
//                       totalPrice +=
//                         product.quantity *
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
//                                 product.quantity * product.product.price
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
//                                   (1 - product.product.discount / 100)
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
//             <Button className={styles.checkout_button}>Đặt hàng</Button>
//           </Card>
//         </Col>
//       </div>
//     </div>
//   );
// }

// export default memo(Cart);

import React, { memo } from "react";
import { Button, Card, Col, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styles from "./cart.module.css";

import axios from "../../libraries/axiosClient";

function Cart() {
  const router = useRouter();
  const [carts, setCarts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);

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
  // const handleQuantityChange = async (id, size, quantity) => {
  //   try {
  //     const response = await axios.put(`/carts/${id}`, { size, quantity });
  //     const updatedCart = response.data;
  //     const newCarts = carts.map((cart) =>
  //       cart._id === updatedCart._id ? updatedCart : cart
  //     );
  //     setCarts(newCarts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleQuantityChange = async (productId, action) => {
    try {
      const newCarts = [...carts];
      const cartIndex = newCarts.findIndex((cart) =>
        cart.products.some((product) => product.productId === productId)
      );
      const productIndex = newCarts[cartIndex].products.findIndex(
        (product) => product.productId === productId
      );
      let newQuantity = newCarts[cartIndex].products[productIndex].quantity;

      if (action === "increase") {
        // Increase quantity
        newQuantity += 1;
      } else if (action === "decrease") {
        // Decrease quantity
        newQuantity -= 1;

        if (newQuantity < 1) {
          // Remove product from cart if quantity is less than 1
          newCarts[cartIndex].products.splice(productIndex, 1);
        }
      }

      newCarts[cartIndex].products[productIndex].quantity = newQuantity;

      setCarts(newCarts);

      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const customerId = decoded._id;

      await axios.put(`/carts/${customerId}`, {
        productId,
        quantity: newQuantity,
      });
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
          (product) => product.productId === productId
        );

        newCarts[cartIndex].products.splice(productIndex, 1);

        setCarts(newCarts);
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        await axios.delete(`/carts/${customerId}/${productId}`);
        message.success("xóa thành công!", 1.5);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(
        selectedProducts.filter((item) => item !== productId)
      );
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Col span={16} style={{ marginRight: "10px", width: "900px" }}>
          <Card title="Giỏ hàng">
            {carts.length > 0 &&
              carts.map((cart) => (
                <div className={styles.cart_list} key={cart._id}>
                  {cart.products.map((product) => (
                    <div className={styles.cart_item} key={product.productId}>
                      <div className={styles.cart_item_checkbox}>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.productId)}
                          onChange={() =>
                            handleProductSelection(product.productId)
                          }
                        />
                      </div>
                      <img
                        alt=""
                        src={product.product.img}
                        className={styles.cart_item_image}
                      />
                      <div className={styles.cart_item_details}>
                        <h3 className={styles.cart_item_name}>
                          {product.product.name}
                        </h3>
                        <div className={styles.cart_item_quantity}>
                          <div className={styles.quantity_btn}>
                            <div
                              className={`${styles.btn} ${styles.btn_outline}`}
                              onClick={() =>
                                handleQuantityChange(
                                  product.product._id,
                                  "decrease"
                                )
                              }
                            >
                              -
                            </div>
                            <input
                              className={styles.quantity_input}
                              type="number"
                              min="1"
                              max={product.stock}
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product.product._id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <div
                              className={`${styles.btn} ${styles.btn_outline}`}
                              onClick={() =>
                                handleQuantityChange(
                                  product.product._id,
                                  "increase"
                                )
                              }
                            >
                              +
                            </div>
                          </div>
                        </div>
                        <p className={styles.cart_item_price}>
                          {numeral(product.product.price).format("0,0")}₫
                        </p>
                        <Button
                          type="danger"
                          onClick={() => handleRemoveCart(product.product._id)}
                          icon={<DeleteOutlined />}
                          style={{ color: "red" }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Thông tin giỏ hàng">
            {carts.length > 0 &&
              carts.map((cart) => {
                let totalPrice = 0;
                let selectedProductsInCart = cart.products.filter((product) =>
                  selectedProducts.includes(product.productId)
                );
                return (
                  <div className={styles.cart_summary} key={cart._id}>
                    {selectedProductsInCart.map((product) => {
                      totalPrice +=
                        product.quantity *
                        product.product.price *
                        (1 - product.product.discount / 100);
                      return (
                        <div
                          className={styles.cart_summary_item}
                          key={product.productId}
                        >
                          <img
                            alt=""
                            src={product.product.img}
                            className={styles.cart_summary_item_image}
                          />
                          <div className={styles.cart_summary_item_details}>
                            <h3 className={styles.cart_summary_item_name}>
                              {product.product.name}
                            </h3>
                            <p className={styles.cart_summary_item_quantity}>
                              Số lượng: {product.quantity}
                            </p>
                            <p className={styles.cart_summary_item_price}>
                              Giá gốc:
                              {numeral(
                                product.quantity * product.product.price
                              ).format("0,0")}
                              ₫
                            </p>
                            <p className={styles.cart_summary_item_discount}>
                              Giảm giá:
                              {numeral(product.product.discount).format("0,0")}%
                            </p>
                            <p className={styles.cart_summary_item_subtotal}>
                              Thành tiền:
                              {numeral(
                                product.quantity *
                                  product.product.price *
                                  (1 - product.product.discount / 100)
                              ).format("0,0")}
                              ₫
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <p className={styles.cart_summary_total}>
                      Tổng cộng: {numeral(totalPrice).format("0,0")} ₫
                    </p>
                  </div>
                );
              })}
            <Button className={styles.checkout_button}>Đặt hàng</Button>
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default memo(Cart);
