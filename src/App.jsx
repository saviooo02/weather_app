import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Kochi");
  const [newCity, setNewCity] = useState("Kochi");
  const [result, setResult] = useState(null); 
  const [background, setBackground] = useState("");

  const handleChange = (e) => {
    setNewCity(e.target.value);
  };

  const changeCity = (e) => {
    e.preventDefault();
    setCity(newCity);
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3533d24e9942abfdd68503c92176635a`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log("Weather Data:", data);
      });
  }, [city]);

  useEffect(() => {
    if (result && result.weather) {
      fetch(
        `https://pixabay.com/api/videos/?key=46494219-7734c2445b2ca3c5c4161d3f1&q=${result.weather[0].description}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.hits.length > 0) {
            setBackground( data.hits[0].videos.large.url);
          } else {
            console.log("No video found for this weather condition.");
          }
        })
        .catch((error) => console.error("Error fetching video:", error));
    }
  }, [result]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute opacity-80 z-0 w-auto min-w-full min-h-full max-w-none"
        src={background}
      >
      </video>

      <div className="z-10 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          ClimaTrack
        </h1>
        <form onSubmit={changeCity} className="mb-8">
          <div className="flex">
            <input
              type="text"
              name="city"
              required
              placeholder="Enter the city"
              onChange={handleChange}
              value={newCity}
              className="flex-grow px-4 py-3 rounded-l-full border-2  bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-60"
            />
            <button
              type="submit"
              className="bg-white bg-opacity-30 text-white px-6 py-3 rounded-r-full hover:bg-opacity-40 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
        {result && result.weather && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">
              {result.name}
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <p className="text-sm text-white font-medium mb-1">
                  Temperature
                </p>
                <p className="text-2xl font-bold text-white">
                  {result.main.temp}°C
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <p className="text-sm text-white font-medium mb-1">Humidity</p>
                <p className="text-2xl font-bold text-white">
                  {result.main.humidity}%
                </p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
              <p className="text-sm text-white font-medium mb-1">
                Description
              </p>
              <p className="text-2xl font-bold text-white capitalize">
                {result.weather[0].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;