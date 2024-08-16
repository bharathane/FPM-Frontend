import { FcMenu } from "react-icons/fc";
import Cookies from "js-cookie";
import "./index.css";
import { useState } from "react";
import AddPopup from "../AddPopup";
import AppContext from "../../context/appContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import Modal from "react-modal";
Modal.setAppElement("#root");
const HeadNav = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
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
                onClick={openModal}
              >
                logout
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow to pop the modal
                    borderRadius: "10px", // Rounded corners
                  },
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for focus on popup
                  },
                }}
              >
                <h3>Are you sure! you want to logout...</h3>
                <button
                  type="button"
                  className="logout-button"
                  style={{ width: "6vw" }}
                  onClick={logoutFromUi}
                >
                  YES
                </button>

                <button
                  onClick={closeModal}
                  type="button"
                  className="logout-button"
                >
                  NO
                </button>
              </Modal>
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
