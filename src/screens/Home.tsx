import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  AppContainer,
  ForecastCard,
  WeatherCard,
  WeeklyCard,
} from "../components";
import { margin, spacing, width } from "../constants/metrics";
import { icons } from "../constants/icons";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  fetchWeatherAstro,
  fetchWeatherData,
  fetchWeatherForecast,
} from "../utils/api";

const API_KEY = "1cfe1ad34d1b4de0a4000529232906";
const API_URL = "http://api.weatherapi.com/v1/";

const Home = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [weatherForecast, setWeatheForecast] = useState<any>();
  const [weatherAstro, setWeatheAstro] = useState<any>();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const location = weatherData?.location;
  const current = weatherData?.current;
  const condition = current?.condition;
  const lat = currentLocation?.coords.latitude;
  const lon = currentLocation?.coords.longitude;
  const countryName = location?.name;
  const localDate = location?.localtime;
  const handleRefresh = async () => {
    let requestCount = 3;

    const checkRequestsComplete = () => {
      requestCount--;
      if (requestCount === 0) {
        setIsLoading(false);
      }
    };

    await fetchWeatherData({ lat, lon })
      .then((data) => {
        setWeatherData(data);
        checkRequestsComplete();
      })
      .catch(() => {
        checkRequestsComplete();
      });
    await fetchWeatherForecast({ lat, lon })
      .then((data) => {
        setWeatheForecast(data);
        checkRequestsComplete();
      })
      .catch(() => {
        checkRequestsComplete();
      });
    await fetchWeatherAstro({ name: countryName, date: localDate })
      .then((data) => {
        setWeatheAstro(data);
        checkRequestsComplete();
      })
      .catch(() => {
        checkRequestsComplete();
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedDate = moment(location?.localtime).format("D MMM");
      const formattedTime = moment(location?.localtime).format("h:mm A");
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [currentLocation]);

  if (errorMsg != null) console.error(errorMsg);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <AppContainer>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.rowStart}>
            <Image
              source={icons.pin}
              style={{ width: 24, height: 24, tintColor: "#fff" }}
              resizeMode="contain"
            />
            <Text style={styles.locationName}>{location?.name}</Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
            <Ionicons
              name="refresh"
              size={22}
              color={"#131455"}
              style={{
                transform: [{ rotateY: "180deg" }],
              }}
            />
          </TouchableOpacity>
        </View>
        <WeatherCard
          date={`${currentDate} | ${currentTime}`}
          condition={{ text: condition?.text }}
          temp_c={Math.floor(current?.temp_c)}
        />
        <View style={{ height: margin * 3 }} />
        <ScrollView
          contentContainerStyle={{ columnGap: margin, paddingLeft: margin * 2 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <ForecastCard
            icon={0}
            label="Feels like"
            value={`${Math.floor(current?.feelslike_c)}°`}
            description="Similar to the actual temperature"
            onPress={() => null}
          />
          <ForecastCard
            icon={0}
            label="Humidity"
            value={`${current?.humidity}%`}
            description="Similar to the actual temperature"
            onPress={() => null}
          />
          <ForecastCard
            icon={0}
            label="Sunrise"
            value={`${weatherAstro?.sunrise}`}
            description="Similar to the actual temperature"
            onPress={() => null}
          />
          <ForecastCard
            icon={0}
            label="Sunset"
            value={`${weatherAstro?.sunset}`}
            description="Similar to the actual temperature"
            onPress={() => null}
          />
        </ScrollView>
        <View style={styles.row}>
          <Text style={styles.today}>Today</Text>
          <TouchableOpacity>
            <Text style={{ color: "rgba(255, 255, 255, .8)" }}>
              Daily Forecast
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: margin * 2,
            gap: spacing,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {Array.isArray(weatherForecast?.hour) ? (
            weatherForecast?.hour?.map((hourlyForecast: any, index: any) => {
              return (
                <WeeklyCard
                  key={index}
                  onPress={() => null}
                  icon={icons[hourlyForecast.condition.text as never]}
                  hour={`${moment(hourlyForecast.time).format("h:mm A")}`}
                  temp={`${Math.floor(hourlyForecast.temp_c)}`}
                />
              );
            })
          ) : (
            <View
              style={{
                width: width - margin * 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </AppContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: margin * 2,
    paddingHorizontal: margin * 2,
  },
  locationName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  rowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: margin,
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: margin * 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255, 255, .2)",
  },
  today: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 50,
  },
});
