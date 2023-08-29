import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { margin, spacing } from "../constants/metrics";
import { icons } from "../constants/icons";

interface WeeklyCardProps {
  temp: string;
  icon: ImageSourcePropType;
  hour: string;
  onPress: () => void;
}

const WeeklyCard = ({ temp, icon, hour, onPress }: WeeklyCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.temp}>{temp}°</Text>
      <Image
        source={icon ? icon : icons["Partly cloudy"]}
        style={{ width: 44, height: 44 }}
        resizeMode="contain"
      />
      <Text style={styles.hours}>{hour}</Text>
    </TouchableOpacity>
  );
};

export default WeeklyCard;

const styles = StyleSheet.create({
  container: {
    padding: spacing * 2,
    backgroundColor: "rgba(65, 50, 138, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    gap: margin,
    borderRadius: 10,
  },
  hours: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: spacing,
  },
  temp: { fontSize: 18, fontWeight: "bold", color: "white" },
});
