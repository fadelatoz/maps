"use client"

import React, { useEffect, useRef } from "react";
import { addSingleMarkers } from "./markers/AddSingleMarkers"; // Make sure to import this
import { addClusterMarkers } from "./markers/AddClusterMarkers";

const DEFAULT_CENTER = { lat: 28.4595, lng: 77.0266 };
const DEFAULT_ZOOM = 7;

export const GoogleMaps = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(locations)
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: locations[0],
        zoom: DEFAULT_ZOOM,
      });
  
      addClusterMarkers({ locations, map });
    }
  }, [ref, locations]);
  return (
    <div ref={ref} style={{ width: "1000px", height: "700px" }} />
  );
};