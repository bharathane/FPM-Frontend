import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import EachTnx from "../EachTransaction";
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

  const apiForLastTnx = async () => {
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
    }
  };

  useEffect(() => {
    apiForLastTnx();
  }, []);

  return (
    <div>
      <h3>Recent Transactions</h3>
      <table className="table-last-tnx">
        <tbody>
          {lastTnx.map((each) => (
            <EachTnx
              single={each}
              key={each.id}
              apiForLastTnx={apiForLastTnx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastTnx;
