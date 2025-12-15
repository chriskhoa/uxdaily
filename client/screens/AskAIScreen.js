import { View, FlatList } from "react-native";
import { useState } from "react";
import MessageBubble from "../components/ui/MessageBubble";
import MessageInput from "../components/ui/MessageInput";
import NavBar from "../components/ui/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { chat } from "../data/aiChat";

function AskAIScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const { currentExercise } = route.params;
  const systemPrompt = buildSystemPrompt(currentExercise);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi ${user.name}! How can I help you today?`,
      isSender: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isSender: true,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Show loading indicator
    setIsLoading(true);
    const loadingMessage = {
      id: "loading",
      text: "Typing...",
      isSender: false,
      isLoading: true,
    };
    setMessages([...updatedMessages, loadingMessage]);

    try {
      // Transform messages to Anthropic format
      const anthropicMessages = updatedMessages.map((msg) => ({
        role: msg.isSender ? "user" : "assistant",
        content: msg.text,
      }));

      // Get AI response based on updated conversation
      const aiResponseText = await chat(anthropicMessages, systemPrompt);

      // Wrap AI response in message object format
      const aiMessage = {
        id: updatedMessages.length + 1,
        text: aiResponseText,
        isSender: false,
      };

      // Replace loading message with actual response
      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove loading message on error
      setMessages(updatedMessages);
    } finally {
      setIsLoading(false);
    }
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
          renderItem={({ item }) => {
            return (
              <MessageBubble message={item.text} isSender={item.isSender} />
            );
          }}
          inverted
        />
      </View>
      <View style={{ padding: 20, width: "90%", gap: 10 }}>
        <MessageInput
          placeholder="Type a message..."
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

function buildSystemPrompt(exercise) {
  const { type, content, question, options } = exercise;

  let exerciseContext = "";

  if (type === "reading") {
    exerciseContext = `Current lesson content:\n${content}`;
  } else if (type === "multiple_choice") {
    exerciseContext = `Current question: ${question}\nOptions: ${options.join(
      ", "
    )}`;
  } else if (type === "quiz") {
    exerciseContext = `Current question: ${question}`;
  }

  return `You are a helpful UX design tutor. The student is currently working on a UX learning exercise.

${exerciseContext}

Your role:
- Help the student understand THIS SPECIFIC exercise only
- Give explanations related to the current exercise
- Keep responses brief and focused (2-3 sentences max)
- Use a friendly, encouraging tone
- Do NOT discuss topics unrelated to this exercise
- If asked about unrelated topics, politely redirect to the current exercise

If the student asks something unrelated to the current exercise, respond with: "I can only help with the current exercise. Let's focus on understanding [brief topic of exercise]. What would you like to know about it?"`;
}

export default AskAIScreen;
