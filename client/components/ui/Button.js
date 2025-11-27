import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Button = ({
  variant = "primary", // 'primary', 'secondary', 'tertiary'
  status = "normal", // 'normal', 'warning', 'success'
  text = "Button",
  showText = true,
  onPress,
  leftIcon,
  rightIcon,
  showLeftIcon = false,
  showRightIcon = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
      return baseStyle;
    }

    // Apply status colors with variants
    if (status === "warning") {
      switch (variant) {
        case "primary":
          return [...baseStyle, styles.buttonWarningPrimary];
        case "secondary":
          return [...baseStyle, styles.buttonWarningSecondary];
        case "tertiary":
          return [...baseStyle, styles.buttonWarningTertiary];
        default:
          return [...baseStyle, styles.buttonWarningPrimary];
      }
    }

    if (status === "success") {
      switch (variant) {
        case "primary":
          return [...baseStyle, styles.buttonSuccessPrimary];
        case "secondary":
          return [...baseStyle, styles.buttonSuccessSecondary];
        case "tertiary":
          return [...baseStyle, styles.buttonSuccessTertiary];
        default:
          return [...baseStyle, styles.buttonSuccessPrimary];
      }
    }

    // Apply variant styles for normal status
    switch (variant) {
      case "primary":
        return [...baseStyle, styles.buttonPrimary];
      case "secondary":
        return [...baseStyle, styles.buttonSecondary];
      case "tertiary":
        return [...baseStyle, styles.buttonTertiary];
      default:
        return [...baseStyle, styles.buttonPrimary];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    if (disabled) {
      return [...baseStyle, styles.textDisabled];
    }

    // Status colors
    if (status === "warning") {
      if (variant === "primary") {
        return [...baseStyle, styles.textPrimary]; // white text for filled
      }
      return [...baseStyle, styles.textWarning]; // warning color for secondary/tertiary
    }

    if (status === "success") {
      if (variant === "primary") {
        return [...baseStyle, styles.textPrimary]; // white text for filled
      }
      return [...baseStyle, styles.textSuccess]; // success color for secondary/tertiary
    }

    switch (variant) {
      case "primary":
        return [...baseStyle, styles.textPrimary];
      case "secondary":
        return [...baseStyle, styles.textSecondary];
      case "tertiary":
        return [...baseStyle, styles.textTertiary];
      default:
        return [...baseStyle, styles.textPrimary];
    }
  };

  const getIconColor = () => {
    if (disabled) return "#A0A0A0";

    // Status colors
    if (status === "warning") {
      if (variant === "primary") {
        return "#FFFFFF"; // white icon for filled
      }
      return "#ff616d"; // warning color for secondary/tertiary
    }

    if (status === "success") {
      if (variant === "primary") {
        return "#FFFFFF"; // white icon for filled
      }
      return "#298267"; // success color for secondary/tertiary
    }

    switch (variant) {
      case "primary":
        return "#FFFFFF";
      case "secondary":
        return "#2196F3";
      case "tertiary":
        return "#2196F3";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getIconColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {/* Left Icon */}
          {showLeftIcon && leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={getIconColor()}
              style={styles.leftIcon}
            />
          )}

          {/* Text */}
          {showText && <Text style={getTextStyle()}>{text}</Text>}

          {/* Right Icon */}
          {showRightIcon && rightIcon && (
            <Ionicons
              name={rightIcon}
              size={20}
              color={getIconColor()}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    flexDirection: "row",
  },
  fullWidth: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // Primary Button (Filled, Blue)
  buttonPrimary: {
    backgroundColor: "#2196F3",
  },

  // Secondary Button (Outlined, Blue border)
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#2196F3",
  },

  // Tertiary Button (Text only, no border)
  buttonTertiary: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },

  // Warning Status Variants
  buttonWarningPrimary: {
    backgroundColor: "#ff616d",
  },
  buttonWarningSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#ff616d",
  },
  buttonWarningTertiary: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },

  // Success Status Variants
  buttonSuccessPrimary: {
    backgroundColor: "#298267",
  },
  buttonSuccessSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#298267",
  },
  buttonSuccessTertiary: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },

  // Disabled State
  buttonDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },

  // Text Styles
  text: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  textSecondary: {
    color: "#2196F3",
  },
  textTertiary: {
    color: "#2196F3",
  },
  textWarning: {
    color: "#ff616d",
  },
  textSuccess: {
    color: "#298267",
  },
  textDisabled: {
    color: "#A0A0A0",
  },

  // Icon Styles
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;
