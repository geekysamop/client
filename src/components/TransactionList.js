import axios from "axios";
import React from "react";

const TransactionList = ({ transactions, onRollback }) => {

  const handleRollback = async(id) => {

    const confirmation = window.confirm("Are you sure you want to Rollback");

    if(confirmation){
      const response = await axios.delete(`http://localhost:4000/api/transactions/${id}`)
      console.log(response.data);
      onRollback();
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">From Account</th>
              <th className="px-4 py-2">To Account</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Rollback</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b border-gray-400 bg-gray-300"
              >
                <td className="px-4 text-center py-2">{transaction.type}</td>
                <td className="px-4 text-center py-2">{transaction.amount}</td>
                {transaction.fromAccount ? (
                  <td className="px-4 text-center py-2">
                    {transaction.fromAccount.ownerName}
                  </td>
                ) : (
                  <td className="px-4 text-center py-2">-</td>
                )}
                {transaction.toAccount ? (
                  <td className="px-4 text-center py-2">
                    {transaction.toAccount.ownerName}
                  </td>
                ) : (
                  <td className="px-4 text-center py-2">-</td>
                )}

                <td className="px-4 text-center py-2">
                  {new Date(transaction.date).toLocaleString()}
                </td>
                <td className="flex justify-center">
                  <button className="px-4 py-1 bg-gray-500 text-white hover:bg-gray-600"
                  onClick={(e)=>handleRollback(transaction._id)}
                  >
                    Rollback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
