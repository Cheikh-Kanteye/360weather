import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { width, height } from "./src/constants/metrics";

const App = () => {
  return (
    <SafeAreaProvider style={{ width: width, height: height }}>
      <StatusBar translucent style="light" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
