import { View, Text } from "react-native";

function ProfileScreen({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap: 30,
      }}
    >
      <Text>This is Profile</Text>
    </View>
  );
}

export default ProfileScreen;
