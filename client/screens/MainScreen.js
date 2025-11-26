// with 3 bottom tabs Profile, Home, Practice in the exact order
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";
import PracticeScreen from "./PracticeScreen";

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
