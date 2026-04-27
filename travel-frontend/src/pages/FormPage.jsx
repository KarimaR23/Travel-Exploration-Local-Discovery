import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    categoryId: '',
    creatorId: ''
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchUsers();
    };

    loadData().catch(console.error);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResponse(null);
    setError(null);

    const payload = {
      title: formData.title,
      description: formData.description,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      category: {
        id: Number(formData.categoryId)
      },
      creator: {
        id: Number(formData.creatorId)
      }
    };

    try {
      await axios.post('/api/gems', payload);
      setResponse('Gem saved successfully!');
      setFormData({
        title: '',
        description: '',
        latitude: '',
        longitude: '',
        categoryId: '',
        creatorId: ''
      });
    } catch (err) {
      setError('Failed to submit gem data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="page form-page">
        <h2>Form Page</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category:</label>
            <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="creatorId">Created By:</label>
            <select
                id="creatorId"
                name="creatorId"
                value={formData.creatorId}
                onChange={handleChange}
                required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={submitting} className="btn">
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {response && <p className="response">{response}</p>}
        {error && <p className="response error">{error}</p>}
      </div>
  );
};

export default FormPage;