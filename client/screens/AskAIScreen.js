import { View, FlatList } from "react-native";
import { useState } from "react";
import MessageBubble from "../components/ui/MessageBubble";
import MessageInput from "../components/ui/MessageInput";
import NavBar from "../components/ui/NavBar";
import { useSelector, useDispatch } from "react-redux";

function AskAIScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi ${user.name}! How can I help you today?`,
      isSender: false,
    },
  ]);

  const handleSend = (message) => {
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isSender: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <View style={{ marginTop: 70, width: "100%" }}>
        <NavBar
          title="Ask AI"
          showBorder={false}
          onLeftPress={() => navigation.goBack()}
        ></NavBar>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <FlatList
          style={{
            width: "100%",
            padding: 10,
          }}
          data={[...messages].reverse()}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <MessageBubble message={item.text} isSender={item.isSender} />
            );
          }}
          inverted
        />
      </View>
      <View style={{ padding: 20, width: "90%", gap: 10 }}>
        <MessageInput placeholder="Type a message..." onSend={handleSend} />
      </View>
    </View>
  );
}

export default AskAIScreen;
