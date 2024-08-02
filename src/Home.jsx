import React, { useEffect, useState } from "react";
import "./home.css";
import { WiCelsius, WiSunrise } from "react-icons/wi";
export default function Home(props) {
  const [data, setdata] = useState({
    "last_updated_epoch": 1722550500,
    "last_updated": "2024-08-02 03:45",
    "temp_c": 27.9,
    "temp_f": 82.3,
    "is_day": 0,
    "condition": {
        "text": "Overcast",
        "icon": "//cdn.weatherapi.com/weather/64x64/night/122.png",
        "code": 1009
    },
    "wind_mph": 15.2,
    "wind_kph": 24.5,
    "wind_degree": 78,
    "wind_dir": "ENE",
    "pressure_mb": 997,
    "pressure_in": 29.43,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 77,
    "cloud": 92,
    "feelslike_c": 31.7,
    "feelslike_f": 89,
    "windchill_c": 27.9,
    "windchill_f": 82.3,
    "heatindex_c": 31.7,
    "heatindex_f": 89,
    "dewpoint_c": 23.5,
    "dewpoint_f": 74.3,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 1,
    "gust_mph": 20.4,
    "gust_kph": 32.8
});
  const [initialval, setinitialval] = useState("Patna");
  // const [data, dsaf] = useState("Patna");






  const getinputdata = (e) => {
    setinitialval(e.target.value);

  };

  const searchWeather =async () => {

    // myfun()

    const datavalue =await fetch(`https://api.weatherapi.com/v1/current.json?key=a6bb6be9863446429e3202445240108&q= ${initialval}` )
    const dataval = await datavalue.json();
    setdata(dataval?.current)
    console.log(dataval?.current)

  }

  return (
    <div className="main_section">
      <div
        className="card main_Card "
        style={{
          maxWidth: "80%",
          height: "90%",
          background: "#380888",
          boxShadow: "2px 2px 10px white",
        }}
      >
        <div className="card-body ">
          <div className="container text-center mt-4">
            <div className="row">
              <div className="col-sm-3 country_text">
                <WiSunrise id="icons" /> CloudReport{" "}
              </div>
              <div className="col-sm-5 city_text">{initialval}</div>
              <div className="col-sm-4 m-0 p-0">
                <input
                  type="text"
                  className="search_field "
                  placeholder=" Location"
                  onChange={getinputdata}
                />
                <button onClick={searchWeather} className="search_field " id="search-button">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="card mini_card  ">
            <div className="card-body mini_card_body ">
              <div className="container mx_section1">
                <div className="row">
                  <div className="col p-0 windspeed">Feels like </div>
                  <div className="col p-0 windspeed">Wind Speed </div>
                </div>
                <div className="row">
                  <div className="col p-0 windspeed1">
                    {" "}
                    {data?.feelslike_c} ºC
                  </div>
                  <div className="col p-0 windspeed1 ">
                    {" "}
                    {data?.wind_kph
} km/h
                  </div>
                </div>
                <div className="row mt-4 ">
                  <div className="col  currentTemp ">
                    {" "}
                    {data?.temp_c
}
                    <WiCelsius
                      style={{ textShadow: "text-shadow:2px 2px 4px #000000" }}
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col p-0  windspeed">Current</div>
                </div>
                <div className="row">
                  <div className="col p-0 windspeed ">Humidity
 </div>
                  <div className="col p-0 windspeed">cloud
 </div>
                </div>
                <div className="row">
                  <div className="col p-0  "> {data?.humidity
} </div>
                  <div className="col p-0  "> {data?.cloud
} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
