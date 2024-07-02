import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";

const CELL_COUNT = 6;

const Page = () => {
  const { phone, signIn } = useLocalSearchParams<{
    phone: string;
    signIn: string;
  }>();
  const [code, setCode] = useState("");
  const clerkSignIn = useSignIn();
  const clerkSignUp = useSignUp();

  useEffect(() => {
    if (code.length === 6) {
      if (signIn === "true") verifySignIn(code);
      if (signIn !== "true") verifyCode(code);
    }
  }, [code]);

  const verifyCode = async (code: string) => {
    if (!clerkSignUp.isLoaded) return;
    try {
      await clerkSignUp.signUp.attemptPhoneNumberVerification({
        code: code,
      });
      await clerkSignUp.setActive({
        session: clerkSignUp.signUp.createdSessionId,
      });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async (code: string) => {
    if (!clerkSignIn.isLoaded) return;
    try {
      await clerkSignIn.signIn.attemptFirstFactor({
        strategy: "phone_code",
        code: code,
      });
      await clerkSignIn.setActive({
        session: clerkSignIn.signIn.createdSessionId,
      });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cell: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  focusCell: {
    borderColor: "#000",
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
