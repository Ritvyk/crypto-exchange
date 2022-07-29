import React from "react";
import { roundUpFloat, isRising, difference } from "../utils";
import BTC from "../assets/images/BTC.png";
import ETH from "../assets/images/ETH.png";
import ENJ from "../assets/images/ENJU.png";
import GRT from "../assets/images/GRT.png";

const CRYPTO_IMAGES = {
  BTCUSDT: BTC,
  ETHUSDT: ETH,
  ENJUSDT: ENJ,
  GRTUSDT: GRT,
};

const Dashboard = ({ authSuccess, connected, prices, networkIssues }) => {
  return (
    <div className="w-3/4 rounded-sm shadow  p-4 mx-auto mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="text-md text-indigo-500 flex justify-start items-center">
          <span>Crypto Dashboard</span>
        </div>
      </div>
      {/* Main Section */}
      <div className="">
        {authSuccess && connected ? (
          <CryptoPrices prices={prices} />
        ) : (
          <UnauthorizedUser />
        )}
      </div>
    </div>
  );
};

const CryptoPrices = ({ prices }) => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-2">
      {prices.length > 0 ? (
        prices.map((crypto) => {
          return (
            <div key={crypto.symbol} className="col-span-3">
              <CryptoCard crypto={crypto} />
            </div>
          );
        })
      ) : (
        <div className="text-xl col-span-12 text-gray-600 text-bold flex justify-center items-center">
          Loading ...
        </div>
      )}
    </div>
  );
};

// {
//     "symbol": "BTCUSDT",
//     "priceChange": "1092.13000000",
//     "priceChangePercent": "4.754",
//     "weightedAvgPrice": "23628.50782820",
//     "prevClosePrice": "22972.45000000",
//     "lastPrice": "24064.63000000",
//     "lastQty": "0.01000000",
//     "bidPrice": "24065.01000000",
//     "bidQty": "0.01038000",
//     "askPrice": "24067.00000000",
//     "askQty": "0.01038000",
//     "openPrice": "22972.50000000",
//     "highPrice": "24442.66000000",
//     "lowPrice": "22582.13000000",
//     "volume": "234687.67075000",
//     "quoteVolume": "5545319465.49775290",
//     "openTime": 1659003315285,
//     "closeTime": 1659089715285,
//     "firstId": 1533733579,
//     "lastId": 1540514363,
//     "count": 6780785
// },

const CryptoCard = ({ crypto }) => {
  return (
    <div className="border rounded-sm p-2 border-solid">
      <div className="flex justify-start items-center">
        <img src={CRYPTO_IMAGES[crypto.symbol]} className="w-10 h-10" alt="" />
        <span className="text-gray-500 ml-3 font-fold text-sm ">
          {crypto.symbol}
          {isRising(crypto.prevClosePrice, crypto.lastPrice) ? (
            <span className="text-sm text-green-600 flex justify-start items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <CryptoPriceBlock crypto={crypto} />
            </span>
          ) : (
            <span className="text-sm text-red-600 flex justify-start items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <CryptoPriceBlock crypto={crypto} />
            </span>
          )}
        </span>
      </div>
      <div className="border-t-1 mt-4 border-b-0 border-l-0 border-r-0 border border-solid border-gray-200">
        <div className="grid grid-cols-2 gap-1 mt-2">
          <div
            style={{ fontSize: "10px" }}
            className="col-span-1 text-gray-500  flex justify-start items-center"
          >
            Open: ${roundUpFloat(crypto.openPrice)}
          </div>
          <div
            style={{ fontSize: "10px" }}
            className="col-span-1 text-gray-500 flex justify-start items-center"
          >
            Today's High: ${roundUpFloat(crypto.highPrice)}
          </div>
          <div
            style={{ fontSize: "10px" }}
            className="col-span-1 text-gray-500  flex justify-start items-center"
          >
            Today's Low: ${roundUpFloat(crypto.lowPrice)}
          </div>
          <div
            style={{ fontSize: "10px" }}
            className="col-span-1 text-gray-500  flex justify-start items-center"
          >
            Volume: {roundUpFloat(crypto.volume)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CryptoPriceBlock = ({ crypto }) => {
  return (
    <>
      <span style={{ fontSize: "12px" }}>
        ${roundUpFloat(crypto.lastPrice)}
      </span>{" "}
      <span style={{ fontSize: "10px" }}>
        ({difference(crypto.prevClosePrice, crypto.lastPrice) > 0 ? "+" : "-"}$
        {roundUpFloat(crypto.priceChange)})
      </span>{" "}
      <span style={{ fontSize: "10px" }}>(%{crypto.priceChangePercent})</span>
    </>
  );
};

const UnauthorizedUser = (props) => {
  return (
    <div>
      <span className="text-xl text-gray-600 text-bold flex justify-center items-center">
        <span>Oop! Unauthorized user</span>
        <span className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </span>
    </div>
  );
};

export default Dashboard;
