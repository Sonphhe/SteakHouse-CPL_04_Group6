import React, { useState, useEffect } from 'react';
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
  const [tables, setTables] = useState<TableData[]>([]);
  const [newTableName, setNewTableName] = useState('');
  const [editingTableId, setEditingTableId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [notification, setNotification] = useState('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  // Lấy dữ liệu từ database.json
  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetch('/database.json'); // Đảm bảo đường dẫn đúng
      const data = await response.json();
      setTables(data.tables); // Giả sử dữ liệu trong database.json có dạng { "tables": [...] }
    };
    
    fetchTables();
  }, []);

  // Thêm bàn mới
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

  // Chỉnh sửa tên bàn
  const editTable = (id: number, name: string) => {
    setEditingTableId(id);
    setEditedName(name);
  };

  // Lưu thay đổi tên bàn
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

  // Chuyển đổi trạng thái bàn
  const toggleStatus = (id: number) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, status: !table.status } : table
      )
    );
    showNotification('Table status changed!');
  };

  // Hiển thị thông báo
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Hiển thị modal xác nhận
  const showConfirmation = (action: () => void) => {
    setConfirmAction(() => action);
  };

  // Xử lý xác nhận
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


