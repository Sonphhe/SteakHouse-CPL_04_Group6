import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext';
import "./AdminLayout.css"
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface CurrentAccount {
  username?: string;
  image?: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [open, setOpen] = useState(false);
  const { currentAccount, logout, login } = useSteakHouseContext();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogin = () => {
    if (!currentAccount) {
      return;
    }
    login(currentAccount);
    navigate('/');
  };

  const isUsernameValid = (currentAccount: CurrentAccount | undefined): boolean => {
    return currentAccount?.username?.trim() !== "";
  };
  
  const isValid = isUsernameValid(currentAccount);

  if (!isValid) {
    return (
      <div className="admin-dashboard">
        <Navbar />
        <div className="admin-dashboard-container-1">
          <h2 className="admin-dashboard-message-1">
            You need to sign in as a administrator to continue
          </h2>
          <h2>Please Login</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={open} onToggle={handleDrawerToggle} />
        <Main open={open}>
          {children}
        </Main>
      </Box>
    </Box>
  );
};

export default AdminLayout;