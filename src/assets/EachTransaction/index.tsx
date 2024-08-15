import "./index.css";
import Cookies from "js-cookie";
import UpdatePopup from "../UpdatePopup";
import AppContext from "../../context/appContext";
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
  single: eachTnxType;
  apiForLastTnx: () => {};
};

const EachTnx = (props: listOfTnxType) => {
  const { single, apiForLastTnx } = props;
  const {
    id,
    credit,
    debit,
    category,
    transactionDate,
    transactionName,
    type,
  } = single;

  const styleForAmount =
    type === "CREDIT" ? "debit-amount-each" : "credit-amount-each";
  const formated = new Date(transactionDate);

  const finalD = `${formated.getDate()}/${formated.getMonth()}  ${formated.getHours()}:${formated.getMinutes()}`;
  return (
    <AppContext.Consumer>
      {(value) => {
        const { setRefreshFlag } = value;
        const deleteRequest = async () => {
          const url = `https://fpm-backen-2.onrender.com/transactions/deleteTransactions/${id}`;
          const jwtToken = Cookies.get("jwt_token");
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          };
          await fetch(url, options);

          apiForLastTnx();
          setRefreshFlag();
        };

        return (
          <tr className="each-tnx-item">
            <td>
              <img
                src={
                  type === "CREDIT"
                    ? "https://res.cloudinary.com/dr2jqbir9/image/upload/v1723526989/Group_326_q6qu1o.png"
                    : "https://res.cloudinary.com/dr2jqbir9/image/upload/v1723526988/Group_328_vdwlmr.png"
                }
                alt="creditDebitShow"
                className="each-td-img"
              />
            </td>
            <td>{transactionName}</td>
            <td className={styleForAmount}>{type}</td>
            <td className="finalDate">{finalD}</td>
            <td className={styleForAmount}>
              {credit != 0 ? `+$${credit}` : `-$${debit}`}
            </td>
            <td>{category}</td>
            <td>
              <UpdatePopup obj={single} apiForLastTnx={apiForLastTnx} />
            </td>
            <td>
              <button type="button" onClick={deleteRequest}>
                <img
                  src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1723113581/Icon_g6rfk2.png"
                  alt="deleteIcon"
                  className="each-td-img"
                />
              </button>
            </td>
          </tr>
        );
      }}
    </AppContext.Consumer>
  );
};

export default EachTnx;
