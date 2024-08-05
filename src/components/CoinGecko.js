import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const CryptoList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
          },
        }
      );
      setData(response.data);
      setFilteredData(response.data);
      setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (err) {
      setError(`Error fetching crypto data: ${err.message}`);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();
    const filtered = data.filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchLower) ||
        entry.symbol.toLowerCase().includes(searchLower)
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setPage(1);
  }, [searchQuery, data]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getChangeStyle = (percentChange) => {
    return percentChange >= 0 ? "text-green-700" : "text-red-700";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="mb-10">
      <h1 className="text-xl font-bold mb-4">Crypto Data</h1>
      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          className="mb-4 px-3 py-2 border border-slate-500 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Volume
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/crypto/${entry.id}`}
                    className="text-blue-900 hover:underline"
                  >
                    {entry.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.symbol.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${entry.current_price.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${getChangeStyle(
                    entry.price_change_percentage_24h
                  )}`}
                >
                  {entry.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${entry.market_cap.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${entry.total_volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
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

export default CryptoList;
