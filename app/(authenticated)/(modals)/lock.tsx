import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { userInactivityStorage } from "@/context/UserInactivity";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Modal = () => {
  const { user } = useUser();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(null);
  const router = useRouter();

  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "111111") {
        onSuccess();
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        setCode([]);
      }
    }
  }, [code]);

  const onSuccess = () => {
    userInactivityStorage.set("locked", false);
    router.replace("/(authenticated)/(tabs)/home");
  };

  const onNumberPress = (n: number) => {
    if (code.length < 6) setCode([...code, n]);
  };

  const onBackspace = () => {
    setCode(code.slice(0, -1));
  };

  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) onSuccess();
  };

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>
        Welcome back, {user?.firstName || "User"}
      </Text>

      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, i) => (
          <View
            key={i}
            style={[
              styles.codeSymbol,
              {
                backgroundColor:
                  code[i] != null ? Colors.primary : Colors.lightGray,
              },
            ]}
          />
        ))}
      </Animated.View>

      <View style={styles.numPad}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={{ fontSize: 28 }}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={{ fontSize: 28 }}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={{ fontSize: 28 }}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={styles.number}
            onPress={onBiometricAuthPress}
          >
            <MaterialCommunityIcons
              name="face-recognition"
              size={28}
              color={Colors.dark}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setCode([...code, 0])}
          >
            <Text style={{ fontSize: 28 }}>0</Text>
          </TouchableOpacity>
          {code.length ? (
            <TouchableOpacity style={styles.number} onPress={onBackspace}>
              <MaterialCommunityIcons
                name="backspace"
                size={28}
                color={Colors.dark}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.number} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    alignSelf: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 80,
  },
  codeSymbol: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numPad: {
    marginTop: 80,
    marginHorizontal: 60,
    gap: 30,
  },
  number: {
    width: 60,
    height: 60,
    borderRadius: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Modal;
