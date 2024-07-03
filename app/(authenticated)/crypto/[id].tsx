import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const crypto = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View>
      <Text>crypto</Text>
    </View>
  );
};

export default crypto;
