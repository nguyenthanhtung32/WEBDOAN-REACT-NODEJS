import React from "react";
import Head from "next/head";
import axiosClient from "../../libraries/axiosClient";
import numeral from "numeral";
import styles from "./products.module.css";
import Link from "next/link";
import { message } from "antd";

function ProductDetail(props) {
  const { product } = props;
  const [quantity, setQuantity] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const [cart, setCart] = React.useState([]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/carts`, {
        productId,
        quantity,
      });
      const updatedCart = response.data.payload;
      setCart([...cart, updatedCart]);
      setIsLoading(false);
      message.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      message.error("Thêm vào giỏ hàng không thành công!");
    }
  };


  const handleQuantityChange = (action) => {
    if (action === "increase") {
      if (quantity + 1 <= product.stock) {
        setQuantity(quantity + 1);
      }
    } else if (action === "decrease") {
      if (quantity - 1 >= 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Product Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  {product ? (
        <div className={styles.product}>
          <img className={styles.product_images} alt="" src={product.img}></img>
          <div className={styles.product_details}>
            <h2 className={styles.h2}>{product.name}</h2>
            <h3 className={styles.h3}>
              Giá:
              <span style={{ color: "#ff3300", fontWeight: "bold" }}>
                {numeral(
                  product.price - (product.price * product.discount * 1) / 100
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
            <h3 className={styles.h3}>
              Giảm giá: <span>{numeral(product.discount).format("0,0")}</span> %
            </h3>

            <div className={styles.about}>
              <p className={styles.p}>
                Tồn kho: <span>{product.stock}</span>
              </p>
              <p className={styles.p}>
                Mã sản phẩm: <span>{product._id}</span>
              </p>
            </div>
            <p className={styles.p}>{product.description}</p>
            <div className={styles.quantity}>
              <span>Số lượng:</span>
              <div className={styles.quantity_btn}>
                <div
                  className={`${styles.btn} ${styles.btn_outline}`}
                  onClick={() => handleQuantityChange("decrease")}
                >
                  -
                </div>
                <input
                  className={styles.quantity_input}
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <div
                  className={`${styles.btn} ${styles.btn_outline}`}
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </div>
              </div>
            </div>
            <div className={styles.cta}>
              <div className={`${styles.btn} ${styles.btn_primary}`} onClick={handleAddToCart}>
                {isLoading ? "Loading..." : "add to cart"}
              </div>
              <div>
                <Link href="/carts">
                  <div>Giỏ hàng ({cart.length})</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
export default ProductDetail;
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);

    return {
      props: {
        product: response.data.result,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("err", error);
    return {
      notFound: true,
    };
  }
}