import React, { useState, useEffect } from 'react';
import api from '../api';
import axios from 'axios';

const RoleRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoleRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/role-requests?page=1');
        console.log('Role Requests Response:', response);
        if (!response.data || typeof response.data !== 'object' || response.data instanceof ArrayBuffer) {
          throw new Error('Unexpected response format: Received HTML or non-JSON data');
        }
        if (!response.data.data) {
          throw new Error('Missing data field in response');
        }
        setRequests(response.data.data);
        setLastPage(response.data.pagination?.last_page || 1);
      } catch (error) {
        console.error('Fetch Error:', {
          message: error.message,
          response: error.response ? error.response.data : 'No response',
          status: error.response?.status,
          headers: error.response?.headers,
        });
        setError(`Failed to load role requests: ${error.message} (Status: ${error.response?.status || 'Unknown'})`);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.put(`/role-requests/${id}`, { status: newStatus }, { headers: { 'Accept': 'application/json' } });
      if (response.data.success) {
        setRequests(requests.map(request => request.id === id ? { ...request, status: newStatus } : request));
      } else {
        setError(`Update failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Update Error:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response',
        status: error.response?.status,
      });
      setError(`Error updating role request status: ${error.response?.data?.message || error.message} (Status: ${error.response?.status || 'Unknown'})`);
    }
  };

  const handleLogin = async () => {
    const response = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', response.data.token); // adjust the path to the token as needed
    // ...redirect or update UI
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
              <td>{request.user?.name || 'N/A'}</td>
              <td>{request.user?.profile?.role || 'N/A'}</td>
              <td>{request.requested_role || 'N/A'}</td>
              <td>
                <select className="form-select" onChange={(e) => handleStatusChange(request.id, e.target.value)}>
                  <option>{request.status || 'pending'}</option>
                  <option>accepted</option>
                  <option>rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" style={{backgroundColor:"#68263D" ,color:"white"}} onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RoleRequests;