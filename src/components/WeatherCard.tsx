import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { margin, spacing, width } from "../constants/metrics";
import { icons } from "../constants/icons";

interface WeatherCardProps {
  date: string;
  temp_c: number;
  condition: {
    text: string;
  };
}

const WeatherCard = ({
  date,
  temp_c,
  condition: { text },
}: WeatherCardProps) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <LinearGradient
        colors={["#514093", "#a674cd", "#6f7ad0"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: -0.2, y: -0.4 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.textLight, textAlign: "right" }}>
          Today, {date}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.temp}>{temp_c}°</Text>
            <Text style={styles.textLight}>{text}</Text>
          </View>
          <Image
            //@ts-ignore
            source={icons[text]}
            resizeMode="contain"
            style={{ width: 120, height: 120 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width - margin * 4,
    minHeight: 170,
    borderRadius: spacing * 3,
    overflow: "hidden",
    padding: margin * 2,
    marginHorizontal: margin * 2,
  },
  textLight: {
    fontSize: 13,
    color: "#fff",
  },
  temp: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
});
