'use client';
import React from 'react'
import L, { icon } from 'leaflet'
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
    center?: number[]
}

const Map: React.FC<MapProps> = ({
    center
}) => {
  return (
    <MapContainer
        center={center as L.LatLngExpression || [-0.0236, 37.9062]}
        zoom={5}
        scrollWheelZoom={false}
        className = "h-[35vh] rounded-sm"
    >
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && (
        <Marker 
            position={center as L.LatLngExpression} 
        />
    )}
    </MapContainer>
  )
}

export default Map