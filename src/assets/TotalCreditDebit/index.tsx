import { useState, useEffect, useContext } from "react";
import { apiConstains } from "../ApiConstains";
import Cookies from "js-cookie";
import { DNA } from "react-loader-spinner";
import AppContext from "../../context/appContext";
import "./index.css";

const TotalCreditDebit = () => {
  const contextVal = useContext(AppContext);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const [totalCredApiCon, setTotaCredApiCon] = useState<String>(
    apiConstains.initial
  );

  const [totalDebits, setTotalDebits] = useState<number>(0);

  //making api call for total credits
  const apiForTotalCredits = async () => {
    setTotaCredApiCon(apiConstains.initial);
    const url = `https://fpm-backen-2.onrender.com/transactions/credits?username=${localStorage.getItem(
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
    const jsonRess = await res.json();
    if (res.ok == true) {
      setTotaCredApiCon(apiConstains.success);

      setTotalCredits(jsonRess);
    } else {
      setTotaCredApiCon(apiConstains.failure);
    }
  };

  // api call for total debits
  const apiForTotalDebits = async () => {
    const urlDebs = `https://fpm-backen-2.onrender.com/transactions/debits?username=${localStorage.getItem(
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
    const res = await fetch(urlDebs, options);
    const jsonRess = await res.json();
    if (res.ok == true) {
      setTotalDebits(jsonRess);
    }
  };
  useEffect(() => {
    apiForTotalCredits();
    apiForTotalDebits();
  }, [contextVal.refreshFlag]);

  const creditSuccessView = () => (
    <h1 className="credit-amount-h">+${totalCredits}</h1>
  );

  const debitSuccessView = () => (
    <h1 className="debit-amount-h">-${totalDebits}</h1>
  );

  const creditInprogressView = () => (
    <div style={{ height: "3vh" }}>
      {" "}
      <DNA />
    </div>
  );

  const failureView = () => <p>Somthing went wrong! please try again...</p>;

  //final view for credits
  const finalCreditView = () => {
    switch (totalCredApiCon) {
      case apiConstains.success:
        return creditSuccessView();
      case apiConstains.failure:
        return failureView();
      default:
        return creditInprogressView();
    }
  };

  //final view for debits
  const finalDebitsView = () => {
    switch (totalCredApiCon) {
      case apiConstains.success:
        return debitSuccessView();
      case apiConstains.failure:
        return failureView();
      default:
        return creditInprogressView();
    }
  };

  return (
    <div className="total-amouts-wrapper">
      <div className="total-amounts-class">
        <div>
          {finalCreditView()}
          <p>Credits</p>
        </div>
        <img
          src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1690703384/nus9gsfnxc71xybyxubr.svg"
          alt="creditsImage"
        />
      </div>
      <div className="total-amounts-class">
        <div>
          {finalDebitsView()}
          <p>Debits</p>
        </div>
        <img
          src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1723034039/Group_1_y5lqgr.png"
          alt="creditsImage"
        />
      </div>
    </div>
  );
};

export default TotalCreditDebit;
