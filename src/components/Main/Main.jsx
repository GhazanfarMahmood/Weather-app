import React, { useState } from "react";
import axios from "axios";

import "./Main.scss";

import { AiOutlineSearch } from "react-icons/ai";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsFillCloudsFill } from "react-icons/bs";
import { MdOutlineAir } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import WaterIcon from "@mui/icons-material/Water";

const Main = () => {
  const [userData, setUserData] = useState({
    temp: 0,
    city: "",
    cloudpct: 0,
    feelLike: 0,
    humidity: 0,
    windSpeed: 0,
    condition: "?",
  });

  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Iserror, setIsError] = useState(null);
  const [visible, setVisible] = useState(true);

  const fetchData = async () => {
    if (!city) {
      return; // Don't make the request if city is empty
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=9d29756cf5dc4bd8ba781634241307&q=${city}&aqi=yes`);

      setUserData({
        temp: response.data.current.temp_c,
        city: response.data.location.name,
        cloudpct: response.data.current.cloud,
        feelLike: response.data.current.feelslike_c,
        humidity: response.data.current.humidity,
        windSpeed: response.data.current.wind_mph,
        condition: response.data.current.condition.text,
      });

      setIsError(null);
      setIsLoading(false);
    } catch (error) {
      setIsError("Please enter Valid City Name!");
      setIsLoading(false);
    }
  };

  const visibleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="main-container">
        {visible ? (
          <div className="upper-container">
            <h1 onClick={visibleClick}>
              <RxCross2 />
            </h1>
            <p>
              This API is not paid, so you can't obtain weather information for
              small cities and villages.
            </p>
          </div>
        ) : null}
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Enter your City Name:</h2>

          <div className="form">
            <input
              type="text"
              placeholder="City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchData}>
              <AiOutlineSearch />
            </button>
          </div>
        </form>
        {isLoading ? (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        ) : Iserror ? (
          <div className="error-container">
            <h1>Error!</h1>
            <p>{Iserror}</p>
          </div>
        ) : (
          <>
            <div className="main-box">
              <h1>
                City: <span> {city}</span>
              </h1>
              <h1>
                <FaTemperatureHigh />
                Temperature: <span> {Math.round(userData.temp)}°C</span>
              </h1>
            </div>
            <div className="main-card">
              <h2>Description:</h2>

              <div>
                <div className="card-items">
                  <h5>
                    <BsFillCloudsFill />
                    Cloud Percentage:
                  </h5>
                  <h5>
                    <FaTemperatureHigh />
                    Feels Like:
                  </h5>
                  <h5>
                    <WaterIcon />
                    Humidity:
                  </h5>
                  <h5>
                    <MdOutlineAir />
                    Wind Speed:
                  </h5>
                  <h5>
                    <FaTemperatureHigh />
                    Condition:
                  </h5>
                
                </div>
                <div className="card-items">
                  <h5>{Math.round(userData.cloudpct)} %</h5>
                  <h5>{Math.round(userData.feelLike)} °C</h5>
                  <h5>{Math.round(userData.humidity)} %</h5>
                  <h5>{Math.round(userData.windSpeed)} MPH</h5>
                  <h5>{userData.condition}</h5>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
