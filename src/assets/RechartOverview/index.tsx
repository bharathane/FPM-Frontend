import { useContext } from "react";
import AppContext from "../../context/appContext";
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
  const contextVal = useContext(AppContext);

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
  }, [contextVal.refreshFlag]);

  const DataFormatter = (number: number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };

  return (
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
};

export default RechartsOverview;
