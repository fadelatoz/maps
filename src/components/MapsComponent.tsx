'use client';

import { GoogleMapsWrapper } from "./GoogleMapsWrapper";
import { GoogleMaps } from "./GoogleMaps";
import { useEffect, useState } from "react";

export const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Default center in case geolocation fails
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

  useEffect(() => {
    // Set the isClient flag to true when client-side rendering has started
    setIsClient(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setLoading(false); // Finished loading position
          console.log(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location', error);
          setLoading(false); // Stop loading if error occurs
        }
      );
    } else {
      setLoading(false);
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array to run once when the component mounts

  // Handle the case when location data is not yet loaded
  if (loading || !isClient) {
    return <div>Loading...</div>;
  }

  // Render map with current position if available
  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={currentPosition ? [currentPosition] : [defaultCenter]} />
    </GoogleMapsWrapper>
  );
};
