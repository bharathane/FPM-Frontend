import HeadNav from "../HeadNav";
import LeftNav from "../LeftNav";
import Cookies from "js-cookie";
import { MagnifyingGlass } from "react-loader-spinner";
import EachTnx from "../EachTransaction";
import { useState, useEffect } from "react";
import "./index.css";
import { apiConstains } from "../ApiConstains";
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
  const [debitsOrCredits, setDebitsOrCredits] = useState("");
  const [transactionsPageApiStatus, setTransactionPageStatus] = useState(
    apiConstains.initial
  );
  const [lastTnx, setLastTnx] = useState<eachTnxType[]>([]);

  const apiForLastTnx = async () => {
    setTransactionPageStatus(apiConstains.inprogress);
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
      setLastTnx(jsonRes);
      setTransactionPageStatus(apiConstains.success);
    } else {
      setTransactionPageStatus(apiConstains.failure);
    }
  };

  useEffect(() => {
    apiForLastTnx();
  }, []);

  const filter =
    debitsOrCredits == ""
      ? lastTnx
      : lastTnx.filter((each) => each.type == debitsOrCredits);

  const failureView = () => <p>Somthing went wrong! please try again...</p>;

  const transactionsPageInprogressView = () => (
    <div style={{ height: "3vh" }}>
      {" "}
      <MagnifyingGlass />
    </div>
  );

  const transactionPageSuccessView = () => (
    <tbody>
      {filter.map((each) => (
        <EachTnx single={each} key={each.id} apiForLastTnx={apiForLastTnx} />
      ))}
    </tbody>
  );

  const finalTransactionPageView = () => {
    switch (transactionsPageApiStatus) {
      case apiConstains.success:
        return transactionPageSuccessView();
      case apiConstains.failure:
        return failureView();
      default:
        return transactionsPageInprogressView();
    }
  };

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
          <table className="table-last-tnx">{finalTransactionPageView()}</table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
