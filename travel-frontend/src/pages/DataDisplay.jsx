import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.0.216:5173/api/gems'); // Assuming backend endpoint
        setData(response.data);
      } catch (err) {
        // Fallback to mock data if backend is not available
        setData([
          { id: 1, title: 'Restaurants', description: 'Food and dining spot.' },
          { id: 2, title: 'Parks', description: 'Outdoor and recreation.' },
          { id: 3, title: 'Museums', description: 'Historical and cultural.' },
          { id: 4, title: 'Nature', description: 'Waterfalls and trails.' }
        ]);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
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