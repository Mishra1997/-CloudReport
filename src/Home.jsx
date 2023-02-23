import React, { useEffect, useState } from "react";
import "./home.css";
import { WiCelsius, WiSunrise } from "react-icons/wi";
export default function Home(props) {
  const [data, setdata] = useState([{ temp: "10" }]);
  const [initialval, setinitialval] = useState("Patna");

  useEffect(() => {
    myfun();
  }, [initialval]);

  const myfun = async () => {
    const city = initialval;
    const url = "https://api.api-ninjas.com/v1/weather?city=" + city;
    const responseVal = await fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": "EHa0SLC1Zbm5Yw5Ceo4+BQ==pKorQgVGzmcO2SU8" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
    const dd = await responseVal.json();
    setdata(dd);
    // console.log(dd)
    console.log(dd);
  };

  const getinputdata = (e) => {
    const saveuserdata = e.target.value;
    if (saveuserdata === "") {
      setinitialval("Patna");

      alert("Please enter valid city name");
    } else {
      setinitialval(saveuserdata);
    }
  };

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
                  placeholder="Search location"
                  onChange={getinputdata}
                />
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
                    {data.feels_like} ºC
                  </div>
                  <div className="col p-0 windspeed1 ">
                    {" "}
                    {data.wind_speed} km/h
                  </div>
                </div>
                <div className="row mt-4 ">
                  <div className="col  currentTemp ">
                    {" "}
                    {data.temp}
                    <WiCelsius
                      style={{ textShadow: "text-shadow:2px 2px 4px #000000" }}
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col p-0  windspeed">Current</div>
                </div>
                <div className="row">
                  <div className="col p-0 windspeed ">Max </div>
                  <div className="col p-0 windspeed">Min </div>
                </div>
                <div className="row">
                  <div className="col p-0  "> {data.max_temp} ºC</div>
                  <div className="col p-0  "> {data.min_temp} ºC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
