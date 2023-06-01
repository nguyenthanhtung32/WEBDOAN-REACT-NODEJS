// import {
//     FacebookFilled,
//     InstagramFilled,
//     TwitterSquareFilled,
//     YoutubeFilled,
//   } from "@ant-design/icons";
//   import styles from "./Footer.module.css";

//   export default function Footer() {
//     return (
//       <div className={styles.footer_container}>
//         <div className={styles.footer_info}>
//           <h2>Thông tin</h2>
//           <ul>
//             <li>Giới thiệu</li>
//             <li>Tuyển dụng</li>
//             <li>Quy chế hoạt động</li>
//             <li>Chính sách bảo mật</li>
//             <li>Quyền sở hữu trí tuệ</li>
//             <li>Điều khoản sử dụng</li>
//             <li>Liên hệ với chúng tôi</li>
//           </ul>
//         </div>
//         <div className={styles.footer_service}>
//           <h2>Dịch vụ</h2>
//           <ul>
//             <li>Shopee đảm bảo</li>
//             <li>Vận chuyển</li>
//             <li>Trung tâm trợ giúp</li>
//             <li>Hỗ trợ khách hàng</li>
//             <li>Thanh toán</li>
//             <li>Shopee Xu</li>
//             <li>Voucher Shopee</li>
//             <li>Shopee Blog</li>
//           </ul>
//         </div>
//         <div className={styles.footer_follow}>
//           <h2>Theo dõi chúng tôi trên</h2>
//           <ul>
//             <li>
//               <FacebookFilled />
//               Facebook
//             </li>
//             <li>
//               <InstagramFilled />
//               Instagram
//             </li>
//             <li>
//               <TwitterSquareFilled />
//               Twitter
//             </li>
//             <li>
//               <YoutubeFilled />
//               Youtube
//             </li>
//           </ul>
//         </div>
//         <div className={styles.footer_download}>
//           <h2>Tải ứng dụng Shopee ngay thôi nào</h2>
//           <ul>
//             <li>
//               <img
//                 src="https://cdn.wikimobi.vn/2018/07/cuoc-chien-cua-hai-cho-ung-dung-lon-nhat-google-play-store-appstore.jpeg"
//                 alt="Download"
//               />
//             </li>
//           </ul>
//         </div>
//       </div>
//     );
//   }

import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiVisaLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDeliveryDining } from "react-icons/md";
const style = { textDecoration: "none", marginTop: "10px" };

function Footer() {
  return (
    <footer
      className="border-top mt-3"
      style={{ lineHeight: "20px", backgroundColor: "black", color: "white" }}
    >
      <Container className="mt-3 mb-3">
        <Row>
          <Col>
            <h4>About us</h4>
            <strong>The Mall</strong>
            <p>38 Yên Bái - Đà Nẵng</p>
            <p>
              <span>Call:</span>
              <span>+09770123777</span>
            </p>
            <p>
              <span>Email:</span>
              <span>themall@gmail.com</span>
            </p>
          </Col>
          <Col>
            <h4>Help</h4>
            <Nav className="flex-column">
              <Link style={style} href={"#"}>
                FAQ
              </Link>
              <Link style={style} href={"#"}>
                Shipping
              </Link>
              <Link style={style} href={"#"}>
                Returns
              </Link>
              <Link style={style} href={"#"}>
                Order Status
              </Link>
              <Link style={style} href={"#"}>
                24/7 Support
              </Link>
            </Nav>
          </Col>
          <Col>
            <h4>Payment And Delivery</h4>
            <span>Payment</span>
            <p style={{ fontSize: "2em" }}>
              <AiOutlineCreditCard />
              <RiVisaLine />
            </p>
            <span>Delivery</span>
            <p style={{ fontSize: "2em", color: "white" }}>
              <TbTruckDelivery />
              <MdOutlineDeliveryDining />
            </p>
          </Col>
          <Col>
            <h4>Connect with Us</h4>
            <p style={{ fontSize: "2em" }}>
              <Link
                className="me-3"
                href="https://www.facebook.com/profile.php?id=100044424131873"
              >
                <CiFacebook />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiTwitter />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiInstagram />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiYoutube />
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-4" style={{ backgroundColor: "#222222" }}>
        <span style={{ color: "white" }}>© 2023 Copyright:</span>
        <strong style={{ color: "#bab6b6" }}>@HoangVinh-ThanhTung</strong>
      </div>
    </footer>
  );
}
export default Footer;
