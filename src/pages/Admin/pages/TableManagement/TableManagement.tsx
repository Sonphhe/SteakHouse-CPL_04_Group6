import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaUndoAlt } from 'react-icons/fa';
import './TableManagement.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

interface TableData {
  id: string;
  name: string;
  qrCode: string;
  status: boolean;
}

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([]);
  const [newTableName, setNewTableName] = useState('');
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [notification, setNotification] = useState('');
  const [showEditConfirm, setShowEditConfirm] = useState(false); // Modal xác nhận chỉnh sửa

  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetch('http://localhost:9999/tables');
      const data = await response.json();
      setTables(data);
    };

    fetchTables();
  }, []);

  const addTable = async () => {
    if (newTableName.trim() === '') return;

    const newTable: TableData = {
      id: (tables.length + 1).toString(),
      name: newTableName,
      qrCode: `QR${tables.length + 1}`,
      status: true,
    };

    const response = await fetch('http://localhost:9999/tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTable),
    });

    if (response.ok) {
      const addedTable = await response.json();
      setTables([...tables, addedTable]);
      setNewTableName('');
      showNotification('Table added successfully!');
    }
  };

  const editTable = (id: string, name: string) => {
    setEditingTableId(id);
    setEditedName(name);
  };

  const saveEditedTable = async () => {
    if (editingTableId === null) return;

    const tableToEdit = tables.find((table) => table.id === editingTableId);

    if (tableToEdit) {
      setShowEditConfirm(true); // Show confirmation before saving
    }
  };

  const confirmSaveEdit = async () => {
    if (editingTableId === null) return;

    const tableToEdit = tables.find((table) => table.id === editingTableId);

    if (tableToEdit) {
      const updatedTable = {
        ...tableToEdit,
        name: editedName,
      };

      const response = await fetch(`http://localhost:9999/tables/${editingTableId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTable),
      });

      if (response.ok) {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === editingTableId ? updatedTable : table
          )
        );
        setEditingTableId(null);
        setEditedName('');
        showNotification('Table name updated successfully!');
        setShowEditConfirm(false); // Close confirmation modal
      }
    }
  };

  const cancelEdit = () => {
    setEditingTableId(null);
    setEditedName('');
    setShowEditConfirm(false); // Close confirmation modal
  };

  const toggleTableStatus = async (id: string) => {
    const tableToToggle = tables.find((table) => table.id === id);

    if (tableToToggle) {
      const updatedTable = {
        ...tableToToggle,
        status: !tableToToggle.status,
      };

      const response = await fetch(`http://localhost:9999/tables/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTable),
      });

      if (response.ok) {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === id ? updatedTable : table
          )
        );
        showNotification(`Table status updated successfully!`);
      }
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  return (

    <div className="admin-dashboard">
     
      <div className="dashboard-container">
        <main className="dashboard-mainTMHKC">
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
                onClick={addTable}
              >
                Add Table
              </button>
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
                    <td className="edit-column">
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
                      <a
                        href={`https://quickchart.io/qr?text=http://10.33.15.246:8080/SWP391-SteakHouse/home?idTable=${table.id}&caption=Table${table.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEye className="icon-view" />
                      </a>
                    </td>
                    <td>
                      <span className={table.status ? 'status-active' : 'status-inactive'}>
                        {table.status ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="icon-column">
                      {editingTableId === table.id ? (
                        <>
                          <button className="save-btn" onClick={saveEditedTable}>Save</button>
                          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          {table.status ? (
                            <FaTrashAlt
                              className="icon-delete"
                              onClick={() => toggleTableStatus(table.id)}
                            />
                          ) : (
                            <FaUndoAlt
                              className="icon-restore"
                              onClick={() => toggleTableStatus(table.id)}
                            />
                          )}
                          <FaEdit className="icon-edit" onClick={() => editTable(table.id, table.name)} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showEditConfirm && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Are you sure you want to save this edit?</p>
                <button className="confirm-btn" onClick={confirmSaveEdit}>Yes</button>
                <button className="cancel-btn" onClick={cancelEdit}>No</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TableManagement;
