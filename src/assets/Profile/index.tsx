import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./index.css";
import LeftNav from "../LeftNav";
import HeadNav from "../HeadNav";

type chartDataType = {
  transactionDate: Date;
  totalDebits: number;
  totalCredits: number;
};
const Profile = () => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  const makingApiForOverview = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://fpm-backen-2.onrender.com/transactions/overview?username=${localStorage.getItem(
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
    setChartData(jsonRes);
  };

  useEffect(() => {
    makingApiForOverview();
  }, []);

  return (
    <div className="home-wrapper-container">
      <LeftNav />
      <div className="home-con">
        <HeadNav />
        <div className="content-container">
          <h1 className="profilepageName">
            hello {localStorage.getItem("username")} here your weekly reports !
          </h1>
          <div className="table-container">
            <table className="weeklyReport-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Credits</th>
                  <th>Total Debits</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((each) => (
                  <tr>
                    <td>{`${new Date(
                      each.transactionDate
                    ).getDate()}-${new Date(
                      each.transactionDate
                    ).getMonth()} - ${new Date(
                      each.transactionDate
                    ).getFullYear()}`}</td>
                    <td>{each.totalCredits}</td>
                    <td>{each.totalDebits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
