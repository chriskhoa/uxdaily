import { View, Text, Button } from "react-native";

// login screen
function LoginScreen({ navigation, route }) {
  return (
    <View>
      <Text>This is Login</Text>
      <Button title="Sign up" onPress={() => navigation.navigate("Signup")} />
      <Button title="Login" onPress={() => navigation.navigate("Main")} />
    </View>
  );
}

export default LoginScreen;
