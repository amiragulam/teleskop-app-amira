import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    name: "",
    quantity: 0,
    value: 0,
    change: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialAssets = [
      { id: 1, name: "AAPL", quantity: 10, value: 150, change: 0.5 },
      { id: 2, name: "GOOGL", quantity: 5, value: 2500, change: -0.2 },
      { id: 3, name: "TSLA", quantity: 8, value: 700, change: 1.3 },
    ];
    setAssets(initialAssets);
    setFilteredAssets(initialAssets);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      [name]: name === "name" ? value.toUpperCase() : parseFloat(value),
    }));
  };

  const handleAddAsset = () => {
    if (
      newAsset.name &&
      newAsset.quantity &&
      newAsset.value &&
      newAsset.change
    ) {
      const newId = assets.length > 0 ? assets[assets.length - 1].id + 1 : 1;
      const newAssetItem = { ...newAsset, id: newId };
      const updatedAssets = [...assets, newAssetItem];
      setAssets(updatedAssets);
      setFilteredAssets(updatedAssets);
      setNewAsset({ name: "", quantity: 0, value: 0, change: 0 });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteAsset = (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      const updatedAssets = assets.filter((asset) => asset.id !== id);
      setAssets(updatedAssets);
      setFilteredAssets(updatedAssets);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query) ||
        asset.quantity.toString().includes(query) ||
        asset.value.toString().includes(query) ||
        asset.change.toString().includes(query)
    );
    setFilteredAssets(filtered);
  };

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div>
      <Navbar />
      <div className="App p-8">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold mb-2">Assets Management</h1>

          <button
            onClick={handleToggleForm}
            className={`py-2 px-4 font-bold rounded mb-4 
        ${
          showForm
            ? "bg-red-800 hover:bg-red-900 text-white"
            : "bg-slate-800 hover:bg-slate-900 text-white"
        }`}
          >
            {showForm ? "Close" : "+ Add Asset"}
          </button>

          {showForm && (
            <div className="mb-5 bg-slate-200 p-5">
              <label className="block mb-1">Asset Name</label>
              <input
                type="text"
                name="name"
                value={newAsset.name}
                onChange={handleInputChange}
                placeholder="Asset Name"
                className="px-2 py-1 mr-2 border border-gray-300 w-full"
              />
              <label className="block mb-1 md:mt-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newAsset.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="px-2 py-1 mr-2 border border-gray-300 w-full"
              />
              <label className="block mb-1">Current Value</label>
              <input
                type="number"
                name="value"
                value={newAsset.value}
                onChange={handleInputChange}
                placeholder="Current Value"
                className="px-2 py-1 mr-2 border border-gray-300 w-full"
              />
              <label className="block mb-1 md:mt-2">Percentage Change</label>
              <input
                type="number"
                name="change"
                value={newAsset.change}
                onChange={handleInputChange}
                placeholder="Percentage Change"
                className="px-2 py-1 mr-2 border border-gray-300 w-full"
              />
              <button
                onClick={handleAddAsset}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold mt-4 py-2 px-4 rounded w-full"
              >
                Submit
              </button>
            </div>
          )}

          <label className="block mb-1">Search Assets</label>
          <input
            type="text"
            placeholder="Search by asset name..."
            className="mb-4 px-3 py-2 border border-slate-500 rounded-md w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 scroll-auto">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Asset Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Percentage Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {asset.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {asset.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      ${asset.value.toFixed(2)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        asset.change >= 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {asset.change.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <button
                        onClick={() => handleDeleteAsset(asset.id)}
                        className="bg-red-800 hover:bg-red-900 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;
