import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const getCryptoListings = async () => {
      const res = await fetch("/api/listings");
      const data = await res.json();
      console.log({ data });
    };

    getCryptoListings();
  }, []);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
