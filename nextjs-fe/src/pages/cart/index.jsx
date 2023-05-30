import React from "react";
import { Button, Card, Col, Input, message, Row } from "antd";

export default function Cart(props) {
  const { products } = props;
  return (
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <p class="m-0 h5">Shopping Cart</p>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center" width="100">Image</th>
                    <th class="text-left">Product Name</th>
                    <th class="text-left" width="100">Model</th>
                    <th class="text-center" width="200">Quantity</th>
                    <th class="text-right" width="100">Unit Price</th>
                    <th class="text-right" width="120">Total</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {products && (
                    <tr key={products._id}>
                      <td class="text-center">
                        <img
                          alt=""
                          class="img-thumbnail p-0 border-0"
                          src={products.img}
                        />
                      </td>
                      <td class="text-left">
                        <p class="m-0">{products.name}</p>
                        <p class="m-0">{products.description}</p>
                      </td>
                      {/* <td class="text-left">LP3065</td>
                      <td class="text-center">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control text-center"
                            id=""
                            name=""
                            value="1"
                            min="1"
                            max="5"
                            placeholder="Quantity"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                            >
                              <i class="fas fa-sync-alt"></i>
                            </button>
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                            >
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">$122.00</td>
                      <td class="text-right">$122.00</td> */}
                    </tr>
                  )}
                  {/* <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                      <p class="m-0">Reward Points: 300</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr> */}
                </tbody>
                <tfoot>
                  <tr>
                    <td class="text-right" colspan="5">Sub-Total</td>
                    <td class="text-right">$100.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">Eco Tax (-2.00)</td>
                    <td class="text-right">$2.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">VAT (20%)</td>
                    <td class="text-right">$20.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">
                      <p class="m-0 h5">
                        Genaral Total
                      </p>
                    </td>
                    <td class="text-right"><p class="m-0 h5">$122.00</p></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="card-footer text-right">
              <button type="button" class="btn btn-secondary">
                Continue Shopping
              </button>
              <button type="button" class="btn btn-primary">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Row
    //     gutter={[16, 16]}
    //     style={{
    //       display: "flex",
    //       flexWrap: "wrap",
    //       marginTop: "24px",
    //       width: "1000px",
    //     }}
    //     className="container"
    //   >
    //     {products.map((item) => (
    //       <Col
    //         key={item._id}
    //         xs={{ span: 24 }}
    //         sm={{ span: 12 }}
    //         md={{ span: 8 }}
    //         lg={{ span: 6 }}
    //         style={{ marginBottom: "24px" }}
    //       >
    //         <Link href={`/products/${item._id}`}>
    //           <Card
    //             key={item._id}
    //             title={item.name}
    //             bordered={false}
    //             style={{
    //               height: "100%",
    //               display: "flex",
    //               flexDirection: "column",
    //               justifyContent: "space-between",
    //               borderRadius: "8px",
    //               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //               width: "100%",
    //             }}
    //             hoverable
    //             cover={
    //               <img
    //                 alt=""
    //                 style={{ maxHeight: "250px", objectFit: "contain" }}
    //                 src={item.img}
    //               />
    //             }
    //           >
    //             <div
    //               style={{
    //                 flexGrow: 1,
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 overflow: "hidden",
    //               }}
    //             >
    //               <div
    //                 style={{
    //                   textOverflow: "ellipsis",
    //                   overflow: "hidden",
    //                   whiteSpace: "nowrap",
    //                   marginBottom: "16px",
    //                 }}
    //               >
    //                 {item.description}
    //               </div>
    //               <div
    //                 style={{
    //                   color: "#ff3300",
    //                   marginLeft: "0",
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 <span>
    //                   {numeral(
    //                     item.price - (item.price * item.discount * 1) / 100
    //                   ).format("0,0")}
    //                   ₫
    //                 </span>
    //                 {item.discount > 0 && (
    //                   <span
    //                     style={{
    //                       textDecoration: "line-through",
    //                       marginLeft: "8px",
    //                     }}
    //                   >
    //                     {numeral(item.price).format("0,0")}₫
    //                   </span>
    //                 )}
    //               </div>
    //             </div>
    //             <div style={{ textAlign: "center", marginTop: "10px" }}>
    //               <span
    //                 style={{
    //                   backgroundColor: "#ff3300",
    //                   color: "#fff",
    //                   padding: "4px 8px",
    //                   borderRadius: "4px",
    //                   textTransform: "uppercase",
    //                   fontWeight: "bold",
    //                   fontSize: "12px",
    //                 }}
    //               >
    //                 Mua ngay
    //               </span>
    //             </div>
    //           </Card>
    //         </Link>
    //       </Col>
    //     ))}
    //   </Row>
  );
}

// export default function addToCart() {
//   // Lấy thông tin sản phẩm từ trang
//   const productName = "Product Name"; // Thay đổi tên sản phẩm thành tên sản phẩm thực tế
//   const productPrice = 10; // Thay đổi giá sản phẩm thành giá sản phẩm thực tế

//   // Lấy thông tin giỏ hàng từ Local Storage
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   // Thêm sản phẩm vào giỏ hàng
//   cart.push({ name: productName, price: productPrice });

//   // Lưu thông tin giỏ hàng vào Local Storage
//   localStorage.setItem("cart", JSON.stringify(cart));
// }
