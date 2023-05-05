import React from "react";
import "./App.css";

import BaseWeb from "./components/ReadMore/BaseWeb";
// import Login from "./pages/Auth/Login";

function App() {
  // const [isLogin, setIsLogin] = React.useState(false);
  return (
    <>
      {/* {isLogin ? (
        <BaseWeb setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )} */}
      <BaseWeb/>
    </>
  );
}
export default App;
