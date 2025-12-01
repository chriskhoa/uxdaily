import { useState } from "react";
import { View, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../features/userSlice";

// Helper function to convert "HH:MM" string to Date object
const timeStringToDate = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

// Helper function to convert Date object to "HH:MM" string
const dateToTimeString = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(
    user?.settings?.soundEnabled || false
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user?.settings?.notificationsEnabled || false
  );
  const [reminderTime, setReminderTime] = useState(
    user?.settings?.reminderTime
      ? timeStringToDate(user.settings.reminderTime)
      : new Date()
  );
  const [edit, setEdit] = useState("disabled");

  const handleSaveChanges = async () => {
    const updates = {
      id: user.id,
      name,
      email,
      settings: {
        ...user.settings,
        notificationsEnabled,
        reminderTime: dateToTimeString(reminderTime),
        soundEnabled,
      },
    };

    // Only include password if it was changed
    if (password) {
      updates.password = password;
    }

    await dispatch(updateUserThunk(updates));
    setEdit("disabled");
    setPassword(""); // Clear password field after save
  };

  const handleCancelChanges = () => {
    // Reset form to original user values
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setSoundEnabled(user.settings.soundEnabled);
    setNotificationsEnabled(user.settings.notificationsEnabled);
    setReminderTime(timeStringToDate(user.settings.reminderTime));
    setEdit("disabled");
  };

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
        <Typography variant="h1">Your Profile</Typography>
      </View>
      <View
        style={{
          width: "80%",
          gap: 10,
        }}
      >
        <TextField
          title="Name"
          placeholder="Name"
          state={edit}
          value={name}
          onChangeText={setName}
        />
        <TextField
          title="Email"
          placeholder="Email"
          state={edit}
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          title="Password"
          placeholder="Password"
          state={edit}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Sound</Typography>
          <Switch
            onValueChange={setSoundEnabled}
            value={soundEnabled}
            disabled={edit === "disabled" ? true : false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Notification</Typography>
          <Switch
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
            disabled={edit === "disabled" ? true : false}
          />
        </View>
        {notificationsEnabled ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <Typography>Pick a daily reminder time</Typography>
            <DateTimePicker
              value={reminderTime}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setReminderTime(selectedDate);
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
          <Button text="Save changes" onPress={handleSaveChanges} />
          <Button
            text="Cancel changes"
            variant="secondary"
            status="warning"
            onPress={handleCancelChanges}
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
