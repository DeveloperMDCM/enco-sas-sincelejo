import React, { useEffect } from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css'
import { useFetch } from '../useFetch';

function MapaCuadrillas() {
  const url = `${import.meta.env.VITE_BACKEND_URL}cuadrillas.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { cuadrillas } = response;


  useEffect(() => {
      setInterval(() => {
    fetchData()
  }, 5000);
  },[])

  const events = [
    {
        start:  9.2981738, 
        end: -75.3947752,
        name: "Cuadrilla 1",
        image: "Logo.jpeg"
       
    },
  ];
  

  const markerIcon = new L.Icon({
    iconUrl: ("marker.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 40], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  // const markerIconEnco = new L.Icon({
  //   iconUrl: ("Logo.jpeg"),
  //   iconSize: [140, 70],
  //   iconAnchor: [30, 40], //[left/right, top/bottom]
  //   popupAnchor: [0, 0], //[left/right, top/bottom]
  // });


  return (
    <>
    <MapContainer  className=' z-0' center={[events[0].start, events[0].end]} zoom={13}  >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap y MDCM-CECAR </a>contributors' />
      {cuadrillas?.map((categorias, i) => (
      <Marker key={i} position={[categorias.cuadrilla.longitud, categorias.cuadrilla.latitud]}  icon={markerIcon} >
        
           <Circle
    center={[categorias.cuadrilla.longitud, categorias.cuadrilla.latitud]}
    pathOptions={{ color: '#79ab2b', fillColor: 'black' }}
    radius={120}
  />
        <Popup>
          <div className='text-cente flex justify-center flex-col items-center'>
          <span>{categorias.cuadrilla.nombres} {categorias.cuadrilla.apellidos}</span>
          <img src={categorias.cuadrilla.foto} width={120} alt="" />
          <span>{categorias.cuadrilla.correo}</span>
          {/* <span>{categorias.cuadrilla.telefono}</span> */}
        
          {/* <span> Longitud: {categorias.cuadrilla.longitud}</span>
          <span> Latitud: {categorias.cuadrilla.latitud}</span> */}
          <a target='_blank' href={`https://www.google.com/maps/place/${categorias.cuadrilla.longitud}+${categorias.cuadrilla.latitud}/@${categorias.cuadrilla.longitud},${categorias.cuadrilla.latitud},16.92z`}>Google maps</a>
          </div>
        </Popup>
      </Marker>
  ))}
     <Marker position={[events[0].start, events[0].end]}  >
     <Popup>
      
          <div className='text-cente flex justify-center flex-col items-center'>
          <h5 className='font-bold'>ENCO SAS</h5>
          <img src={events[0].image}  alt="" />
          </div>
        </Popup>
        </Marker>
    </MapContainer>
   
    </>
  );
}

export default MapaCuadrillas;
