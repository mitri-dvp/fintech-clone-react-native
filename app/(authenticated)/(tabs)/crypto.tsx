import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
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
    <View>
      {currencies.map((currency) => (
        <View key={currency.id} style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: info[currency.id].logo }}
            style={{ width: 32, height: 32 }}
          />

          <Text>{currency.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Page;
