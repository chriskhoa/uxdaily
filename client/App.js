import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MainScreen from "./screens/MainScreen";

const RootStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screens: {
    Login: LoginScreen,
    Signup: SignupScreen,
    Main: MainScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
