import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageBubble = ({
  message = "",
  isSender = false, // true for sent messages (blue), false for received messages (gray)
  timestamp,
  showTimestamp = false,
  maxWidth = "80%",
  senderColor = "#2196F3",
  senderTextColor = "#FFFFFF",
  receiverColor = "#F0F0F0",
  receiverTextColor = "#000000",
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          { maxWidth },
          isSender
            ? [styles.senderBubble, { backgroundColor: senderColor }]
            : [styles.receiverBubble, { backgroundColor: receiverColor }],
        ]}
        {...props}
      >
        <Text
          style={[
            styles.messageText,
            { color: isSender ? senderTextColor : receiverTextColor },
          ]}
        >
          {message}
        </Text>

        {showTimestamp && timestamp && (
          <Text
            style={[
              styles.timestamp,
              { color: isSender ? senderTextColor : receiverTextColor },
            ]}
          >
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  senderContainer: {
    justifyContent: "flex-end",
  },
  receiverContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  senderBubble: {
    backgroundColor: "#2196F3",
    borderBottomRightRadius: 4,
  },
  receiverBubble: {
    backgroundColor: "#F0F0F0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
});

export default MessageBubble;
