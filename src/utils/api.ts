const API_KEY = "1cfe1ad34d1b4de0a4000529232906";
const API_URL = "http://api.weatherapi.com/v1/";

type coords = { lat: number | undefined; lon: number | undefined };

//TODO: Make a useFecth hook to simplifie all the the api fetch request
export const fetchWeatherData = async ({ lat, lon }: coords) => {
  let data;
  try {
    const response = await fetch(
      `${API_URL}current.json?key=${API_KEY}&q=${lat},${lon}`
    );
    data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error fetching weather current: ${error}`);
  }
  return data ? data : null;
};

export const fetchWeatherAstro = async ({
  name,
  date,
}: {
  name: string;
  date: string;
}) => {
  let data;
  try {
    const response = await fetch(
      `${API_URL}astronomy.json?key=${API_KEY}&q=${name}&dt=${date}`
    );
    data = await response.json();

    return data?.astronomy?.astro;
  } catch (error) {
    console.log(`Error fetching weather astronomy: ${error}`);
  }
  return data != null ? data : null;
};

export const fetchWeatherForecast = async ({ lat, lon }: coords) => {
  let data;
  try {
    const response = await fetch(
      `${API_URL}forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1`
    );
    data = await response.json();
    return data?.forecast?.forecastday[0];
  } catch (error) {
    console.log(`Error fetching weather forecast: ${error}`);
  }
  return data != null ? data : null;
};
