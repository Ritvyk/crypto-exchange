import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { WEBSOCKET_URL } from "./routes";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const USER = {
  userName: "ritvyk",
  password: "ritvik123",
  fullName: "Ritvik Gupta",
  email: "ritvyk@gmail.com",
};

function App() {
  const socket = io.connect(WEBSOCKET_URL);
  const [prices, setPrices] = useState([]);
  const [networkIssues, setNetworkIssues] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("crypto_prices:receive", (response) => {
      if (response && response.data && response.data.length > 0) {
        setPrices(response.data);
        setNetworkIssues(false);
      }
      if (response.statusCode === 204) {
        setNetworkIssues(true);
      }
    });
    socket.on("auth_response", (res) => {
      if (res.status === "OK") {
        if (!authSuccess) {
          setAuthSuccess(true);
          socket.emit("crypto_prices:fetch");
        }
      } else {
        if (authSuccess) {
          setAuthSuccess(false);
        }
      }
    });
  }, [socket]);

  socket.on("connect", (_data) => {
    if (!connected) {
      setConnected(true);
      socket.emit("auth", USER);
    }
  });

  return (
    <div className="min-h-screen">
      <Header user={USER} authSuccess={authSuccess} connected={connected} />
      <Dashboard
        authSuccess={authSuccess}
        prices={prices}
        connected={connected}
        networkIssues={networkIssues}
      />
    </div>
  );
}

export default App;
