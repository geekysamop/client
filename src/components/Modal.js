import React, { useState } from "react";
import axios from 'axios';

const Modal = ({
  isOpen,
  onClose,
  selectedUser,
  fetchSelectedAccount
}) => {
  const [formData, setFormData] = useState({
    id: "",
    amount: "",
    toName: "",
  });

  const [selectedForm, setSelectedForm] = useState("deposit");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDepositSubmit = async (e, id) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:4000/api/accounts/${id}/deposit`,formData);
        fetchSelectedAccount(id);
    } catch (error) {
        console.log(error.response.data);
    }
  };

  const handleWithdrawSubmit = async (e,id) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:4000/api/accounts/${id}/withdraw`,formData);
        fetchSelectedAccount(id);
    } catch (error) {
        console.log(error.response.data);
    }
  };

  const handleTransferSubmit = async(e,id) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:4000/api/accounts/${id}/transfer`,formData);
        fetchSelectedAccount(id);
    } catch (error) {
        console.log(error.response.data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">Modal Header</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                X
              </span>
            </button>
          </div>
          <div className="relative px-6 py-2 flex-auto">
            <div className="flex justify-between font-bold">
              <div>{selectedUser.ownerName}</div>
              <div>{selectedUser.balance}</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Action:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>

            {selectedForm === "deposit" && (
              <form onSubmit={(e) => handleDepositSubmit(e, selectedUser._id)} className="mb-4">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Deposit
                </button>
              </form>
            )}

            {selectedForm === "withdraw" && (
              <form onSubmit={(e) => handleWithdrawSubmit(e, selectedUser._id)} className="mb-4">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Withdraw
                </button>
              </form>
            )}

            {selectedForm === "transfer" && (
              <form onSubmit={(e) => handleTransferSubmit(e, selectedUser._id)} className="mb-4">
                <input
                  type="text"
                  name="toName"
                  value={formData.toName}
                  onChange={handleChange}
                  placeholder="To Account Name"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Transfer Amount"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Transfer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
