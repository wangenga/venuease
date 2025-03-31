'use client';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  // Load Kenya's county boundaries from the GeoJSON file in the public folder
  useEffect(() => {
    fetch('/kenyaTowns.json')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }, []);

  // Use provided center or a default coordinate (Kenya's approximate center)
  const mapCenter = (center as L.LatLngExpression) || [-0.0236, 37.9062];

  return (
    <MapContainer
      center={mapCenter}
      zoom={6}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-sm"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render a single marker if a center is provided */}
      {center && (
        <Marker position={center as L.LatLngExpression}>
          <Popup>Selected County</Popup>
        </Marker>
      )}

      {/* Overlay the GeoJSON data for Kenya's counties */}
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={{ fillColor: 'blue', fillOpacity: 0.3, weight: 1 }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
