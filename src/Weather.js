import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const apiKey = "0ebea94f952d4975afa170304242908"; // Replace with your actual API key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
            );
            setWeather(response.data);
            setError("");
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setError(error.response.data.error.message);
            } else {
                setError("An error occurred");
            }
            setWeather(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather();
        } else {
            setError("Please enter a city name");
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weather && weather.current && (
                <div>
                    <h2>{weather.location.name}</h2>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Weather: {weather.current.condition.text}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
