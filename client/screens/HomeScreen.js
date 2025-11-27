import { View, Text, ScrollView } from "react-native";
import Card from "../components/ui/Card";
import Typography from "../components/ui/Typography";

function HomeScreen({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
      //   contentContainerStyle={{
      //     alignItems: "center",
      //     paddingVertical: 20,
      //   }}
    >
      <View
        style={{
          marginTop: 70,
        }}
      >
        <Typography variant="h1">Your Learning</Typography>
      </View>

      <ScrollView
        style={{
          width: "100%",
          marginTop: 20,
          padding: 20,
        }}
      >
        <Card status="complete" />
        <Card status="complete" />
        <Card status="complete" />
        <Card status="complete" />
        <Card status="start" onPress={() => navigation.navigate("Lesson")} />
        <Card status="to start" />
        <Card status="to start" />
        <Card status="to start" />
        <Card status="to start" />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
