import { View, FlatList } from "react-native";
import Card from "../components/ui/Card";
import Typography from "../components/ui/Typography";
import lessons from "../data/lessons";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../features/userSlice";

function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 70,
        }}
      >
        <Typography variant="h1">Your Learning</Typography>
      </View>
      <FlatList
        style={{
          width: "100%",
          marginTop: 20,
          padding: 20,
        }}
        data={lessons}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 20 }}>
              <Card
                status={
                  user?.lessonsCompleted?.includes(item.id)
                    ? "complete"
                    : "start"
                }
                title={item.title}
                subtitle={item.description}
                onPress={() => navigation.navigate("Lesson", { lesson: item })}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default HomeScreen;
