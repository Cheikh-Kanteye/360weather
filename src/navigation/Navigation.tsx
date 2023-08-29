import "react-native-gesture-handler";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../utils/type";
import { Home, Location, RecentLocation, WeatherDetails } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { height, margin, spacing, width } from "../constants/metrics";
import { icons } from "../constants/icons";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const focused = props.accessibilityState?.selected;
          return (
            <Pressable
              onPress={props.onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#131455" : "transparent",
                }}
              >
                {props.children}
              </View>
              {focused && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#131455",
                    marginTop: spacing,
                  }}
                />
              )}
            </Pressable>
          );
        },
        tabBarStyle: {
          position: "absolute",
          bottom: margin,
          left: margin,
          width: width - margin * 2,
          height: height * 0.11,
          borderRadius: margin * 1.8,
          backgroundColor: "rgba(255, 255, 255, .3)",
          elevation: 0,
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 0 },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.home}
              style={{ width: 20, height: 20, tintColor: "#fff" }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.pin}
              style={{ width: 22, height: 22, tintColor: "#fff" }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="RecentLocation"
        component={RecentLocation}
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.menu}
              style={{ width: 22, height: 22, tintColor: "#fff" }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});
export default Navigation;
