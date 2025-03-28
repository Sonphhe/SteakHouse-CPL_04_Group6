import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface RoleType {
  roleId: number;
  roleName: string;
  id: string; // `id` là kiểu `string`
}

interface AccountType {
  id: string; // `id` là kiểu `string`
  username: string;
  password: string;
  roleId: number;
  image: string;
  reason: string;
}

interface AccountContextType {
  accounts: AccountType[];
  roles: RoleType[];
  addAccount: (account: AccountType) => Promise<void>;
  editAccount: (id: string, updatedAccount: Partial<AccountType>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  filterAccounts: (searchTerm: string) => void;
  banAccount: (id: string, reason: string) => void; 
  unbanAccount: (id: string) => Promise<void>;      
}


const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch accounts and roles on initial load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const accountsResponse = await axios.get(`${API_ROOT}/account`);
        const rolesResponse = await axios.get(`${API_ROOT}/role`);
        setAccounts(accountsResponse.data);
        setRoles(rolesResponse.data);
        setFilteredAccounts(accountsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch accounts or roles.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add a new account
  const addAccount = useCallback(async (account: Omit<AccountType, 'id'>) => {
    try {
      const response = await axios.post(`${API_ROOT}/account`, account);
      setAccounts((prev) => [...prev, response.data]);
      setFilteredAccounts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding account:', error);
      setError('Failed to add account.');
    }
  }, []);

  // Edit an existing account
  const editAccount = useCallback(async (id: string, updatedAccount: Partial<AccountType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/account/${id}`, updatedAccount);
      setAccounts((prev) =>
        prev.map((account) => (account.id === id ? { ...account, ...response.data } : account))
      );
      setFilteredAccounts((prev) =>
        prev.map((account) => (account.id === id ? { ...account, ...response.data } : account))
      );
    } catch (error) {
      console.error('Error editing account:', error);
      setError('Failed to edit account.');
    }
  }, []);

  // Delete an account by ID
  const deleteAccount = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_ROOT}/account/${id}`);
      setAccounts((prev) => prev.filter((account) => account.id !== id));
      setFilteredAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account.');
    }
  }, []);

  // Filter accounts by search term
  const filterAccounts = useCallback((searchTerm: string) => {
    if (!searchTerm) {
      setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter((account) =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAccounts(filtered);
    }
  }, [accounts]);

  const banAccount = useCallback(async (id: string, reason: string) => {
    try {
      // Tìm account hiện tại
      const currentAccount = accounts.find(account => account.id === id);
      
      if (!currentAccount) {
        setError('Account not found');
        return;
      }
  
      // Tạo object update
      const updatedAccount = {
        ...currentAccount,
        reason: reason
      };
  
      const response = await axios.put(`${API_ROOT}/account/${id}`, updatedAccount);
      
      // Cập nhật state local
      setAccounts((prev) => 
        prev.map((account) => 
          account.id === id 
            ? { ...account, reason } 
            : account
        )
      );
      
      setFilteredAccounts((prev) => 
        prev.map((account) => 
          account.id === id 
            ? { ...account, reason } 
            : account
        )
      );
    } catch (error) {
      console.error('Error banning account:', error);
      setError('Failed to ban account.');
    }
  }, [accounts]); 
  
  const unbanAccount = useCallback(async (id: string) => {
    try {
      // Tìm account hiện tại
      const currentAccount = accounts.find(account => account.id === id);
      
      if (!currentAccount) {
        setError('Account not found');
        return;
      }
  
      // Tạo object update
      const updatedAccount = {
        ...currentAccount,
        reason: '' // Đặt reason thành chuỗi rỗng
      };
  
      const response = await axios.put(`${API_ROOT}/account/${id}`, updatedAccount);
      
      // Cập nhật state local
      setAccounts((prev) => 
        prev.map((account) => 
          account.id === id 
            ? { ...account, reason: '' } 
            : account
        )
      );
      
      setFilteredAccounts((prev) => 
        prev.map((account) => 
          account.id === id 
            ? { ...account, reason: '' } 
            : account
        )
      );
    } catch (error) {
      console.error('Error unbanning account:', error);
      setError('Failed to unban account.');
    }
  }, [accounts]); 
  return (
    <AccountContext.Provider
      value={{
        accounts: filteredAccounts,
        roles,
        addAccount,
        editAccount,
        deleteAccount,
        filterAccounts,
        banAccount,
        unbanAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};
