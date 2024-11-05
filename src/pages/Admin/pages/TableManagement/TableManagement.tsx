import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './TableManagement.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

interface TableData {
  id: number;
  name: string;
  qrCode: string;
  status: boolean;
}

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([
    { id: 1, name: 'Table 1', qrCode: 'QR1', status: true },
    { id: 2, name: 'Table 2', qrCode: 'QR2', status: false },
    { id: 3, name: 'Table 3', qrCode: 'QR3', status: true },
  ]);
  const [newTableName, setNewTableName] = useState('');
  const [editingTableId, setEditingTableId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [notification, setNotification] = useState('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  // Add a new table
  const addTable = () => {
    if (newTableName.trim() === '') return;
    const newTable: TableData = {
      id: tables.length + 1,
      name: newTableName,
      qrCode: `QR${tables.length + 1}`,
      status: true,
    };
    setTables([...tables, newTable]);
    setNewTableName('');
    showNotification('Table added successfully!');
  };

  // Edit table name
  const editTable = (id: number, name: string) => {
    setEditingTableId(id);
    setEditedName(name);
  };

  // Save edited table name
  const saveEditedTable = () => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === editingTableId ? { ...table, name: editedName } : table
      )
    );
    setEditingTableId(null);
    setEditedName('');
    showNotification('Table name updated successfully!');
  };

  // Toggle table status (soft delete)
  const toggleStatus = (id: number) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, status: !table.status } : table
      )
    );
    showNotification('Table status changed!');
  };

  // Display notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Show confirmation modal
  const showConfirmation = (action: () => void) => {
    setConfirmAction(() => action);
  };

  // Handle confirmation
  const confirmActionHandler = () => {
    if (confirmAction) confirmAction();
    setConfirmAction(null);
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div className="table-management">
            {notification && <div className="notification show">{notification}</div>}

            <div className="table-management-header">
              <input
                type="text"
                placeholder="Enter table name"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="new-table-input"
              />
              <button
                className="add-table-btn"
                onClick={() => showConfirmation(addTable)}
              >
                Add Table
              </button>
              <input type="text" placeholder="Search" className="search-bar" />
            </div>

            <table className="table-management-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>QR Code</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table, index) => (
                  <tr key={table.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingTableId === table.id ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="editing-input"
                        />
                      ) : (
                        table.name
                      )}
                    </td>
                    <td>
                      <FaEye className="icon-view" />
                    </td>
                    <td>
                      <span className={table.status ? 'status-active' : 'status-inactive'}>
                        {table.status ? '✓' : '✗'}
                      </span>
                    </td>
                    <td>
                      {editingTableId === table.id ? (
                        <>
                          <button className="save-btn" onClick={() => showConfirmation(saveEditedTable)}>Save</button>
                          <button className="cancel-btn" onClick={() => setEditingTableId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon-edit" onClick={() => editTable(table.id, table.name)} />
                          <FaTrash className="icon-delete" onClick={() => showConfirmation(() => toggleStatus(table.id))} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {confirmAction && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Are you sure you want to proceed with this action?</p>
                <button className="confirm-btn" onClick={confirmActionHandler}>Yes</button>
                <button className="cancel-btn" onClick={() => setConfirmAction(null)}>No</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TableManagement;
