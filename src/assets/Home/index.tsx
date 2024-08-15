import HeadNav from "../HeadNav";
import LeftNav from "../LeftNav";
import TotalCreditDebit from "../TotalCreditDebit";
import "./index.css";
import RechartsOverview from "../RechartOverview";
import LastTnx from "../LastTnx";

const Home = () => {
  return (
    <div className="home-wrapper-container">
      <LeftNav />

      <div className="home-con">
        <HeadNav />
        <div className="content-container">
          <TotalCreditDebit />
          <LastTnx />
          <RechartsOverview />
        </div>
      </div>
    </div>
  );
};

export default Home;
