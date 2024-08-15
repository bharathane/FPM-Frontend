import { useState } from "react";
import Cookies from "js-cookie";
import AppContext from "../../context/appContext";
import Modal from "react-modal";
import "./index.css";
Modal.setAppElement("#root");
type eachTnxType = {
  id: string;
  credit: number;
  debit: number;
  username: string;
  category: string;
  transactionDate: string;
  transactionName: string;
  type: string;
};

type listOfTnxType = {
  obj: eachTnxType;
  apiForLastTnx: () => {};
};

const UpdatePopup = (props: listOfTnxType) => {
  const { obj, apiForLastTnx } = props;
  const [tnxName, setTnxName] = useState(obj.transactionName);
  const [tnxType, setTnxType] = useState(obj.type);
  const [category, setCategory] = useState(obj.category);

  const [amount, setAmount] = useState(
    obj.credit !== -1 ? obj.credit : obj.debit
  );
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
            "https://fpm-backen-2.onrender.com/transactions/updateTransactions";
          const jwtToken = Cookies.get("jwt_token");

          const bodyObj = {
            id: obj.id,
            username: localStorage.getItem("username"),
            transactionName: tnxName,
            category: category,
            debit: tnxType === "DEBIT" ? amount : 0,
            credit: tnxType === "CREDIT" ? amount : 0,
            type: tnxType,
          };

          const options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(bodyObj),
          };

          await fetch(url, options);

          apiForLastTnx();
          setRefreshFlag();
        };
        return (
          <>
            <button onClick={openModal}>
              <img
                src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1723113581/pencil-02_fl52y6.png"
                alt="update"
              />
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
                      <option value="DEBIT">DEBIT</option>
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
              <button
                onClick={closeModal}
                type="button"
                className="logout-button"
              >
                Close
              </button>
            </Modal>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

export default UpdatePopup;
