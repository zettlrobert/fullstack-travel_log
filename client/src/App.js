import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';


import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 47.7525, //Hausham
    longitude: 11.8372,
    zoom: 6
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
      setLogEntries(logEntries);
    })();


    return () => {
      // cleanup
    };
  }, [])

  const test = (values) => {
    values.map(val => {
      console.log(val.title)
    })
  }

  test(logEntries)

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >

      {
        logEntries.map(entry => (
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={24}
            offsetRight={12}
          >
            <div>
              <svg
                className="marker"
                style={{
                  width: `24px`,
                  height: `24px`,
                }}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>

          </Marker >
        ))
      }

    </ReactMapGL >
  );
}

export default App;
