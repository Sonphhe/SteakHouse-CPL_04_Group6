import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AccountEdit.css';
import { useAccountContext } from '../../../../context/AccountContext';

const AccountEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { editAccount, roles } = useAccountContext();
  const account = location.state?.account;

  const [editedAccount, setEditedAccount] = useState({
    username: account?.username || '',
    password: account?.password || '',
    roleId: account?.roleId || roles[0]?.roleId || 1, // Default role
    image: account?.image || '',
    id: account?.id || '', // Updated to string
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



useEffect(() => {
  if (!account) {
    alert('No account data received! Redirecting...');
    navigate('/admin/account-management');
  } else {
    console.log('Account data:', account); // Debug
  }
}, [account, navigate]);

if (!account) {
  return <p>Loading...</p>; // Dự phòng nếu không có dữ liệu
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({
      ...prev,
      [name]: name === 'roleId' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Get file name
      const imagePath = `/assets/images/${fileName}`; // Create temporary path
      setEditedAccount((prev) => ({ ...prev, image: imagePath })); // Update state
    }
  };

  const handleSave = async () => {
    if (!editedAccount.username.trim() || !editedAccount.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await editAccount(editedAccount.id, editedAccount);
      navigate('/admin/account-management');
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Changes will not be saved.')) {
      navigate('/admin/account-management');
    }
  };

  return (
    <div className="admin-dashboard-accEdit">
      <Navbar />
      <div className="dashboard-container-accEdit">
        <Sidebar />
        <main className="dashboard-main-accEdit">
          <div className="account-edit-container">
            <h2>Edit Account</h2>
            <form className="account-edit-form">
              {error && <p className="error-message">{error}</p>}
              {loading && <p className="loading-message">Saving changes...</p>}

              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editedAccount.username}
                onChange={handleInputChange}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={editedAccount.password}
                onChange={handleInputChange}
                required
              />

              <label>Role:</label>
              <select
                name="roleId"
                value={editedAccount.roleId}
                onChange={handleInputChange}
              >
                {roles.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </option>
                ))}
              </select>

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={editedAccount.image}
                onChange={handleInputChange}
                readOnly
              />

              <label>Choose Image:</label>
              <input
                id="fileInput-HKC"
                className="file-input-HKC"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="actions">
                <button type="button" onClick={handleSave} disabled={loading}>
                  Save Changes
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountEdit;
