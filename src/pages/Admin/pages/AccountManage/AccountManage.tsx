import React, { useState } from 'react';
import { useAccountContext } from '../../../../context/AccountContext';
import './AccountManage.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import AccountEdit from '../AccountEdit/AccountEdit';
import { useNavigate } from 'react-router-dom';

type AccountRow = {
  id: string;
  username: string;
  role: string;
  image: string;
};

const AccountManage = () => {
  const { accounts, roles, banAccount,unbanAccount, filterAccounts } = useAccountContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountRow | null>(null);
  const [banReason, setBanReason] = useState('');
  const navigate = useNavigate();
  const handleNavigateToAddAccount = () => {
    navigate('/admin/account-add');
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterAccounts(searchValue);
  };

  const handleOpenEditModal = (account: AccountRow) => {
    setSelectedAccount(account);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedAccount(null);
  };

  const handleOpenBanModal = (account: AccountRow) => {
    setSelectedAccount(account);
    setBanModalOpen(true);
    setBanReason('');
  };

  const handleCloseBanModal = () => {
    setBanModalOpen(false);
    setSelectedAccount(null);
    setBanReason('');
  };

  const handleBanAccount = () => {
    if (selectedAccount && banReason.trim()) {
      banAccount(selectedAccount.id, banReason);
      handleCloseBanModal();
    }
  };
  const handleUnbanAccount = (account: AccountRow) => {
    if (account) {
      unbanAccount(account.id);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 180 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params: GridRenderCellParams<AccountRow, string>) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img
            src={params.value || '/assets/images/default-avatar.jpg'}
            alt={params.row.username}
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        </div>
      ),
    },
    {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    renderCell: (params: GridRenderCellParams) => {
      const account = params.row as AccountRow;
      const isBanned = accounts.find(a => a.id === account.id && a.reason);
      
      return (
        <>
          {!isBanned ? (
            <>
              <Button
                onClick={() => handleOpenEditModal(account)}
                startIcon={<EditIcon />}
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleOpenBanModal(account)}
                startIcon={<BlockIcon />}
                color="secondary"
              >
                Ban
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleUnbanAccount(account)}
              color="primary"
            >
              Unban
            </Button>
          )}
        </>
      );
    },
  },
];

  const rows = accounts.map((account) => ({
    id: account.id,
    username: account.username,
    role: roles.find((role) => role.roleId === account.roleId)?.roleName || 'Unknown',
    image: account.image,
  }));

  return (
    <div className="admin-dashboard-hungkc">
      <div className="dashboard-container-hungkc">
        <main className="dashboard-mainAM-hungkc">
          <div className="account-manage-hungkc">
            <div className="account-manage-header-hungkc">
              <Button variant="contained" color="primary" startIcon={<AddIcon />}
              onClick={()=>handleNavigateToAddAccount()}
              >
                Add Account
              </Button>
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar-hungkc"
              />
            </div>

            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>

            <Dialog
              open={editModalOpen}
              onClose={handleCloseEditModal}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Edit Account</DialogTitle>
              <DialogContent>
                {selectedAccount && (
                  <AccountEdit
                    account={selectedAccount}
                    onClose={handleCloseEditModal}
                    isModal={true}
                  />
                )}
              </DialogContent>
            </Dialog>

            <Dialog
              open={banModalOpen}
              onClose={handleCloseBanModal}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Ban User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Reason for Banning"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  multiline
                  rows={3}
                  placeholder="Please provide a reason for banning this user"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseBanModal} color="primary">
                  Cancel
                </Button>
                <Button 
                  onClick={handleBanAccount} 
                  color="secondary" 
                  disabled={!banReason.trim()}
                >
                  Ban User
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountManage;