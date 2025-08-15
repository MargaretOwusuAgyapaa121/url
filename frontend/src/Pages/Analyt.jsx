import React, { useState } from 'react';
import axios from 'axios';


const Analytics = () => {
  const [shortId, setShortId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    setError('');
    setAnalytics(null);

    try {
      const id = shortId.trim().replace(/^.*\/([^/]+)$/, '$1'); // Extract ID if full URL
      const res = await axios.get(`http://localhost:5000/api/analytics/${id}`);
      setAnalytics(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch analytics');
    }
  };

  return (
    <div className="analytics-container">
      <h2>Check Analytics</h2>
      <form className="analytics-form" onSubmit={handleFetch}>
        <input
          type="text"
          placeholder="Enter short URL or ID"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          required
        />
        <button type="submit">Fetch</button>
      </form>

      {analytics && (
        <div className="analytics-result">
          <p><strong>Original URL:</strong> {analytics.originalUrl}</p>
          <p><strong>Short ID:</strong> {analytics.shortId}</p>
          <p><strong>Custom Alias:</strong> {analytics.customAlias || 'None'}</p>
          <p><strong>Clicks:</strong> {analytics.clickCount}</p>
          <p><strong>Password Protected:</strong> {analytics.password ? 'Yes' : 'No'}</p>
          <p><strong>Expires At:</strong> {analytics.expiresAt ? new Date(analytics.expiresAt).toLocaleString() : 'No Expiry'}</p>
        </div>
      )}

      {error && <p className="analytics-error">{error}</p>}
    </div>
  );
};

export default Analytics;
