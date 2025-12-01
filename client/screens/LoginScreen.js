import { View, Text } from "react-native";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../features/userSlice";

// login screen
function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      {error ? (
        <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
      ) : null}
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <Button
          text="Login"
          onPress={async () => {
            try {
              setError("");
              const result = await dispatch(loginThunk({ email, password }));
              if (result.type === loginThunk.fulfilled.type) {
                navigation.navigate("Main");
              } else {
                setError("Login failed. Please check your credentials.");
              }
            } catch (err) {
              setError("An error occurred. Please try again.");
            }
          }}
        />
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
