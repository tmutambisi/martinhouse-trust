import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";

interface Location {
  id: string;
  name: string;
  address: string;
  region: string;
  coordinates: [number, number];
  phone: string;
  email: string;
  hours: string;
  isHeadOffice?: boolean;
  description: string;
}

interface MapContentProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationClick: (location: Location) => void;
}

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icon for head office
const createCustomIcon = (isHeadOffice: boolean, isSelected: boolean) => {
  // Brand colors: Primary (dark green) for head office, Secondary (lighter green) for branches
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${isHeadOffice ? "#0a5d2c" : "hsl(123, 38%, 57%)"};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
        ${isSelected ? "transform: rotate(-45deg) scale(1.3); z-index: 1000;" : ""}
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        "></div>
        ${isHeadOffice ? `
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            background: #fbbf24;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          "></div>
        ` : ""}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Component to handle map view updates when location is selected
function MapViewUpdater({ selectedLocation }: { selectedLocation: Location | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView(selectedLocation.coordinates, 13, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

const MapContent = ({ locations, selectedLocation, onLocationClick }: MapContentProps) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={[-19.0, 29.0]} // Center of Zimbabwe
      zoom={6}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      zoomControl={true}
      scrollWheelZoom={true}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <MapViewUpdater selectedLocation={selectedLocation} />

      {locations.map((location) => {
        const isSelected = selectedLocation?.id === location.id;
        const customIcon = createCustomIcon(location.isHeadOffice || false, isSelected);

        return (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                onLocationClick(location);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-4 min-w-[200px]">
                <h3 className="font-heading font-black text-foreground uppercase tracking-tight mb-2">{location.name}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-4">{location.address}</p>
                <Button
                  size="sm"
                  className="w-full h-10 rounded-xl bg-primary text-white font-bold text-[10px] uppercase tracking-widest shadow-lg"
                  onClick={() => onLocationClick(location)}
                >
                  Unit Logistics
                </Button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapContent;
