// with 3 bottom tabs Profile, Home, Practice in the exact order
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";
import PracticeScreen from "./PracticeScreen";

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Practice") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
