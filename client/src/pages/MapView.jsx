import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';//goddspeed

export default function MapView() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [mapStyle, setMapStyle] = useState('light');

  const navigate = useNavigate();

  const mapStyles = {
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  const allListings = (() => {
    const map = new Map();
    [...offerListings, ...rentListings, ...saleListings].forEach(listing => {
      if (!map.has(listing._id)) {
        map.set(listing._id, listing);
      }
    });
    return Array.from(map.values());
  })();

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=50');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=50');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=50');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOfferListings();
  }, []);

  if (allListings.length === 0) {
    return <p className="text-center mt-10">Loading listings...</p>;
  }

  const defaultCenter = [allListings[0].latitude, allListings[0].longitude];

  return (
    <div className="flex h-screen">
      <div style={{ width: '66.66%' }}>
        {/* Map Style Select Menu */}
        <div className="absolute top-4 left-4 z-[999] bg-white rounded-md shadow-lg p-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.948L9 2m0 0l6 2m-6-2v18m6-16l5.447 2.724A2 2 0 0121 8.618v9.764a2 2 0 01-1.553 1.948L15 22m0-18v18" />
          </svg>
          <div>
            <label htmlFor="map-style" className="block text-xs font-medium text-gray-700 mb-0.5">
              Map Style:
            </label>
            <select
              id="map-style"
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {Object.keys(mapStyles).map(styleKey => (
                <option key={styleKey} value={styleKey}>
                  {styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Map */}
        <MapContainer
          center={defaultCenter}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; contributors'
            url={mapStyles[mapStyle]}
          />
          {allListings.map(listing => (
            <Marker
              key={listing._id}
              position={[listing.latitude, listing.longitude]}
              eventHandlers={{
                click: () => setSelectedListing(listing),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Sidebar */}
      <div style={{ width: '33.33%', overflowY: 'auto', padding: '1rem', borderLeft: '1px solid #ccc' }}>
        {selectedListing ? (
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
            {selectedListing.imageUrls?.length > 0 && (
              <img
                src={selectedListing.imageUrls[0]}
                alt={selectedListing.name}
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <h2 className="text-2xl font-extrabold text-gray-800">{selectedListing.name}</h2>
            <p className="text-gray-600">{selectedListing.address}</p>
            <p className="text-lg font-semibold text-green-700">
              Price: ${selectedListing.regularPrice?.toLocaleString() || 'N/A'}
            </p>
            <button
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate(`/listing/${selectedListing._id}`)}
            >
              View Listing Details
            </button>
          </div>
        ) : (
          <p>Select a property marker on the map to see details here.</p>
        )}
      </div>
    </div>
  );
}
