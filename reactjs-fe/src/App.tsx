import React, { useState } from "react";
import "./App.css";
import BaseWeb from "./components/ReadMore/BaseWeb";
import Login from "./pages/Auth/Login";
//   import Login from "./Components/pages/Auth/Login";
function App() {

    const[isLogin, setIsLogin] = useState(false);

  return (
    <>
    {isLogin ? (
        < BaseWeb setIsLogin={setIsLogin}/>
      ) : (<Login setIsLogin={setIsLogin}/>)} 
      {/* <BaseWeb/> */}
    </>
    );
}
export default App;