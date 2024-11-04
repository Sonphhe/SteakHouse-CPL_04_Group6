import React from 'react';
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
  const tables: TableData[] = [
    { id: 1, name: 'Bàn 1', qrCode: 'QR1', status: true },
    { id: 2, name: 'Bàn 2', qrCode: 'QR2', status: false },
    { id: 3, name: 'Bàn 3', qrCode: 'QR3', status: true },
  ];

  return (
    <div>
      <Navbar />
      <div className="table-management-container">
        <Sidebar />
        <div className="table-content">
          <div className="table-inner-container">
            <button className="add-table-btn">Add Table</button>
            <table>
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
                    <td>{table.name}</td>
                    <td>
                      <FaEye className="icon-view" />
                    </td>
                    <td>
                      <span className={table.status ? 'status-active' : 'status-inactive'}>
                        {table.status ? '✓' : '✗'}
                      </span>
                    </td>
                    <td>
                      <FaEdit className="icon-edit" />
                      <FaTrash className="icon-delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
