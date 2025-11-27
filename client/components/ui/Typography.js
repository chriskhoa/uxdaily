import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

const Typography = ({
  variant = "bodyM", // Default variant
  children,
  style,
  color,
  ...props
}) => {
  const getTextStyle = () => {
    switch (variant) {
      // Heading styles
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "h4":
        return styles.h4;
      case "h5":
        return styles.h5;

      // Body styles
      case "bodyXL":
        return styles.bodyXL;
      case "bodyL":
        return styles.bodyL;
      case "bodyM":
        return styles.bodyM;
      case "bodyS":
        return styles.bodyS;
      case "bodyXS":
        return styles.bodyXS;

      // Action styles
      case "actionL":
        return styles.actionL;
      case "actionM":
        return styles.actionM;
      case "actionS":
        return styles.actionS;

      // Caption styles
      case "captionM":
        return styles.captionM;

      default:
        return styles.bodyM;
    }
  };

  return (
    <RNText style={[getTextStyle(), color && { color }, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  // Heading styles
  h1: {
    fontSize: 24,
    fontWeight: "800", // Extra bold
    lineHeight: 32,
  },
  h2: {
    fontSize: 18,
    fontWeight: "800", // Extra bold
    lineHeight: 26,
  },
  h3: {
    fontSize: 16,
    fontWeight: "800", // Extra bold
    lineHeight: 24,
  },
  h4: {
    fontSize: 14,
    fontWeight: "700", // Bold
    lineHeight: 20,
  },
  h5: {
    fontSize: 12,
    fontWeight: "700", // Bold
    lineHeight: 18,
  },

  // Body styles
  bodyXL: {
    fontSize: 18,
    fontWeight: "400", // Regular
    lineHeight: 26,
  },
  bodyL: {
    fontSize: 16,
    fontWeight: "400", // Regular
    lineHeight: 24,
  },
  bodyM: {
    fontSize: 14,
    fontWeight: "400", // Regular
    lineHeight: 20,
  },
  bodyS: {
    fontSize: 12,
    fontWeight: "400", // Regular
    lineHeight: 18,
  },
  bodyXS: {
    fontSize: 10,
    fontWeight: "500", // Medium
    lineHeight: 16,
  },

  // Action styles (for buttons, links, etc.)
  actionL: {
    fontSize: 14,
    fontWeight: "600", // Semi Bold
    lineHeight: 20,
  },
  actionM: {
    fontSize: 12,
    fontWeight: "600", // Semi Bold
    lineHeight: 18,
  },
  actionS: {
    fontSize: 10,
    fontWeight: "600", // Semi bold
    lineHeight: 16,
  },

  // Caption styles
  captionM: {
    fontSize: 10,
    fontWeight: "600", // Semi Bold
    lineHeight: 16,
  },
});

export default Typography;
