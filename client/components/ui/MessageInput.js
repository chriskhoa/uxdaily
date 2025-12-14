import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MessageInput = ({
  value = "",
  onChangeText,
  onSend,
  placeholder = "Type a message...",
  disabled = false,
  backgroundColor = "#F0F0F0",
  textColor = "#000000",
  placeholderColor = "#AAAAAA",
  sendButtonColor = "#2196F3",
  sendIconColor = "#FFFFFF",
  maxLength,
  multiline = true,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChangeText = (text) => {
    setInputValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && onSend) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  const canSend = inputValue.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor }]}>
        {/* Text Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { color: textColor },
              multiline && styles.multilineInput,
            ]}
            value={inputValue}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            multiline={multiline}
            maxLength={maxLength}
            editable={!disabled}
            {...props}
          />
        </View>

        {/* Send Button - Only show when there's text */}
        {canSend && (
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: sendButtonColor }]}
            onPress={handleSend}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={15} color={sendIconColor} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 40,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginRight: 12,
    minHeight: 30,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "#000000",
    minHeight: 20,
    paddingVertical: 0,
  },
  multilineInput: {
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 100,
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 22,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageInput;
