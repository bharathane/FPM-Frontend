import { useState, useEffect,useContext } from "react";
import Cookies from "js-cookie";
import { apiConstains } from "../ApiConstains";
import { InfinitySpin } from "react-loader-spinner";
import EachTnx from "../EachTransaction";
import AppContext from "../../context/appContext";
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

const LastTnx = () => {
  const [lastTnx, setLastTnx] = useState<eachTnxType[]>([]);
  const [lastTnxStatus, setLastTnxStatus] = useState(apiConstains.initial);
  const contextVal = useContext(AppContext);
  const apiForLastTnx = async () => {
    setLastTnxStatus(apiConstains.inprogress);
    const url = `https://fpm-backen-2.onrender.com/transactions/recent?username=${localStorage.getItem(
      "username"
    )}`;
    const jwtToken = Cookies.get("jwt_token");
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
      setLastTnxStatus(apiConstains.success);
    } else {
      setLastTnxStatus(apiConstains.failure);
    }
  };

  useEffect(() => {
    apiForLastTnx();
  }, [contextVal.refreshFlag]);

  const failureView = () => <p>Somthing went wrong! please try again...</p>;

  const lastTnxInprogressView = () => (
    <div style={{ height: "3vh" }}>
      {" "}
      <InfinitySpin color="rgb(111, 111, 155)" />
    </div>
  );

  const lastTnxSuccessView = () => (
    <tbody>
      {lastTnx.map((each) => (
        <EachTnx single={each} key={each.id} apiForLastTnx={apiForLastTnx} />
      ))}
    </tbody>
  );

  const finalLastTnxView = () => {
    switch (lastTnxStatus) {
      case apiConstains.success:
        return lastTnxSuccessView();
      case apiConstains.failure:
        return failureView();
      default:
        return lastTnxInprogressView();
    }
  };

  return (
    <div>
      <h3>Recent Transactions</h3>
      <table className="table-last-tnx">{finalLastTnxView()}</table>
    </div>
  );
};

export default LastTnx;
