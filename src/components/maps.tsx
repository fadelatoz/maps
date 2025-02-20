import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [zoom, setZoom] = useState(15); // Default zoom level

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const geoSuccess = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        };

        const geoError = (err: GeolocationPositionError) => {
            setError('Error fetching location: ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleZoomToLocation = () => {
        if (location) {
            setZoom(18); // Increase zoom level when button is clicked
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!location) {
        return <div>Loading location...</div>;
    }

    // Map container style and options
    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: location.latitude,
        lng: location.longitude
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBzXEBpTNQEu6Y5KjkahuZ3LsgWw8QgJXU">
            <span className='text-black'>LAT : {location?.latitude} LNG : {location?.longitude}</span>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                <Marker position={center} />
                <button style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }} onClick={handleZoomToLocation}>
                    Zoom to My Location
                </button>
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
