import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balance";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();

  const currency = "USD";

  const onAddMoney = () => {
    const n = Math.random();
    const b = n > 0.5;
    runTransaction({
      id: n.toString(),
      amount: Math.floor(n * 1000 * (b ? 1 : -1)),
      date: new Date(),
      title: b ? "Added money" : "Removed money",
    });
  };

  const currencyFormatter = new Intl.NumberFormat(undefined);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {});

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>
            {currencyFormatter.format(balance())}
          </Text>
          <Text style={styles.currency}>{currency}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundButton
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <RoundButton icon={"list"} text={"Details"} />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transaction</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <View style={styles.transaction}>
            <Text>No Transactions Yet</Text>
          </View>
        ) : null}
        {transactions
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((transaction) => (
            <View key={transaction.id} style={styles.transaction}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor:
                      transaction.amount > 0 ? Colors.green : Colors.red,
                  },
                ]}
              >
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text>{transaction.title}</Text>
                <Text style={{ color: Colors.gray }}>
                  {dateFormatter.format(transaction.date)}
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {currencyFormatter.format(transaction.amount)} {currency}
                </Text>
              </View>
            </View>
          ))}
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
  transactions: {
    marginHorizontal: 20,
  },
  transaction: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "white",
    borderRadius: 16,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
