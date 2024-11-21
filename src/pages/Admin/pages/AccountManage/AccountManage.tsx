import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './AccountManage.css';
import { useAccountContext } from '../../../../context/AccountContext';

const AccountManage = () => {
  const { accounts, roles, deleteAccount, filterAccounts } = useAccountContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleEditAccount = (id: number) => {
    const accountToEdit = accounts.find((account) => account.id === id);
    if (accountToEdit) {
      navigate(`/admin/account-edit/${id}`, { state: { account: accountToEdit } });
    }
  };

  const handleDeleteAccount = (id: number) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      deleteAccount(id);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterAccounts(searchValue);
  };

  const handleNavigateToAddAccount = () => {
    navigate('/admin/account-add');
  };

  return (
    <div className="admin-dashboard-hungkc">
      <Navbar />
      <div className="dashboard-container-hungkc">
        <Sidebar />
        <main className="dashboard-main-hungkc">
          <div className="account-manage-hungkc">
            <div className="account-manage-header-hungkc">
              <button className="add-account-btn-hungkc" onClick={handleNavigateToAddAccount}>
                Add Account
              </button>
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar-hungkc"
              />
            </div>

            <table className="account-table-hungkc">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => {
                  const roleName = roles.find((role) => role.roleId === account.roleId)?.roleName || 'Unknown';
                  return (
                    <tr key={account.id}>
                      <td>{index + 1}</td>
                      <td>{account.username}</td>
                      <td>{roleName}</td>
                      <td>
                        <img
                          src={account.image}
                          alt={account.username}
                          className="account-image-hungkc"
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="action-icon-hungkc edit-icon-hungkc"
                          onClick={() => handleEditAccount(account.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="action-icon-hungkc delete-icon-hungkc"
                          onClick={() => handleDeleteAccount(account.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountManage;
