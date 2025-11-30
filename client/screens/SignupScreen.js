import { View, Text } from "react-native";
import { useState } from "react";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";

import { createUser } from "../data/users";

function SignupScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [confirmedPass, setConfirmedPass] = useState("");

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
        {/* <TextField
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmedPass}
          onChangeText={setConfirmedPass}
        ></TextField> */}
        {/* {password !== confirmedPass ? (
          <Typography color={"#ff616d"}>Passwords must match</Typography>
        ) : (
          <></>
        )} */}
        {error ? <Typography color={"#ff616d"}>{error}</Typography> : null}
      </View>
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <Button
          text="Sign up"
          onPress={async () => {
            try {
              setError("");

              // Validate input fields
              if (!name.trim()) {
                setError("Name is required");
                return;
              }
              if (!email.trim()) {
                setError("Email is required");
                return;
              }
              if (!password) {
                setError("Password is required");
                return;
              }

              await createUser(name, email, password);
              navigation.navigate("Login");
            } catch (err) {
              setError(
                "Account with this email already exists. Please try a different email."
              );
            }
          }}
        />
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
