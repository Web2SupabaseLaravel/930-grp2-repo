import React, { useState, useEffect } from 'react';
import axios from '../api';

const RoleRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoleRequests = async () => {
      try {
        const response = await axios.get('/role-requests'); // Changed to /role-requests
        setRequests(response.data.roleRequests || []); // Handle potential structure
      } catch (error) {
        console.error('Error fetching role requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/role-requests/${id}`, { status: newStatus });
      if (response.data.message) {
        setRequests(requests.map(request => request.id === id ? { ...request, status: newStatus } : request));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Manage Role Requests</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Current Role</th>
            <th>Requested Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user?.name || request.user_name || 'N/A'}</td> {/* Safe navigation */}
              <td>{request.current_role || request.currentRole || 'N/A'}</td>
              <td>{request.requested_role || request.requestedRole || 'N/A'}</td>
              <td>
                <select className="form-select" onChange={(e) => handleStatusChange(request.id, e.target.value)}>
                  <option>{request.status || 'Pending'}</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleRequests;