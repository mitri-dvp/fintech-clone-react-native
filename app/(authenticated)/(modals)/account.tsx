import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { Fragment, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "@react-navigation/elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Modal = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const clerkAuth = useAuth();
  const [edit, setEdit] = useState(false);
  const headerHeight = useHeaderHeight();

  const onSaveUser = async () => {
    try {
      console.log({ firstName: firstName, lastName: lastName });
      await user?.update({ firstName: firstName, lastName: lastName });
      setEdit(false);
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      try {
        await user?.setProfileImage({
          file: base64,
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
      }
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={{
        flex: 1,
        paddingTop: headerHeight,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      {user ? (
        <Fragment>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={onCaptureImage}
              style={styles.captureButton}
            >
              {user.imageUrl ? (
                <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
              ) : null}
            </TouchableOpacity>

            {!edit ? (
              <View style={styles.editRow}>
                <Text style={{ fontSize: 26, color: "#fff" }}>
                  {user.firstName} {user.lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color={"#fff"}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[styles.inputField]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[styles.inputField]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => clerkAuth.signOut()}
            >
              <Ionicons name="log-out" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="person" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="bulb" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="megaphone" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                Inbox
              </Text>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Fragment>
      ) : null}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  editRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  captureButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  button: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});

export default Modal;
