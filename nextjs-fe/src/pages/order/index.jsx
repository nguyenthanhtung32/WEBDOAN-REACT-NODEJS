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
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";


import axios from "../../libraries/axiosClient";

function Order() {
  const router = useRouter();
  const { Option } = Select;
  const [carts, setCarts] = React.useState([]);
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("CASH");
  const [description, setDescription] = React.useState("");
  

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

  const handleAddOrder = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    console.log("customerId", customerId);

    const orderDetails = carts[0].products.map((p) => {
      return {
        productId: p.product._id,
        quantity: p.quantity,
        price: p.product.price - (p.product.price * p.product.discount / 100),
        discount: p.product.discount,
      };
    });

    const shippedDate = new Date("2023-07-07T00:00:00.000Z");

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

    console.log("order", order);
    try {
      const response = await axios.post("/orders", order);
      console.log("response", response);

      if (response) {
        message.success("Đặt hàng thành công!", 1.5);
        await axios.delete(`/carts/${customerId}`);
        window.location.href = "/checkout";
      } else {
        message.success("Đặt hàng thất bại!", 1.5);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        </Card>
        <Input
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
         <Input
          placeholder="Lời nhắn cho người bán"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={paymentType} onChange={setPaymentType}>
          <Option value="CASH">CASH</Option>
          <Option value="CREDIT CARD" onClick={()=>{router.push("/bank")}}>CREDIT CARD</Option>
        </Select>
        <Button
          className="checkout-button"
          onClick={() => handleAddOrder()}
        >
          Đặt hàng
        </Button>
      </Col>
    </>
  );
}
export default memo(Order);
