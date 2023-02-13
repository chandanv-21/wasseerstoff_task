import React, { useState, useEffect } from "react";
import "./MainIndex.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const colorScale = scaleLinear()
  .domain([0, 1430000000 ])
  .range("#a72bb5", "#0376db");
const MainIndex = () => {
  const [population, setPopulation] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const getData = () => {
    fetch("http://localhost:5555/population", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setPopulation(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <div
          style={{
            position: "absolute",
            left: "200px",
            height: "80vh",
            backgroundColor: "yellowgreen",
          }}
        >
          <ComposableMap
            width={800}
            height={600}
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
          >
            {population.length > 0 ? 
            
            (
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
              >
                <Sphere stroke="#000" strokeWidth={0.3} />
                <Graticule stroke="#000" strokeWidth={0.3} />

                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo, index) => {
                      const isos = population.find((s) => s.cca3 === geo.properties.ISO_A3)
                      return (<>
                        <Geography
                          key={index}
                          geography={geo}
                          fill={isos ? colorScale(isos["pop2023"]) : "#555"}
                        />
                        </>
                      )
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            ) : 
              <p>loading...</p>
            }
          </ComposableMap>
          {/* {population.map((newdata,index)=>{
        return (
          <p>{newdata.country}</p>
        )
      })} */}
        </div>
      </div>
    </>
  );
};
export default MainIndex;
