import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import "./index.css";

// Api constains for render view

export const apiConstains = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inprogress: "INPROGRESS",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSubmitError, setShowErrorMsg] = useState(false);
  const [apiStatus, setApiStatu] = useState(apiConstains.initial);

  const onSuccess = (jwtToken: string) => {
    setShowErrorMsg(false);
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    window.location.replace("/");
    setApiStatu(apiConstains.success);
  };

  const onFailure = (errorMsg: string) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
    setApiStatu(apiConstains.failure);
  };

  const onLoginClicked = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiStatu(apiConstains.inprogress);
    const userDetails = { username: username.toUpperCase(), password };

    const url = "https://fpm-backen-2.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.access_token === null) {
      setApiStatu(apiConstains.failure);
      onFailure(data.message);
    } else if (data.access_token1 !== null) {
      setApiStatu(apiConstains.success);
      onSuccess(data.access_token);
      localStorage.setItem("username", data.username);
    }
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // render final view based on apiStatus

  const renderLoader = () => {
    switch (apiStatus) {
      case apiConstains.success:
        return null;
      case apiConstains.inprogress:
        return (
          <div className="threedots-con">
            <ThreeDots />
          </div>
        );
      case apiConstains.failure:
        return null;
      default:
        return null;
    }
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {renderLoader()}
      <div className="bgCon">
        <div className="loginCon">
          <div className="imgContainer">
            <img
              src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1723007258/3d-money-coin-character-maintenance-free-png_hfngpk.png"
              alt="website login"
              className="books-image"
            />
          </div>
          <div className="inputCon">
            <img
              src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647488445/instaShareLogo_wfbdew.png"
              alt="website logo"
            />
            <h1>FPM</h1>
            <form className="formCon" onSubmit={onLoginClicked}>
              <label htmlFor="userName" className="labelTxt">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="inputEl"
                onChange={onChangeUsername}
              />
              <label htmlFor="password" className="labelTxt">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="inputEl"
                onChange={onChangePassword}
              />
              <button type="submit" className="btn">
                Login
              </button>
              {showSubmitError && <p className="err-msg">*{errorMsg}</p>}
              <p>
                Doesn't have an account ? <a href="register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
