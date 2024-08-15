import Modal from "react-modal";
import { useState } from "react";
import Cookies from "js-cookie";
import AppContext from "../../context/appContext";
import "./index.css";
Modal.setAppElement("#root");
const AddPopup = () => {
  const [tnxName, setTnxName] = useState("");
  const [tnxType, setTnxType] = useState("DEBITS");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const changeNameInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTnxName(e.target.value);
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTnxType(e.target.value);
  };

  const onChnageAmout = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <AppContext.Consumer>
      {(value) => {
        const { setRefreshFlag } = value;
        const onFormSubmition = async (e: React.FormEvent) => {
          e.preventDefault();
          const url =
            "https://fpm-backen-2.onrender.com/transactions/addTransaction";
          const jwtToken = Cookies.get("jwt_token");
          const bodyObj = {
            username: localStorage.getItem("username"),
            transactionName: tnxName,
            category: category,
            debit: tnxType === "DEBITS" ? amount : 0,
            credit: tnxType === "CREDIT" ? amount : 0,
            type: tnxType,
          };

          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(bodyObj),
          };

          const res = await fetch(url, options);
          if (res.ok == true) {
            setAmount(0);
            setTnxName("");
            setCategory("");
            setTnxType("");
            setRefreshFlag();
          }
        };

        return (
          <div className="popup-container">
            <button onClick={openModal} className="logout-button">
              +Add Tnx
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
              <>
                <div>
                  <form className="update-form" onSubmit={onFormSubmition}>
                    <div>
                      <label>Transaction Name</label>
                      <br />
                      <input
                        type="text"
                        onChange={changeNameInputVal}
                        value={tnxName}
                      />
                    </div>

                    <div>
                      <label>Transaction type</label>
                      <br />
                      <select onChange={onChangeType} value={tnxType}>
                        <option value="CREDIT">CREDIT</option>
                        <option value="DEBITS">DEBIT</option>
                      </select>
                    </div>
                    <div>
                      <label>Category</label>
                      <br />
                      <input
                        type="text"
                        onChange={onChangeCategory}
                        value={category}
                      />
                    </div>
                    <div>
                      <label>Amount</label>
                      <br />
                      <input
                        type="number"
                        onChange={onChnageAmout}
                        value={amount}
                      />
                    </div>
                    <button type="submit" className="logout-button">
                      Submit
                    </button>
                  </form>
                </div>
              </>

              <button
                onClick={closeModal}
                type="button"
                className="logout-button"
              >
                Close
              </button>
            </Modal>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default AddPopup;
