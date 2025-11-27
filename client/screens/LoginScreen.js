import { View, Text } from "react-native";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";

// login screen
function LoginScreen({ navigation, route }) {
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
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700", // Extra bold
          }}
        >
          UX DAILY
        </Text>
      </View>
      <View
        style={{
          width: "80%",
          gap: 0,
        }}
      >
        <TextField placeholder="username" />
        <TextField placeholder="password" />
      </View>
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <Button onPress={() => navigation.navigate("Main")} text="Login" />
        <Button
          variant="tertiary"
          onPress={() => navigation.navigate("Signup")}
          text="Not a member? Register now"
        />
      </View>
    </View>
  );
}

export default LoginScreen;
