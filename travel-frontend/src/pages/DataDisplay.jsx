import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCBmcbdO0twh2OSxKSden1OeXXwhvzHL2E';
const API_BASE_URL = 'http://10.0.0.216:8080';

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        description: 'Waterfalls and trails.',
                        latitude: 30.49,
                        longitude: -84.27,
                        category: { name: 'Nature' }
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
                                <p key={gem.id}>
                                    • {gem.title} — {gem.description}
                                </p>
                            ))}
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