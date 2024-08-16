import { useContext } from "react";
import AppContext from "../../context/appContext";
import { apiConstains } from "../ApiConstains";
import { InfinitySpin } from "react-loader-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";

type chartDataType = {
  transactionDate: Date;
  totalDebits: number;
  totalCredits: number;
};

const RechartsOverview = () => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);
  const [chartApiStatus, setChartApiStatus] = useState(apiConstains.initial);
  const contextVal = useContext(AppContext);

  const makingApiForOverview = async () => {
    setChartApiStatus(apiConstains.initial);
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
    if (res.ok === true) {
      setChartData(jsonRes);
      setChartApiStatus(apiConstains.success);
    } else {
      setChartApiStatus(apiConstains.failure);
    }
  };

  useEffect(() => {
    makingApiForOverview();
  }, [contextVal.refreshFlag]);

  const failureView = () => <p>Somthing went wrong! please try again...</p>;

  const chartInProgressView = () => (
    <div style={{ height: "3vh" }}>
      {" "}
      <InfinitySpin color="rgb(111, 111, 155)" />
    </div>
  );
  const DataFormatter = (number: number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };
  const chartSuccessView = () => (
    <div className="chart-style">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="transactionDate"
            tick={{
              stroke: "gray",
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="totalDebits"
            name="totalDebits"
            fill="#1f77b4"
            barSize="15%"
          />
          <Bar
            dataKey="totalCredits"
            name="totalCredits"
            fill="#fd7f0e"
            barSize="15%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const finalChartView = () => {
    switch (chartApiStatus) {
      case apiConstains.success:
        return chartSuccessView();
      case apiConstains.failure:
        return failureView();
      default:
        return chartInProgressView();
    }
  };

  return <div>{finalChartView()}</div>;
};

export default RechartsOverview;
