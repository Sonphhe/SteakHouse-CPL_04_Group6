import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../../../context/AccountContext';
import './AccountAdd.css';

const AccountAdd = () => {
  const { addAccount, accounts } = useAccountContext(); // Use accounts from context
  const navigate = useNavigate();

  // Role options
  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'cashier' },
    { id: 3, name: 'customer' },
  ];

  const [accountData, setAccountData] = useState({
    username: '',
    password: '',
    roleId: roles[0].id, // Default role
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Get file name
      const imagePath = `/assets/images/${fileName}`; // Construct path
      setAccountData((prev) => ({ ...prev, image: imagePath })); // Save to state
    }
  };

  const calculateMaxId = () => {
    let maxId = accounts.length > 0 ? Math.max(...accounts.map((acc) => parseInt(acc.id))) : 0;
    return maxId;
  };

  const handleAddNewAccount = () => {
    if (!accountData.username.trim() || !accountData.password.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const maxId = calculateMaxId(); // Calculate the highest ID
    const newId = (maxId + 1).toString(); // Increment ID

    // Create new account
    const newAccount = { ...accountData, id: newId };

    // Add account to context
    addAccount(newAccount).then(() => {
      navigate('/admin/account-management'); // Navigate after adding
    });
  };

  return (
    <div className="admin-dashboard-add">
      <div className="dashboard-container-add">
        <main className="dashboard-main-add">
          <div className="add-container">
            <h2>Add New Account</h2>
            <div className="add-form">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={accountData.username}
                  onChange={handleInputChange}
                  className="large-input"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={accountData.password}
                  onChange={handleInputChange}
                  className="large-input"
                />
              </div>

              <div className="form-group">
                <label>Role:</label>
                <select
                  name="roleId"
                  value={accountData.roleId}
                  onChange={handleInputChange}
                  className="large-input"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={accountData.image}
                  onChange={handleInputChange}
                  className="large-input"
                />
              </div>

              <div className="form-group">
                <label>Choose Image:</label>
                <input
                  id="fileInput-HKC"
                  className="file-input-HKC"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleAddNewAccount}>
                  Add Account
                </button>
                <button className="cancel-btn" onClick={() => navigate('/admin/account-management')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountAdd;
