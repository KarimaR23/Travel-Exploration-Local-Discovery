import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCBmcbdO0twh2OSxKSden1OeXXwhvzHL2E';
const API_BASE_URL = 'http://localhost:8080';

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingGem, setEditingGem] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        latitude: '',
        longitude: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/gems`);
                setData(response.data);
            } catch (err) {
                console.error(err);

                setData([
                    {
                        id: 1,
                        title: 'Local Food Spot',
                        description: 'Food and dining spot.',
                        latitude: 30.45,
                        longitude: -84.28,
                        category: { name: 'Restaurants' }
                    },
                    {
                        id: 2,
                        title: 'Community Park',
                        description: 'Outdoor and recreation.',
                        latitude: 30.47,
                        longitude: -84.25,
                        category: { name: 'Parks' }
                    },
                    {
                        id: 3,
                        title: 'History Museum',
                        description: 'Historical and cultural.',
                        latitude: 30.44,
                        longitude: -84.29,
                        category: { name: 'Museums' }
                    },
                    {
                        id: 4,
                        title: 'Nature Trail',
                        description: 'Trails and Wildlife.',
                        latitude: 30.3714958,
                        longitude: -84.2684613,
                        category: { name: 'Nature' }
                    },
                    {
                        id: 5,
                        title: 'Beaches',
                        description: 'Coastal places, lakes, and waterfront destinations.',
                        latitude: 30.05715,
                        longitude: -84.2896179,
                        category: { name: 'Beaches' }
                    }
                ]);

                setError(null);
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    useEffect(() => {
        if (loading) return;

        const loadMap = () => {
            const mapElement = document.getElementById('map');
            if (!mapElement || !window.google) return;

            const mapInstance = new window.google.maps.Map(mapElement, {
                center: { lat: 30.45, lng: -84.28 },
                zoom: 10
            });

            data.forEach((item) => {
                if (item.latitude && item.longitude) {
                    // noinspection JSDeprecatedSymbols
                    new window.google.maps.Marker({
                        position: {
                            lat: Number(item.latitude),
                            lng: Number(item.longitude)
                        },
                        map: mapInstance,
                        title: item.title
                    });
                }
            });
        };

        if (window.google) {
            loadMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.onload = loadMap;
            document.body.appendChild(script);
        }
    }, [loading, data]);

    const handleEditClick = (gem) => {
        setEditingGem(gem);

        setEditFormData({
            title: gem.title || '',
            description: gem.description || '',
            latitude: gem.latitude || '',
            longitude: gem.longitude || ''
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateGem = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please log in before updating a gem.");
            return;
        }

        const payload = {
            title: editFormData.title,
            description: editFormData.description,
            latitude: Number(editFormData.latitude),
            longitude: Number(editFormData.longitude),
            category: editingGem.category,
            creator: editingGem.creator
        };

        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/gems/${editingGem.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(
                data.map((gem) =>
                    gem.id === editingGem.id ? response.data : gem
                )
            );

            setEditingGem(null);
            setMessage("Gem updated successfully!");
        } catch (err) {
            console.error("UPDATE ERROR:", err.response?.data || err.message);
            setMessage("Failed to update gem.");
        }
    };

    const handleDeleteGem = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please log in before deleting a gem.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this gem?");

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/api/gems/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setData(data.filter((gem) => gem.id !== id));
            setMessage("Gem deleted successfully!");
        } catch (err) {
            console.error("DELETE ERROR:", err.response?.data || err.message);
            setMessage("Failed to delete gem.");
        }
    };

    if (loading) return <div className="page">Loading...</div>;
    if (error) return <div className="page error">{error}</div>;

    const groupedData = Object.values(
        data.reduce((acc, item) => {
            const categoryName = item.category?.name || 'Other';

            if (!acc[categoryName]) {
                acc[categoryName] = {
                    category: categoryName,
                    items: []
                };
            }

            acc[categoryName].items.push(item);
            return acc;
        }, {})
    );

    return (
        <div className="page data-display">
            <h2>Data Display</h2>

            {message && <p className="response">{message}</p>}

            <div
                id="map"
                style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}
            ></div>

            <div className="data-list">
                {groupedData.length > 0 ? (
                    groupedData.map((group, index) => (
                        <div key={index} className="data-item">
                            <h3>{group.category}</h3>

                            {group.items.map((gem) => (
                                <div key={gem.id} style={{ marginBottom: "1rem" }}>
                                    <p>
                                        • <strong>{gem.title}</strong> — {gem.description}
                                    </p>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => handleEditClick(gem)}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => handleDeleteGem(gem.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>

            {editingGem && (
                <div className="page" style={{ marginTop: "2rem" }}>
                    <h2>Edit Gem</h2>

                    <form onSubmit={handleUpdateGem} className="form">
                        <div className="form-group">
                            <label htmlFor="editTitle">Title:</label>
                            <input
                                type="text"
                                id="editTitle"
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="editDescription">Description:</label>
                            <textarea
                                id="editDescription"
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="editLatitude">Latitude:</label>
                            <input
                                type="number"
                                step="any"
                                id="editLatitude"
                                name="latitude"
                                value={editFormData.latitude}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="editLongitude">Longitude:</label>
                            <input
                                type="number"
                                step="any"
                                id="editLongitude"
                                name="longitude"
                                value={editFormData.longitude}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="btn"
                            onClick={() => setEditingGem(null)}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DataDisplay;