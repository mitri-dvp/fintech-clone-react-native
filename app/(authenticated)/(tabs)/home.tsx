import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";

const Page = () => {
  const balance = 1420;
  const currency = "USD";

  const onAddMoney = () => {};
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>{currency}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundButton icon={"refresh"} text={"Exchange"} />
        <RoundButton icon={"list"} text={"Details"} />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  balance: {
    fontSize: 60,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "auto",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
