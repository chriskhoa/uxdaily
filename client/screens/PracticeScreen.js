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
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        // gap: 30,
      }}
    >
      <View
        style={{
          marginTop: 70,
        }}
      >
        <Typography variant="h1">Practice Your Mistakes</Typography>
      </View>
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
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default PracticeScreen;
