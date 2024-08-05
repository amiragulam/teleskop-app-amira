import React, { useState, useEffect, useCallback } from "react";
import { fetchStockData } from "../components/alphaVantageService";
import MarketDetailChart from "../pages/MarketDetailChart";
import moment from "moment";

const ITEMS_PER_PAGE = 10;

const MarketDataList = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMarketData = useCallback(
    async (page) => {
      try {
        const response = await fetchStockData(symbol);
        const timeSeries = response["Time Series (Daily)"];
        if (!timeSeries) {
          throw new Error("Time Series (Daily) data not found in response");
        }

        const dataArray = Object.entries(timeSeries).map(([date, values]) => {
          const parseNumber = (value) => {
            const number = parseFloat(value);
            return isNaN(number) ? 0 : number;
          };

          return {
            date: moment(date).format("DD MMM YYYY"),
            open: parseNumber(values["1. open"]),
            high: parseNumber(values["2. high"]),
            low: parseNumber(values["3. low"]),
            close: parseNumber(values["4. close"]),
            volume: parseNumber(values["6. volume"]),
            adjustedClose: parseNumber(values["5. adjusted close"]),
          };
        });

        const paginatedData = dataArray.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        );
        setData(paginatedData);
        setTotalPages(Math.ceil(dataArray.length / ITEMS_PER_PAGE));
        setLoading(false);
      } catch (err) {
        console.error("Detailed error:", err);
        setError(
          "Error fetching market data. Please check the console for details."
        );
        setLoading(false);
      }
    },
    [symbol]
  );

  useEffect(() => {
    fetchMarketData(page);
  }, [fetchMarketData, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getChangeStyle = (close, open) => {
    return close >= open ? "text-green-500" : "text-red-500";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);

  return (
    <div className="mb-10">
      <h1 className="text-xl font-bold mb-4">Market Data for {symbol}</h1>
      <MarketDetailChart data={data} />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Open
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                High
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Low
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Close
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Adjusted Close
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((entry) => (
              <tr key={entry.date}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${parseFloat(entry.open).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${parseFloat(entry.high).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${parseFloat(entry.low).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${parseFloat(entry.close).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {parseFloat(entry.volume).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${parseFloat(entry.adjustedClose).toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${getChangeStyle(
                    entry.close,
                    entry.open
                  )}`}
                >
                  {(((entry.close - entry.open) / entry.open) * 100).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-5 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-slate-800 text-white font-bold rounded-md"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-slate-800 text-white font-bold rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketDataList;
