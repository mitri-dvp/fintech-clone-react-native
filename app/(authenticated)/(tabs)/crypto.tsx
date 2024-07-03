import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { currencyFormatter, currencySymbol } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const { data: currencies } = useQuery<Currency[]>({
    queryKey: ["listings"],
    queryFn: async () => (await fetch("/api/listings")).json(),
  });

  const ids = (currencies || []).map((currency) => currency.id).join(",");

  const { data: info } = useQuery<Info>({
    queryKey: ["info", ids],
    queryFn: async () => (await fetch(`/api/info?ids=${ids}`)).json(),
    enabled: !!ids,
  });

  if (!currencies || !info) return <Text>Loading...</Text>;

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.map((currency) => (
          <Link
            key={currency.id}
            href={`/(authenticated)/crypto/${currency.id}`}
            asChild
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <Image
                source={{ uri: info[currency.id].logo }}
                style={{ width: 40, height: 40 }}
              />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ fontWeight: "bold", color: Colors.dark }}>
                  {currency.name}
                </Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View style={{ gap: 4 }}>
                <Text style={{ fontWeight: "bold", textAlign: "right" }}>
                  {currencyFormatter.format(currency.quote.USD.price)}{" "}
                  {currencySymbol}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons
                    name={
                      currency.quote.USD.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={12}
                    color={
                      currency.quote.USD.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        currency.quote.USD.percent_change_1h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {currency.quote.USD.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;
