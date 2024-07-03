import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type RoundButtonProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
};

const RoundButton = ({ text, icon, onPress }: RoundButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
  },
  label: {
    fontSize: 16,
    color: Colors.dark,
  },
});
