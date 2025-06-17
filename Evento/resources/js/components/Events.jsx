import React, { useState, useEffect } from 'react';
import api from '../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/events?page=${currentPage}`);
        console.log('API Response:', response);
        if (!response.data || typeof response.data !== 'object' || response.data instanceof ArrayBuffer) {
          throw new Error('Unexpected response format: Received HTML or non-JSON data');
        }
        if (!response.data.data) {
          throw new Error('Missing data field in response');
        }
        setEvents(response.data.data);
        setLastPage(response.data.pagination?.last_page || 1);
      } catch (error) {
        console.error('Fetch Error:', {
          message: error.message,
          response: error.response ? error.response.data : 'No response',
          status: error.response?.status,
          headers: error.response?.headers,
        });
        setError(`Failed to load events: ${error.message} (Status: ${error.response?.status || 'Unknown'})`);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.put(`/events/${id}`, { status: newStatus }, { headers: { 'Accept': 'application/json' } });
      if (response.data.success) {
        setEvents(events.map(event => event.id === id ? { ...event, status: newStatus } : event));
      } else {
        setError(`Update failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Update Error:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response',
        status: error.response?.status,
      });
      setError(`Error updating event status: ${error.response?.data?.message || error.message} (Status: ${error.response?.status || 'Unknown'})`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Events</h2>
      <h3 className="h5 mb-3">All Events</h3>
      <button className="btn  mb-3" style={{backgroundColor:"#68263D" , color:"white"}}>Create Event</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Organizer</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.event_name}</td>
              <td>{event.user?.email || 'N/A'}</td>
              <td>{event.category?.categories_name || 'N/A'}</td>
              <td>
                <select className="form-select" onChange={(e) => handleStatusChange(event.id, e.target.value)}>
                  <option>{event.status || 'pending'}</option>
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

export default Events;