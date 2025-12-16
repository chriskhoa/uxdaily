//fully ai-gen UI component
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TextField = ({
  title = "",
  placeholder = "Placeholder",
  value = "",
  onChangeText,
  showTitle = true,
  showPlaceholder = true,
  showSupportText = false,
  supportText = "",
  showIcon = false,
  iconName = "search",
  showUnit = false,
  unit = "",
  state = "default", // 'default', 'active', 'disabled', 'error'
  multiline = false,
  secureTextEntry = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getStateStyles = () => {
    if (state === "error") {
      return styles.inputError;
    }
    if (state === "active" || isFocused) {
      return styles.inputActive;
    }
    if (state === "disabled") {
      return styles.inputDisabled;
    }
    return styles.inputDefault;
  };

  const getTextColor = () => {
    if (state === "disabled") return "#A0A0A0";
    if (state === "error") return "#D32F2F";
    return "#000000";
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      {showTitle && title && <Text style={styles.title}>{title}</Text>}

      {/* Input Container */}
      <View style={[styles.inputContainer, getStateStyles()]}>
        {/* Icon */}
        {showIcon && (
          <Ionicons
            name={iconName}
            size={20}
            color={state === "disabled" ? "#A0A0A0" : "#666666"}
            style={styles.icon}
          />
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            { color: getTextColor() },
            multiline && styles.multilineInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={showPlaceholder ? placeholder : ""}
          placeholderTextColor="#A0A0A0"
          editable={state !== "disabled"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />

        {/* Password Toggle Icon */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            disabled={state === "disabled"}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color={state === "disabled" ? "#A0A0A0" : "#666666"}
            />
          </TouchableOpacity>
        )}

        {/* Unit */}
        {showUnit && unit && (
          <Text
            style={[styles.unit, state === "disabled" && styles.unitDisabled]}
          >
            {unit}
          </Text>
        )}
      </View>

      {/* Support Text */}
      {showSupportText && supportText && (
        <Text
          style={[
            styles.supportText,
            state === "error" && styles.supportTextError,
          ]}
        >
          {supportText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  inputDefault: {
    borderColor: "#E0E0E0",
  },
  inputActive: {
    borderColor: "#2196F3",
  },
  inputError: {
    borderColor: "#D32F2F",
  },
  inputDisabled: {
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
  },
  icon: {
    marginRight: 8,
  },
  eyeIcon: {
    // marginLeft: 8,
    // padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    padding: 0,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  unit: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  unitDisabled: {
    color: "#A0A0A0",
  },
  supportText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 6,
    marginLeft: 4,
  },
  supportTextError: {
    color: "#D32F2F",
  },
});

export default TextField;
