import React, { memo } from "react";
import jwt_decode from "jwt-decode";

import axios from "../../libraries/axiosClient";

function Profile() {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;
        // const customerId = router?.query?.customerId;
        const response = await axios.get(`/carts/${customerId}`);
       

        const data = response.data;

        setCustomers(data.payload.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);
  console.log("customers", customers);
  return (
    <>
      {customers.map((item) => (
        <div>
          <h1>Profile User</h1>
          <p>Name: {item.lastName} {item.firstName}</p>
          <p>Email: {item.email}</p>
          <p>Phone Number: {item.phoneNumber}</p>
          <p>Address: {item.address}</p>
        </div>
      ))}
    </>
  );
}
export default memo(Profile);
