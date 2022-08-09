import React, {useMemo} from 'react';
import './App.css';
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
// import {User} from "./User";
// import {Company} from "./Company";

export default function App() {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map/>
}

function Map() {
    const center = useMemo(() => ({lat: 44, lng: -80}), [])

    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
        >
            <Marker position={center}/>
        </GoogleMap>
    )
}
