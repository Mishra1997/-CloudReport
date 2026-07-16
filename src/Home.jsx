import React, { useEffect, useState } from "react";
import "./home.css";
import {
  WiCelsius,
  WiCloud,
  WiHumidity,
  WiSunrise,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

const defaultWeather = {
  temp_c: 27.9,
  feelslike_c: 31.7,
  humidity: 77,
  cloud: 92,
  wind_kph: 24.5,
  pressure_mb: 997,
  vis_km: 10,
  uv: 1,
  gust_kph: 32.8,
  condition: {
    text: "Overcast",
    icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
  },
};

export default function Home() {
  const [weather, setWeather] = useState(defaultWeather);
  const [location, setLocation] = useState("Patna");
  const [inputValue, setInputValue] = useState("Patna");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    searchWeather("Patna");
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const searchWeather = async (place = inputValue) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a6bb6be9863446429e3202445240108&q=${place}`
      );

      if (!response.ok) {
        throw new Error("Unable to load weather data for this location.");
      }

      const data = await response.json();
      setWeather(data?.current || defaultWeather);
      setLocation(data?.location?.name || place);
      setInputValue(data?.location?.name || place);
    } catch (err) {
      setError(err.message || "Unable to fetch weather data right now.");
    } finally {
      setLoading(false);
    }
  };

  const conditionText = weather?.condition?.text || "Clear";
  const iconUrl = weather?.condition?.icon?.startsWith("//")
    ? `https:${weather.condition.icon}`
    : weather?.condition?.icon;

  // const getThemeClass = () => {
  //   const temp = weather?.temp_c ?? 20;
  //   if (temp >= 30) return "theme-hot";
  //   if (temp >= 40) return "theme-warm";
  //   if (temp >= 40) return "theme-cool";
  //   return "theme-cold";
  // };

  return (
    <div className="dashboard-shell">
      {/* <div className={`dashboard-card ${getThemeClass()}`}> */}
      <div className='dashboard-card' >
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Frontend portfolio project</p>
            <h1>Weather Intelligence Dashboard</h1>
            <p>
              A React-based weather application focused on live data handling,
              clean UI structure, and user-friendly information display.
            </p>
          </div>
          <div className="search-panel">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(event) => event.key === "Enter" && searchWeather()}
              placeholder="Search city"
              aria-label="Search city"
            />
            <button onClick={() => searchWeather()}>
              Check Weather
            </button>
          </div>
        </header>

        {error ? <div className="alert-banner">{error}</div> : null}

        <div className="hero-grid">
          <section className="hero-card main-card">
            <div className="location-pill">
              <WiSunrise size={24} />
              <span>{location}</span>
            </div>

            <div className="main-temp-row">
              <div>
                <p className="condition-label">{conditionText}</p>
                <h2>
                  {weather?.temp_c ?? "--"}
                  <WiCelsius className="inline-icon" />
                </h2>
                <p className="muted-text">
                  Feels like {weather?.feelslike_c ?? "--"}°C
                </p>
              </div>
              <div className="condition-icon">
                {iconUrl ? (
                  <img src={iconUrl} alt={conditionText} />
                ) : (
                  <WiCloud size={72} />
                )}
              </div>
            </div>

            <div className="metric-row">
              <div className="metric-chip">
                <WiHumidity size={24} />
                <span>Humidity {weather?.humidity ?? "--"}%</span>
              </div>
              <div className="metric-chip">
                <WiStrongWind size={24} />
                <span>Wind {weather?.wind_kph ?? "--"} km/h</span>
              </div>
            </div>
          </section>

          <section className="hero-card side-card">
            <p className="eyebrow">Project focus</p>
            <ul>
              <li>Integrated a live weather API for dynamic city-based data retrieval</li>
              <li>Built a responsive dashboard with reusable React components and state management</li>
              <li>Delivered a polished interface suitable for portfolio presentation and technical discussion</li>
            </ul>
            <div className="timeline">
              <div>
                <strong>Live Search</strong>
                <span>Instant location lookup with updated weather metrics</span>
              </div>
              <div>
                <strong>UI Design</strong>
                <span>Modern card-based layout with clear visual hierarchy</span>
              </div>
            </div>
          </section>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <WiThermometer size={28} />
            <div>
              <p>Pressure</p>
              <strong>{weather?.pressure_mb ?? "--"} mb</strong>
            </div>
          </article>
          <article className="stat-card">
            <WiCloud size={28} />
            <div>
              <p>Cloud Cover</p>
              <strong>{weather?.cloud ?? "--"}%</strong>
            </div>
          </article>
          <article className="stat-card">
            <WiStrongWind size={28} />
            <div>
              <p>Gust</p>
              <strong>{weather?.gust_kph ?? "--"} km/h</strong>
            </div>
          </article>
          <article className="stat-card">
            <WiHumidity size={28} />
            <div>
              <p>Visibility</p>
              <strong>{weather?.vis_km ?? "--"} km</strong>
            </div>
          </article>
        </div>

        <section className="insight-card">
          <div>
            <p className="eyebrow">Project impact</p>
            <h3>Developed as a practical React application for real-time weather insights and UI presentation.</h3>
            <p>
              This project reflects core front-end development skills including
              API integration, component-based architecture, responsive design,
              and a polished user experience suitable for professional review.
            </p>
          </div>
          <div className="pill-group">
            <span className="pill">React Hooks</span>
            <span className="pill">REST API</span>
            <span className="pill">Responsive UI</span>
          </div>
        </section>

        {loading ? <p className="loading-text">Loading live conditions...</p> : null}
      </div>
    </div>
  );
}
