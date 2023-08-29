import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { margin, spacing, width } from "../constants/metrics";

interface ForecastCardProps {
  icon: ImageSourcePropType;
  label?: string;
  value: string;
  description?: string;
  onPress: () => void;
}

const ForecastCard = ({
  description,
  icon,
  label,
  value,
  onPress,
}: ForecastCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Image source={icon} />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={{ color: "#fff", fontSize: 10 }}>{description}</Text>
    </TouchableOpacity>
  );
};

export default ForecastCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: spacing * 2,
    backgroundColor: "rgba(65, 50, 138, 0.4)",
    padding: margin * 1.2,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: spacing,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
