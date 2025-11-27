import { View, Text, TextInput } from "react-native";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import { useState } from "react";

// login screen
function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            fontWeight: "700",
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
        <TextField placeholder="email" value={email} onChangeText={setEmail} />
        <TextField
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
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
