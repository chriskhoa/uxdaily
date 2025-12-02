import { View, Text } from "react-native";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import NavBar from "../components/ui/NavBar";

function AskAIScreen({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        gap: 20,
        marginBottom: 10,
      }}
    >
      <View style={{ marginTop: 70, width: "100%" }}>
        <NavBar
          title="Ask AI"
          showBorder={false}
          onLeftPress={() => navigation.goBack()}
        ></NavBar>
      </View>
    </View>
  );
}

export default AskAIScreen;
