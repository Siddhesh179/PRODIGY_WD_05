import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "../components/weather.module.css";
import { MdSunny } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { BsFillCloudHaze2Fill } from "react-icons/bs";
import { FaCloudSun } from "react-icons/fa";
const Weather = () => {
  const inputref = useRef();
  const [weatherdata, setweatherdata] = useState(false);
  const allicons = {
    "01d": <FaCloudSun />,
    "01n": <TiWeatherSunny />,
    "02d": <TiWeatherCloudy />,
    "02n": <TiWeatherCloudy />,
    "03d": <TiWeatherCloudy />,
    "03n": <TiWeatherCloudy />,
    "04d": <TiWeatherDownpour />,
    "04n": <TiWeatherDownpour />,
    "09d": <TiWeatherShower />,
    "09n": <TiWeatherShower />,
    "10d": <TiWeatherShower />,
    "10n": <TiWeatherShower />,
    "13d": <TiWeatherSnow />,
    "13n": <TiWeatherSnow />,
    "50d": <BsFillCloudHaze2Fill />,
    "50n": <BsFillCloudHaze2Fill />,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allicons[data.weather[0].icon] || <TiWeatherSunny />;
      setweatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      inputref.current.value = "";
      setweatherdata(false);
      alert("City not found");
      console.error("error in fetching data");
    }
  };
  useEffect(() => {
    search("New York");
  }, []);
  return (
    <div className={styles.weather}>
      <div className={styles.searchbar}>
        <input ref={inputref} type="text" placeholder="search" />
        <img
          src="/OIP.jpeg"
          alt=""
          onClick={() => search(inputref.current.value)}
        />
      </div>
      {weatherdata ? (
        <>
          <div className={styles.icon}>{weatherdata.icon}</div>{" "}
          {/* Render the icon as JSX */}
          <p className={styles.temperature}>{weatherdata.temperature} °C</p>
          <p className={styles.location}>{weatherdata.location}</p>
          <div className={styles.weatherdata}>
            <div className={styles.col}>
              <WiHumidity />
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className={styles.col}>
              <GiWhirlwind />
              <div>
                <p>{weatherdata.windSpeed}kmph</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
