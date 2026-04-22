import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Assuming backend endpoint
        setData(response.data);
      } catch (err) {
        // Fallback to mock data if backend is not available
        setData([
          { id: 1, title: 'Ruby Gem', description: 'A precious red gemstone.' },
          { id: 2, title: 'Emerald Gem', description: 'A vibrant green gemstone.' },
          { id: 3, title: 'Sapphire Gem', description: 'A deep blue gemstone.' },
          { id: 4, title: 'Diamond Gem', description: 'The hardest natural substance.' }
        ]);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page error">{error}</div>;

  return (
    <div className="page data-display">
      <h2>Data Display</h2>
      <div className="data-list">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="data-item">
              <h3>{item.title || `Item ${index + 1}`}</h3>
              <p>{item.description || item.content || JSON.stringify(item)}</p>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DataDisplay;