import { FcMenu } from "react-icons/fc";
import Cookies from "js-cookie";
import "./index.css";
import AddPopup from "../AddPopup";
import AppContext from "../../context/appContext";
import { IoCloseCircleOutline } from "react-icons/io5";
const HeadNav = () => {
  const logoutFromUi = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("username");
    window.location.replace("/login");
  };

  return (
    <AppContext.Consumer>
      {(value) => {
        const { showLeftNav, setShowLeftNav } = value;

        return (
          <nav>
            <h1 className="username">{localStorage.getItem("username")}</h1>
            <div className="header-btns">
              <button
                type="button"
                className="logout-button"
                style={{ width: "6vw" }}
                onClick={logoutFromUi}
              >
                logout
              </button>
              <AddPopup />
            </div>
            <button
              className="menu-item"
              type="button"
              onClick={() => setShowLeftNav()}
            >
              {showLeftNav ? <IoCloseCircleOutline /> : <FcMenu />}
            </button>
          </nav>
        );
      }}
    </AppContext.Consumer>
  );
};

export default HeadNav;
