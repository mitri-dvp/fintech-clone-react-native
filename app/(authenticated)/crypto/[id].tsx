import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { Fragment, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

const crypto = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ["Overview", "News", "Orders", "Transactions"];

  const { data } = useQuery<Info>({
    queryKey: ["info", id],
    queryFn: async () => (await fetch(`/api/info?ids=${id}`)).json(),
  });

  const info = data?.[Number(id)];

  if (!info) return <Text>Loading...</Text>;

  return (
    <Fragment>
      <Stack.Screen options={{ title: info.name }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        ListHeaderComponent={() => (
          <Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 16,
              }}
            >
              <Text style={styles.subtitle}>{info.symbol}</Text>
              <Image
                source={{ uri: info.logo }}
                style={{ height: 60, width: 60 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 16,
                gap: 4,
              }}
            >
              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 4,
                    paddingHorizontal: 16,
                    paddingVertical: 0,
                    height: 40,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={"white"} />
                <Text style={{ color: "white", fontWeight: "bold" }}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 4,
                    paddingHorizontal: 16,
                    paddingVertical: 0,
                    height: 40,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 16,
              padding: 16,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            contentContainerStyle={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  {
                    backgroundColor:
                      activeIndex === index ? "white" : "transparent",
                    flexDirection: "row",
                    gap: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    height: 30,
                  },
                ]}
                onPress={() => setActiveIndex(index)}
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        renderItem={(item) => (
          <Fragment>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>{info.description}</Text>
            </View>
          </Fragment>
        )}
      ></SectionList>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
});

export default crypto;
