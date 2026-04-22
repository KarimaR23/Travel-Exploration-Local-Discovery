import React, { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/form', formData); // Assuming backend endpoint
      setResponse('Data submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponse('Failed to submit data');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page form-page">
      <h2>Form Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default FormPage;