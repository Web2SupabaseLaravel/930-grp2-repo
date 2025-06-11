import React from 'react';
import '../DashB_U_CSS/UserTable.css';

function UserTable({ users, onEdit, onDelete, onCreateUser }) {
  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2>All Users</h2>
       
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
