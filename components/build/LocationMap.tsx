"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


type LatLng = {
    lat: number;
    lng: number;
};


function ClickHandler({
    onPick,
}: {
    onPick: (pos: LatLng) => void;
}) {
    useMapEvents({
        click(e) {
            onPick({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            });
        },
    });

    return null;
}


function FlyTo({
    position,
}: {
    position: LatLng | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(
                [position.lat, position.lng],
                12,
                {
                    duration: 0.8,
                }
            );
        }
    }, [position, map]);

    return null;
}


export default function LocationMap({
    position,
    onPick,
}: {
    position: LatLng | null;
    onPick: (pos: LatLng) => void;
}) {

    return (
        // components/build/LocationMap.tsx — only the className on MapContainer changes
<MapContainer
    key={position ? `${position.lat}-${position.lng}` : "default"}
    center={position ? [position.lat, position.lng] : [49.28, -123.12]}
    zoom={position ? 12 : 6}
    scrollWheelZoom={false}
    className="h-[400px] w-full rounded-xl"
>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <ClickHandler onPick={onPick} />

            <FlyTo position={position} />

            {position && (
                <Marker
                    position={[
                        position.lat,
                        position.lng,
                    ]}
                />
            )}

        </MapContainer>
    );
}