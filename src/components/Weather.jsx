import React, { useState } from 'react';
import "../index.css";

const Weather = () => {
    const api = {
        key: "51ae3f7c4b5c795e931cb7846f1f91b3",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };

    const [search, setSearch] = useState("");
    const [value, setValue] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function enter(x) {
        if (x.key === "Enter") {
            searchWeather();
        }
    }

    function searchWeather() {
        setLoading(true);
        setError(null);

        fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
            .then(response => { 
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(val => {
                setValue(val);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    return (
        <div>
            <section>
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={enter}
                    placeholder="Enter city name"
                />
                <button onClick={searchWeather}>Search</button>
            </section>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                value.main ? (
                    <>
                        <p>{value.name}</p>
                        <p>{value.main.temp} °C</p>
                    </>
                ) : (
                    !error && !loading
                )
            )}
        </div>
    );
}

export default Weather;
