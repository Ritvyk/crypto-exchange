import React from "react";
import cryptos from "../assets/images/cryptos.png";

const Header = ({ user, authSuccess, connected }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center">
        <img className="w-16 h-16" src={cryptos} alt="crypto exchange logo" />
        <span className="font-bold text-2xl text-gray-800 ml-2">
          Crypto Exchange
        </span>
        <div className="flex justify-start items-center ml-6">
          <span className="text-xs text-gray-500">Connected </span>{" "}
          {connected && authSuccess ? (
            <span className="text-green-600 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <span className="text-red-600 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-start items-center">
        {!authSuccess ? (
          <div>Login</div>
        ) : (
          <>
            <div className="text-gray-700">{user.fullName}</div>
            <div className="ml-2 text-gray-700 text-sm">{user.email}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
