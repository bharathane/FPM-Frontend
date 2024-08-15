import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./assets/Register";
import Login from "./assets/Login";
import ProtectedRoute from "./assets/ProtectedRoute";
import TransactionsPage from "./assets/TransactionsPage";
import Home from "./assets/Home";
import AppContext from "./context/appContext";
import Profile from "./assets/Profile";
import "./App.css";
const App = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const [freshFlag, setFreshFlag] = useState<boolean>(false);

  const setRefreshFlag = () => {
    setFreshFlag((prev) => !prev);
  };

  const setShowLeftNav = () => {
    setIsShowMenu((prevStatte) => !prevStatte);
  };
  return (
    <AppContext.Provider
      value={{
        showLeftNav: isShowMenu,
        refreshFlag: freshFlag,
        setShowLeftNav,
        setRefreshFlag,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/Reports" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
