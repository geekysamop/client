import React, { useState } from 'react';
import axios from 'axios';

function CreateAccountForm({onAccountCreated}) {
  const [balance, setBalance] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/accounts', { balance, ownerName });
      console.log(response.data);
      setSuccess(true);
      setError(null);
      onAccountCreated();
    } catch (err) {
      console.error('Error creating account:', err);
      setError('Error creating account. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 text-white">
      <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Account created successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Owner Name:</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="border text-black rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="border text-black rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccountForm;
