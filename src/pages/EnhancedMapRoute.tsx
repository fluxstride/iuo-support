/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// EnhancedMapRoute.js
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FtYWRleCIsImEiOiJjbWE1NHJhbjIwNDBzMmpzOXdpdHo2cG1vIn0.rmKkDADr3ThNmUSrZyd5KQ";

const EnhancedMapRoute = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [start, setStart] = useState<any>(null);
  const [_end, setEnd] = useState<any>(null);
  const [steps, setSteps] = useState<any>([]);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.longitude, position.coords.latitude];
        console.log({ position, coords });
        setStart(coords);
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Please allow location access");
      },
    );
  }, []);

  // Initialize map once location is available
  useEffect(() => {
    if (!start || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start,
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat(start).addTo(map.current);

    // Add click handler to select destination
    map.current.on("click", async (e: any) => {
      const destination = [e.lngLat.lng, e.lngLat.lat];
      setEnd(destination);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(destination)
        .addTo(map.current);

      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(
          ",",
        )};${destination.join(
          ",",
        )}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`,
      );
      const data = await res.json();

      console.log({ data });

      const route = data.routes[0].geometry;
      const stepInstructions = data.routes[0].legs[0].steps.map(
        (step: any) => step.maneuver.instruction,
      );
      setSteps(stepInstructions);

      // Remove old route if it exists
      if (map.current.getSource("route")) {
        map.current.removeLayer("route");
        map.current.removeSource("route");
      }

      // Add new route
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: route,
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3b9ddd",
          "line-width": 6,
        },
      });
    });
  }, [start]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "70%", height: "100%" }} />
      <div
        style={{
          width: "30%",
          padding: "10px",
          overflowY: "auto",
          background: "#f8f8f8",
        }}
      >
        <h2>Directions</h2>
        {steps.length === 0 ? (
          <p>Click on the map to select your destination</p>
        ) : (
          <ol>
            {steps.map((step: any, index: any) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default EnhancedMapRoute;
