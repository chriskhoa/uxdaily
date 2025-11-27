import { View, Text } from "react-native";
import { useState } from "react";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";

function SignupScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");

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
      <View
        style={{
          width: "80%",
        }}
      >
        <Typography variant="h1">Sign up</Typography>
        <Typography variant="bodyL">
          Create an account to get started
        </Typography>
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <TextField
          title="Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        ></TextField>
        <TextField
          title="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        ></TextField>
        <TextField
          title="Password"
          placeholder="Create password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextField>
        <TextField
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmedPass}
          onChangeText={setConfirmedPass}
        ></TextField>
        {password !== confirmedPass ? (
          <Typography color={"#ff616d"}>Passwords must match</Typography>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <Button onPress={() => navigation.navigate("Login")} text="Sign up" />
        <Button
          variant="secondary"
          onPress={() => navigation.navigate("Login")}
          text="Cancel"
          status="warning"
        />
      </View>
    </View>
  );
}

export default SignupScreen;
