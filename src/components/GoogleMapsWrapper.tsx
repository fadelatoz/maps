import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  const apiKey = 'AIzaSyBzXEBpTNQEu6Y5KjkahuZ3LsgWw8QgJXU'; // Replace with your actual API key

  if (!apiKey) {
    return <div>Oops! Cannot display the map: Google Maps API key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};