import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../features/userSlice";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";

function PracticeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    if (user) {
      setMistakes(user.mistakes);
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginTop: 70,
        }}
      >
        <Typography variant="h1">Practice Your Mistakes</Typography>
      </View>
      {mistakes && mistakes.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
            marginTop: 20,
            padding: 20,
          }}
          data={mistakes}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 20 }}>
                <Button
                  text={`Exercise ${item.exerciseId.slice(8)}`}
                  variant="secondary"
                  status="warning"
                  showRightIcon={true}
                  rightIcon="chevron-forward"
                  onPress={() =>
                    navigation.navigate("Mistake", { mistake: item })
                  }
                />
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Typography variant="bodyXL" style={{ textAlign: "center" }}>
            Congratulation! You cleared out all of your mistakes. Keep up the
            good work!
          </Typography>
        </View>
      )}
    </View>
  );
}

export default PracticeScreen;
