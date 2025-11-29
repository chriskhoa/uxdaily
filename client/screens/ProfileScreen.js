//// Implement the login logic first
//// Create an edit profile button that lead to a new screen
//// Display the info like: Name: Chris Nguyen

import { useState } from "react";
import { View, Text, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";

function ProfileScreen({ navigation, route }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [time, setTime] = useState(new Date());
  const [edit, setEdit] = useState("disabled");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        gap: 20,
        marginBottom: 10,
      }}
    >
      <View style={{ marginTop: 70 }}>
        <Typography variant="h1">Profile</Typography>
      </View>
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <TextField title="Name" placeholder="Name" state={edit}>
          Khoa Nguyen
        </TextField>
        <TextField title="Email" placeholder="Email" state={edit}>
          chris@email.com
        </TextField>
        <TextField
          title="Password"
          placeholder="Password"
          state={edit}
          secureTextEntry={true}
        >
          passchris
        </TextField>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Notification</Typography>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </View>
        {isEnabled ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <Typography>Pick a daily reminder time</Typography>
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setTime(selectedDate);
                }
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      {edit === "default" ? (
        <View
          style={{
            width: "80%",
            gap: 10,
          }}
        >
          <Button text="Save changes" onPress={() => setEdit("disabled")} />
          <Button
            text="Cancel changes"
            status="warning"
            onPress={() => setEdit("disabled")}
          />
        </View>
      ) : (
        <View
          style={{
            width: "80%",
            gap: 10,
          }}
        >
          <Button text="Edit profile" onPress={() => setEdit("default")} />
          <Button
            text="Logout"
            status="warning"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;
