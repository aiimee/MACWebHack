import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/loginPic.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setErrorMessage("");
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setSuccessMessage("");
      setErrorMessage("Invalid email or password");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center m-24">
      <div className="flex flex-row md:flex-row bg-[#FAF4E6] rounded-xl shadow-custom p-6 border-2 border-[#45473F] max-w-5xl w-full">
        <div className="flex-1 bg-black rounded-lg">
          <img
            src={img}
            alt="sunset"
            className="max-w-xs md:max-w-sm lg:max-w-md rounded-xl object-cover"
            style={{ flexShrink: 0 }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-start p-8 space-y-2 justify-center">
          <div className="mb-4 text-left">
            <h2 className="text-3xl font-semibold pb-3 text-[#31332C]">
              Welcome back...
            </h2>
            <p>Your TaskaGotchi misses you.</p>
          </div>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-600">{successMessage}</div>
          )}
          <form className="space-y-6">
            <input
              type="text"
              className="form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="bg-[#FAF4E6] hover:bg-[#FFBCF0] w-full text-[#45473F] font-bold py-3 px-6 rounded-lg shadow-custom transition duration-300 border-2 border-[#45473F]"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-left mt-3">
              Don't have an account? Sign up{" "}
              <span
                onClick={handleSignupClick}
                className="underline text-orange-600 cursor-pointer"
              >
                here
              </span>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
