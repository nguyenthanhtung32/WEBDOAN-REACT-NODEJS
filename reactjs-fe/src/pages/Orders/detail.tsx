import { Button, Card } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
// import { useNavigate } from "react-router-dom";

import numeral from "numeral";
import { useLocation } from "react-router-dom";

const apiName = "/orders";

export default function Products() {
  //   const navigate = useNavigate();
  const location = useLocation();
  const productDetail = location.state.productDetail;

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!productDetail) return;

    axios
      .get(`${apiName}?${productDetail}`)
      .then((response) => {
        const { data } = response;

        // Lọc ra sản phẩm có description trùng với productDetail
        const filteredProducts = data.payload.filter(
          (product: any) => product.description === productDetail
        );

        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productDetail]);

  React.useEffect(() => {
    axios
      .get(`${apiName}?${productDetail}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productDetail]);

  return (
   <>
   <div>hello</div>
   </>
  );
}
