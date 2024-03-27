import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAccountForm from './components/CreateAccountForm';
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner'
import TransactionList from './components/TransactionList'; // Import the TransactionList component

function App() {
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/accounts');
      const fetchedData = response.data;
      setAccounts(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSelectedAccount = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/accounts/${id}`);
    const selected = response.data;
      setSelectedUser(selected);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/transactions`);
    const transactionData = response.data;
    setTransactions(transactionData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const openModal = (id) => {
    fetchSelectedAccount(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAccount = () => {
    setShowAddAccountForm(true);
    setShowTransactions(false);
  };

  const handleShowAccounts = () => {
    setShowAddAccountForm(false);
    setShowTransactions(false);
  };

  const handleShowTransactions = () => {
    fetchTransactions();
    setShowAddAccountForm(false);
    setShowTransactions(true);
  };

  return (
    <div className="App">
      <div className='logo w-screen text-3xl text-center'>Banking Systuummm</div>
      <div className="menu-bar w-screen text-white flex justify-evenly">
        <button className='w-full p-5 hover:bg-slate-700' onClick={handleAddAccount}>Add Account</button>
        <button className='w-full p-5 hover:bg-slate-700' onClick={handleShowAccounts}>Show Account</button>
        <button className='w-full p-5 hover:bg-slate-700' onClick={handleShowTransactions}>Show Transactions</button>
      </div>
      {showAddAccountForm ? (
        <CreateAccountForm onAccountCreated={() => { setShowAddAccountForm(false); fetchAccounts(); }} />
      ) : (
        <>
          {showTransactions ? (
            <TransactionList onRollback={fetchTransactions} transactions={transactions} />
          ) : (
            !accounts ? <LoadingSpinner/> : <div className="grid grid-cols-3 gap-4 mb-5">
            {accounts.map((account, index) => (
              <button
                key={index}
                className="p-4 m-4 border text-white border-gray-300 rounded cursor-pointer hover:text-black hover:bg-gray-100"
                onClick={() => { openModal(account._id) }}
              >
                <p className="text-lg font-semibold">{account.ownerName}</p>
              </button>
            ))}
          </div>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} fetchSelectedAccount={fetchSelectedAccount} selectedUser={selectedUser} onClose={closeModal} />
    </div>
  );
}

export default App;
