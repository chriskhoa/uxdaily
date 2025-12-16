//fully ai-gen UI component
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
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={3} ellipsizeMode="tail">
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
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    minHeight: 200,
    width: "100%",
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 20,
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  button: {
    paddingHorizontal: 20,
  },
});

export default Card;
