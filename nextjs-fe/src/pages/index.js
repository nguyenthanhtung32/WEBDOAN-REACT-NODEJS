// import React from "react";
// import { Inter } from "next/font/google";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";

// import styles from "@/styles/Home.module.css";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const router = useRouter();

//   return (
//     <>
//       <Head>
//         <title>Home page</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <div className={styles.description}>
//           <p>
//             Get started by editing&nbsp;
//             <code className={styles.code}>src/pages/index.js</code>
//           </p>

//           <Link href="/about?status=PENDING">
//             <h1>About</h1>
//           </Link>

//           <Link
//             href={{
//               pathname: "/about",
//               query: { status: "PENDING" },
//             }}
//           >
//             <h1>About object</h1>
//           </Link>

//           <button type="button" onClick={() => router.push("/about")}>
//             Click
//           </button>
//           <div>
//             <a
//               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               By{" "}
//               <Image
//                 src="/vercel.svg"
//                 alt="Vercel Logo"
//                 className={styles.vercelLogo}
//                 width={100}
//                 height={24}
//                 priority
//               />
//             </a>
//           </div>
//         </div>

//         <div className={styles.center}>
//           <Image
//             className={styles.logo}
//             src="/next.svg"
//             alt="Next.js Logo"
//             width={180}
//             height={37}
//             priority
//           />
//         </div>

//         <div className={styles.grid}>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Docs <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Find in-depth information about Next.js features and&nbsp;API.
//             </p>
//           </a>

//           <a
//             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Learn <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Learn about Next.js in an interactive course with&nbsp;quizzes!
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Templates <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Discover and deploy boilerplate example Next.js&nbsp;projects.
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Deploy <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Instantly deploy your Next.js site to a shareable URL
//               with&nbsp;Vercel.
//             </p>
//           </a>
//         </div>
//       </main>
//     </>
//   );
// }
import { Card, Carousel, Col, Row } from "antd";
import axios from "../libraries/axiosClient";
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const apiName = "/products";

export default function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [refresh] = React.useState(0);
  const router = useRouter();

  // const navigate = useNavigate();

  const onClickFilter = (_id) => {
    console.log("_id", _id);
    router.push({
      pathname: "/renderCategory",
      query: {
        nameCategory: _id,
      },
    });
    // call api voi param name
  };
  React.useEffect(() => {
    axios
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const contentStyle: CSSProperties: any = {
  //   height: "200px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };

  return (
    <>
      <div
        style={{
          margin: "20px auto",
          width: "94%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Carousel autoplay>
          <div>
            <h3 /* style={contentStyle} */>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-440c89823337cc1fb4591834c65a0225_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 /* style={contentStyle} */>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-3a1f19249482dcdac154ea3666bb4076_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 /* style={contentStyle} */>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-fa79715264f5c973648d8096a8aa9773_xxhdpi"
              />
            </h3>
          </div>
          <div>
            <h3 /* style={contentStyle} */>
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://cf.shopee.vn/file/vn-50009109-1a6095f0c892a26625c343726f14ba1f_xxhdpi"
              />
            </h3>
          </div>
        </Carousel>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img
            style={{ height: "100%", width: "30%" }}
            src="https://cf.shopee.vn/file/vn-50009109-32bdb495b5f3dbeb18919678a77b01f6_xxhdpi"
          />
          <img
            style={{ height: "100%", width: "30%" }}
            src="https://cf.shopee.vn/file/vn-50009109-d02dfb0938956b674846428074581299_xhdpi"
          />
          <img
            style={{ height: "100%", width: "30%" }}
            src="https://cf.shopee.vn/file/vn-50009109-c621578f239c62ce7917370f5d077bbb_xhdpi"
          />
        </div>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>Danh Mục</h2>
        <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
          {categories.map((item) => {
            return (
              <Col
                key={item._id}
                xs={12}
                sm={9}
                md={6}
                lg={3}
                style={{ marginBottom: "16px" }}
              >
                <Card
                  onClick={() => {
                    onClickFilter(item._id);
                  }}
                  hoverable
                  style={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "scale(0.8)",
                  }}
                  cover={
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "100px",
                        margin: "10px 0 10px 0",
                      }}
                      src={item.img}
                    />
                  }
                >
                  <strong>{item.name}</strong>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          margin: "20px 50px 0px 50px",
          padding: "10px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>Flash Sale</h2>
        <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((item) => {
            if (item.discount > 0) {
              return (
                <Col
                  key={item._id}
                  xs={12}
                  sm={9}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "16px" }}
                >
                  <Card
                    onClick={() => {
                      onClickFilter(item?.name);
                    }}
                    hoverable
                    style={{
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      transform: "scale(0.8)",
                    }}
                    cover={
                      <img
                        alt=""
                        style={{
                          width: "100%",
                          height: "100px",
                          margin: "10px 0 10px 0",
                        }}
                        src={item.img}
                      />
                    }
                  >
                    <strong>{item.name}</strong>
                  </Card>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </div>
    </>
  );
}
