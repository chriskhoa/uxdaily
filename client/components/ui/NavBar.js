//fully ai-gen UI component
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NavBar = ({
  title = "Page Title",
  showTitle = true,
  // Left side props
  leftControl = "back", // 'back', 'cancel', 'none'
  leftIcon,
  leftText,
  showLeftIcon = true,
  showLeftText = false,
  onLeftPress,
  // Right side props
  rightControl = "none", // 'edit', 'heart', 'profile', 'none'
  rightIcon,
  rightText,
  showRightIcon = false,
  showRightText = false,
  onRightPress,
  // Styling
  backgroundColor = "#FFFFFF",
  titleColor = "#000000",
  iconColor = "#2196F3",
  textColor = "#2196F3",
  showBorder = true,
  ...props
}) => {
  // Determine left icon based on leftControl
  const getLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (leftControl === "back") return "chevron-back";
    if (leftControl === "cancel") return null;
    return null;
  };

  // Determine left text based on leftControl
  const getLeftText = () => {
    if (leftText) return leftText;
    if (leftControl === "cancel") return "Cancel";
    return "";
  };

  // Determine right icon based on rightControl
  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (rightControl === "edit") return null;
    if (rightControl === "heart") return "heart-outline";
    if (rightControl === "profile") return "person-circle-outline";
    return null;
  };

  // Determine right text based on rightControl
  const getRightText = () => {
    if (rightText) return rightText;
    if (rightControl === "edit") return "Edit";
    return "";
  };

  const shouldShowLeftIcon = showLeftIcon && getLeftIcon();
  const shouldShowLeftText = showLeftText || leftControl === "cancel";
  const shouldShowRightIcon =
    showRightIcon || rightControl === "heart" || rightControl === "profile";
  const shouldShowRightText = showRightText || rightControl === "edit";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        showBorder && styles.withBorder,
      ]}
    >
      {/* Left Control */}
      <View style={styles.leftContainer}>
        {(shouldShowLeftIcon || shouldShowLeftText) && (
          <TouchableOpacity
            style={styles.control}
            onPress={onLeftPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {shouldShowLeftIcon && (
              <Ionicons
                name={getLeftIcon()}
                size={24}
                color={iconColor}
                style={styles.leftIcon}
              />
            )}
            {shouldShowLeftText && (
              <Text style={[styles.controlText, { color: textColor }]}>
                {getLeftText()}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      {showTitle && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}

      {/* Right Control */}
      <View style={styles.rightContainer}>
        {(shouldShowRightIcon || shouldShowRightText) && (
          <TouchableOpacity
            style={styles.control}
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {shouldShowRightText && (
              <Text style={[styles.controlText, { color: textColor }]}>
                {getRightText()}
              </Text>
            )}
            {shouldShowRightIcon && (
              <Ionicons
                name={getRightIcon()}
                size={24}
                color={iconColor}
                style={styles.rightIcon}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    height: Platform.OS === "ios" ? 44 : 56,
    backgroundColor: "#FFFFFF",
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  controlText: {
    fontSize: 17,
    color: "#2196F3",
  },
});

export default NavBar;
