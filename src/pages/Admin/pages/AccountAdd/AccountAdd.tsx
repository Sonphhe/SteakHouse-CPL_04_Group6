import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../../../context/AccountContext';
import './AccountAdd.css';

const AccountAdd = () => {
  const { addAccount, roles } = useAccountContext();
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState({
    username: '',
    password: '',
    roleId: roles[0]?.roleId || 1, // Default role
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
      const fileName = file.name; // Get the file name
      const imagePath = `/assets/images/${fileName}`; // Construct the path
      setAccountData((prev) => ({ ...prev, image: imagePath })); // Set the path in state
    }
  };

  const handleAddNewAccount = () => {
    if (!accountData.username.trim() || !accountData.password.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const newAccount = { ...accountData, id: Date.now() };
    addAccount(newAccount).then(() => {
      navigate('/admin/account-management');
    });
  };

  return (
    <div className="admin-dashboard-add-account-HKC">
      <Navbar />
      <div className="dashboard-container-add-account-HKC">
        <Sidebar />
        <main className="dashboard-main-add-account-HKC">
          <div className="account-add-container-HKC">
            <h2>Add New Account</h2>
            <div className="account-add-form-HKC">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={accountData.username}
                  onChange={handleInputChange}
                  className="large-input-HKC"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={accountData.password}
                  onChange={handleInputChange}
                  className="large-input-HKC"
                />
              </div>

              <div className="form-group">
                <label>Role:</label>
                <select
                  name="roleId"
                  value={accountData.roleId}
                  onChange={handleInputChange}
                  className="large-input-HKC"
                >
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
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
                  className="large-input-HKC"
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

              <div className="modal-actions-HKC">
                <button className="save-btn-HKC" onClick={handleAddNewAccount}>
                  Add Account
                </button>
                <button className="cancel-btn-HKC" onClick={() => navigate('/admin/account-management')}>
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
