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
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
    };

    loadData().catch(console.error);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://10.0.0.216:8080/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories', err);

      setCategories([
        { id: 2, name: 'Park' },
        { id: 3, name: 'Museum' },
        { id: 1, name: 'Restaurant' },
        { id: 4, name: 'Nature' }
      ]);
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
        id: 1
      }
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in before submitting a gem.");
        setSubmitting(false);
        return;
      }

      await axios.post('http://10.0.0.216:8080/api/gems', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
      console.error("FORM ERROR:", err.response?.status, err.response?.data || err.message);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("You must log in again before submitting.");
      } else {
        setError(`Failed to submit gem data: ${err.response?.data || err.message}`);
      }
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
            <input
                type="text"
                id="creatorId"
                name="creatorId"
                placeholder="Enter your name"
                value={formData.creatorId}
                onChange={handleChange}
                required
            />
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