import React from "react";
import Navbar from "../components/Navbar";
import StockData from "../components/StockData";
import CoinGecko from "../components/CoinGecko";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="App p-8">
        <div className="container mx-auto">
          <StockData symbol="AAPL" />
          <CoinGecko />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
