WeatherMap
│
├── Create Leaflet map
│     ├── Center map on UAE
│     ├── Add dark map tiles
│
├── If user's location exists
│     ├── Move map to user
│     ├── Show user's location marker
│     └── Show Google Maps navigation link
│
└── For every UAE emirate
      ├── Create emoji marker
      ├── Show emirate name
      ├── Show weather if available
      ├── Highlight active emirate
      ├── "View Weather" button
      └── "Navigate" Google Maps link



// this is the architecture what we have done so far in this component.



// useEffect we have used for later move the map when the user's coordinates changes.
// TileLayer Provides the visual map. Without a tile layer, you basically have an empty map container.  <TileLayer url="..." />  Think: "What should I draw on the map?"
// Marker Places a marker at coordinates. <Marker position={[25.2, 55.3]} />  Think: "Put something at this latitude and longitude."
// Popup  :  create a little information box when we click a marker the coordinates on map
// useMap This is a React Leaflet hook. It gives you access to the actual Leaflet map instance. That's important because later you do:  map.flyTo(...)
// import L from "leaflet"; Here you're importing Leaflet's JavaScript API directly.


import {useEffect, useRef} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";  // Think of them as React wrappers around Leaflet's JavaScript API.
// MapContainer  Creates the actual map. <MapContainer>  Think: "Give me a map."
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { EMIRATES, type EmiratesData } from ".../utils/emirates.ts";
import { buildNavLink } from "../utils/mapHelpers.ts";

// fix leaflet default icon path broken by Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// custom icon for current user location 
const userIcon = new L.DivIcon({
    className: "",
    html: `<div style="width:18px; 
    height:18px;
    background:#38bdf8;
    border:3px solid #fff;
    border-radius:50%;
    box-shadow:0 0 0 4px rgba(56, 189, 248, 0.35);
    ">
    </div>`, 
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

// custom emoji icon for each emirate marker.
function makeEmiratesIcon(emoji: string): L.DivIcon {
    return new L.DivIcon({
        className: "",
        html: `<div style="font-size:22px; 
        line-height:1; filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    });

}

// sub Component fly map to coords when userCoords changes
interface FlyToProps {
    lat: number;
    lon: number;
}
const FlyTo = ({lat, lon}: FlyToProps) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lon], 10, { duration: 1.2 });

    }, [lat, lon, map]);
    return null;
 }


 // props
interface WeatherProps  {
    useCoords: {lat: number; lon: number} | null;
    activeEmirate: string | null;
    onEmirateClick: (emirate: EmiratesData) => void;
    weatherByEmirate?: Record<string, { temp: number; conditions: string }>;
 }


 // component
const WeatherMap = ({ 
    useCoords, 
    activeEmirate, 
    onEmirateClick,
    weatherByEmirate = {},
}: WeatherMapProps) => {

    //UAe center
    const UAE_CENTER: [number, number] = [24.0, 54.5];
    const UAE_ZOOM = 7;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-700/60"
        style={{height: 380}}>
            <MapContainer
                center={ UAE_CENTER}
                zoom={UAE_ZOOM}
                style={{height: "100%", width: "100%", background: "#0f172a"}}
                zoomControl={true}
                scrollWheelZoom={false}
            >
                {/* dark title layer */}
                <TitleLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com">CARTO</a>'
                />

                {/* fly to uesr location when it change */}
                {userCoords && <FlyTo lat={userCoords.lat} lon={ userCoords.lon} />}

                {/* user location marker */}
                { userCoords && (
                    <Marker
                        position={ [userCoords.lat, userCoords.lon]}
                        icon={userIcon}
                    >
                        <Popup>
                            <div 
                            style={{color: "#0f172a", fontSize: 13, minWidth: 140}}>
                                <strong>📍 Your Location</strong>
                                <br />
                                {userCoords.lat.toFixed(4)}, {userCoords.lon.toFixed(4)}
                                <br />
                                <a
                                href={buildNavLink(userCoords.lat, userCoords.lon)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color: "#0369a1", fontSize: 12}}
                                >
                                    Open in Google Maps ↗
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                )}  
                
            {/* emirates marker */}
            {EMIRATES.map(emirate => {
                const wx = weatherByEmirate[emirate.id];
                const isActive = activeEmirate === emirate.id;
                return (
                    <Marker
                        key={emirate.id}
                        position={[emirate.lat, emirate.lon]}
                        icon={makeEmirateIcon(emirate.emoji)}
                        eventHandlers={{
                            click: () => onEmirateClick(emirate),
                        }}
                    >
                        <Popup>
                            <div style={{ color: "#0f172a", fontSize: 13, minWidth: 160 }}>
                                <strong>{emirate.emoji} {emirate.name}</strong>
                                <span style={{ marginLeft: 6, color: "#555", fontSize: 12 }}>
                                    {emirate.arabic}
                                </span>

                                {wx && (
                                    <div style={{ marginTop: 4 }}>
                                        🌡️ {wx.temp}°C · {wx.conditions}
                                    </div>
                                )}

                                {isActive && (
                                    <div style={{ marginTop: 4, color: "#0369a1", fontSize: 11 }}>
                                        ● Currently viewing
                                    </div>
                                )}
                                <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                                    <button
                                        onClick={() => onEmirateClick(emirate)}
                                        style={{
                                            background: "#0ea5e9", color: "#fff", border: "none" borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer",
                                        }}
                                    >
                                        View Weather
                                    </button>

                                    <a
                                        href={buildNavLink(emirate.lat, emirate.lon, emirate.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: "#e2e8f0", color: "#0f172a", border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 12, textDecoration: "none",
                                        }}
                                    >
                                        Navigate  ↗
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}

            </MapContainer>
        </div>
    )
}

export default WeatherMap;
