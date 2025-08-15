import React, { useState } from 'react';
import axios from 'axios';


const Home = () => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: '',
    password: '',
    expiresAt: ''
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', formData);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="home-container">
      <h1>URL Shortener</h1>
      <form className="shorten-form" onSubmit={handleSubmit}>
        <input
          type="url"
          name="originalUrl"
          placeholder="Enter your long URL"
          value={formData.originalUrl}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customAlias"
          placeholder="Custom alias (optional)"
          value={formData.customAlias}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (optional)"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
        />
        <button type="submit">Shorten</button>
      </form>

      {response && (
        <div className="result-box">
          <p><strong>Short URL:</strong> <a href={response.shortUrl} target="_blank" rel="noopener noreferrer">{response.shortUrl}</a></p>
          <img src={response.qrCode} alt="QR Code" />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Home;
