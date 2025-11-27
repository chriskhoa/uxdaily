import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

const Card = ({
  title = "Title",
  subtitle = "Subtitle",
  status = "to start", // 'complete', 'to start', 'start'
  onPress,
  ...props
}) => {
  const getButtonProps = () => {
    switch (status) {
      case "complete":
        return {
          text: "Completed",
          variant: "tertiary",
          status: "success",
          rightIcon: "checkmark",
          showRightIcon: true,
        };
      case "start":
        return {
          text: "Start",
          variant: "primary",
          status: "normal",
          rightIcon: "chevron-forward",
          showRightIcon: true,
        };
      case "to start":
        return {
          text: "To start",
          variant: "primary",
          status: "normal",
          disabled: true,
        };
      default:
        return {
          text: "Start",
          variant: "primary",
          status: "normal",
        };
    }
  };

  const getCardBackgroundColor = () => {
    switch (status) {
      case "complete":
        return "#E7F4E8";
      case "start":
        return "#B3DAFF";
      case "to start":
        return "#F5F5F5";
      default:
        return "#F5F5F5";
    }
  };

  return (
    <View
      style={[styles.card, { backgroundColor: getCardBackgroundColor() }]}
      {...props}
    >
      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {subtitle}
        </Text>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button {...getButtonProps()} onPress={onPress} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    minHeight: 100,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
  buttonContainer: {
    flexShrink: 0,
  },
  button: {
    paddingHorizontal: 20,
  },
});

export default Card;
