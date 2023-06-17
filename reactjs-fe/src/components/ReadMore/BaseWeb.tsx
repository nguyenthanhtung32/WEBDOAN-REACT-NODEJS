import { Layout } from "antd";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
interface IProps {
  setIsLogin: (value: boolean) => void;
}

function BaseWeb(props: IProps) {
  const { setIsLogin } = props;
  return (
    <BrowserRouter>
      <Layout>
        <NavigationBar setIsLogin={setIsLogin} />
      </Layout>
    </BrowserRouter>
  );
}

export default BaseWeb;
