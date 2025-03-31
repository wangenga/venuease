// components/LocationStep.tsx
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '../types/location'; // Verify correct import path

// ... (keep the Leaflet icon fixes)

interface LocationStepProps {
  value?: Location;
  onChange: (location: Location) => void;
}

// ... (other interfaces remain the same)

const LocationStep = ({ value, onChange }: LocationStepProps) => {
  // ... (existing useState and ref declarations)

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      );
      const data = await response.json() as ReverseGeocodeResponse;

      // Create properly typed Location object
      const location: Location = {
        latlng: [e.latlng.lat, e.latlng.lng],
        address: data.display_name,
        county: data.address.county || data.address.state,
        town: data.address.town || data.address.city
      };

      onChange(location);
      mapRef.current?.flyTo(e.latlng, 14);
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  // In the suggestion click handler:
  const handleSuggestionClick = (item: NominatimResponse) => {
    const location: Location = {
      latlng: [parseFloat(item.lat), parseFloat(item.lon)],
      address: item.display_name,
      county: item.address.county,
      town: item.address.town || item.address.city
    };

    onChange(location);
    setSearchQuery(item.display_name);
    setSuggestions([]);
    mapRef.current?.flyTo(location.latlng, 14);
  };

  // In the JSX:
  {value?.latlng && <Marker position={value.latlng} />}

  // Selected location preview:
  {value && (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="font-semibold">Selected Location:</p>
      <p className="truncate">{value.address}</p>
      <div className="flex gap-2 mt-1 text-sm text-gray-600">
        {value.town && <span>{value.town}</span>}
        {value.county && <span>&bull; {value.county}</span>}
      </div>
    </div>
  )}