import React, { useState, useEffect } from 'react';
import axios from '../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?page=${currentPage}`); // Added /api prefix
        setEvents(response.data.data || []);
        setLastPage(response.data.pagination?.last_page || 1);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/events/${id}`, { status: newStatus });
      if (response.data.success) {
        setEvents(events.map(event => event.id === id ? { ...event, status: newStatus } : event));
      } else {
        setError('Failed to update event status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Error updating event status. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Events</h2>
      <h3 className="h5 mb-3">All Events</h3>
      <button className="btn btn-primary mb-3">Create Event</button>
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
              <td>{event.category?.name || 'N/A'}</td>
              <td>
                <select className="form-select" onChange={(e) => handleStatusChange(event.id, e.target.value)}>
                  <option>{event.status || 'Pending'}</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
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
              <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Events;