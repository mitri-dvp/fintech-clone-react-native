import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const [countryCode, setCountryCode] = useState("+57");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            keyboardType="numeric"
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            phoneNumber ? styles.input_enabled : styles.input_disabled,
            defaultStyles.pillButton,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.dark,
            }}
          />
          <Text style={{ fontSize: 16, color: Colors.gray }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.dark,
            }}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
            },
          ]}
          onPress={() => onSignIn(SignInType.Email)}
        >
          <Ionicons name="mail" size={24} color={"black"} />
          <Text style={[defaultStyles.buttonText, { color: "black" }]}>
            Continue with Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
            },
          ]}
          onPress={() => onSignIn(SignInType.Google)}
        >
          <Ionicons name="logo-google" size={24} color={"black"} />
          <Text style={[defaultStyles.buttonText, { color: "black" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
            },
          ]}
          onPress={() => onSignIn(SignInType.Apple)}
        >
          <Ionicons name="logo-apple" size={24} color={"black"} />
          <Text style={[defaultStyles.buttonText, { color: "black" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  input_disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  input_enabled: {
    backgroundColor: Colors.primary,
  },
});
