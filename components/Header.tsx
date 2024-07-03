import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const Header = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView
      intensity={10}
      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)", paddingTop: top }}
    >
      <View style={[styles.container, {}]}>
        <TouchableOpacity style={[styles.avatar]}>
          <Text style={[{ color: "white", fontWeight: "bold", fontSize: 16 }]}>
            JM
          </Text>
        </TouchableOpacity>

        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>

        <TouchableOpacity style={[styles.circle]}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circle]}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
