import Styles from "./SideBar.module.css";

const SideBar: React.FC = () => {
  //   const { title } = props
  return (
    <div className={`py-3 ps-2 mb-5 ${Styles.width_30} `}>
      <h1>The Pulpit </h1>
    </div>
  );
};

export default SideBar;
