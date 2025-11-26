import { View, Text, Button } from "react-native";

// login screen
function LoginScreen({ navigation, route }) {
  return (
    <View>
      <Text>This is Login</Text>
      <Button>Signup</Button>
      <Button>Login</Button>
    </View>
  );
}

export default LoginScreen;
