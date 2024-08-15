import HeadNav from "../HeadNav";
import LeftNav from "../LeftNav";
import Cookies from "js-cookie";
import { apiConstains } from "../ApiConstains";
import EachTnx from "../EachTransaction";
import { useState, useEffect } from "react";
import "./index.css";

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

const TransactionsPage = () => {
  const [lastTnxStatus, setLastTnxStatus] = useState<String>(
    apiConstains.initial
  );

  const [debitsOrCredits, setDebitsOrCredits] = useState("");
  const [lastTnx, setLastTnx] = useState<eachTnxType[]>([]);

  const apiForLastTnx = async () => {
    setLastTnxStatus(apiConstains.inprogress);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://fpm-backen-2.onrender.com/transactions?username=${localStorage.getItem(
      "username"
    )}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const res = await fetch(url, options);
    const jsonRes = await res.json();
    if (res.ok == true) {
      setLastTnxStatus(apiConstains.success);
      setLastTnx(jsonRes);
    } else {
      setLastTnxStatus(apiConstains.failure);
    }
  };

  useEffect(() => {
    apiForLastTnx();
  }, []);

  const filter =
    debitsOrCredits == ""
      ? lastTnx
      : lastTnx.filter((each) => each.type == debitsOrCredits);
  return (
    <div className="home-wrapper-container">
      <LeftNav />
      <div className="home-con">
        <HeadNav />
        <div className="content-container">
          <button
            type="button"
            className="debitButtons"
            onClick={() => setDebitsOrCredits("")}
          >
            <h3>All Transactions</h3>
          </button>
          <button
            type="button"
            className="debitButtons"
            onClick={() => setDebitsOrCredits("DEBIT")}
          >
            <h3>Debits</h3>
          </button>
          <button
            type="button"
            className="debitButtons"
            onClick={() => setDebitsOrCredits("CREDIT")}
          >
            <h3>Credits</h3>
          </button>
          <table className="table-last-tnx">
            <tbody>
              {filter.map((each) => (
                <EachTnx
                  single={each}
                  key={each.id}
                  apiForLastTnx={apiForLastTnx}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
