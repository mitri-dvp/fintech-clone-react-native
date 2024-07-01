import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View style={styles.container}>
      {assets ? (
        <Video
          style={styles.video}
          source={{ uri: assets[0].uri }}
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
        />
      ) : null}

      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.title}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={[styles.button_text, { color: "white" }]}>Log in</Text>
          </TouchableOpacity>
        </Link>

        <Link
          href={"/signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "white" },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.button_text}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: 20,
    marginBottom: 80,
  },
  button_text: {
    fontSize: 24,
    fontWeight: "500",
  },
});

export default Page;
