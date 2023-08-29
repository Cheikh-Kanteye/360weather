import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, StatusBar as RNStatusBar, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

const AppContainer = ({ children }: { children: ReactNode }) => {
  const visibility = NavigationBar.useVisibility();
  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBehaviorAsync("overlay-swipe");
    setTimeout(() => {
      NavigationBar.setVisibilityAsync("hidden");
    }, 1500);
  }, [visibility]);

  return (
    <View style={{ flex: 1, paddingTop: RNStatusBar.currentHeight || 32 }}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={["#131455", "#332DB3", "#A674CD"]}
        end={{ x: -0.1, y: 0.87 }}
      />
      {children}
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
