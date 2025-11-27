import { View, Text } from "react-native";

function PracticeScreen({ navigation, route }) {
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
      <Text>This is Practice</Text>
    </View>
  );
}

export default PracticeScreen;
