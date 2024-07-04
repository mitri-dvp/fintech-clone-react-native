import { View, Text } from "react-native";
import React, { Fragment, useEffect } from "react";
import { defaultStyles } from "@/constants/Styles";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import {
  currencyFormatter,
  currencySymbol,
  dateFormatter,
} from "@/utils/format";
import { Circle, useFont } from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";

const CryptoChart = () => {
  const { data: tickers } = useQuery<Ticker[]>({
    queryKey: ["tickers"],
    queryFn: async () => (await fetch(`/api/tickers`)).json(),
  });

  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const chartDate = (tickers || []).map((t) => ({
    price: t.price,
    timestamp: t.timestamp,
  }));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const animatedText = useAnimatedProps(() => {
    const currencyFormatter = new Intl.NumberFormat(undefined);
    const price = currencyFormatter.format(state.y.price.value.value);
    const defaultPrice = currencyFormatter.format(
      tickers ? tickers[tickers.length - 1].price : 0
    );
    return {
      text: `${price} ${currencySymbol}`,
      defaultValue: `${defaultPrice} ${currencySymbol}`,
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {});
    const date = dateFormatter.format(new Date(state.x.value.value));
    return {
      text: date,
      defaultValue: "Today",
    };
  });

  return (
    <>
      {tickers ? (
        <View style={[defaultStyles.block, { marginTop: 20, height: 300 }]}>
          <View>
            <AnimatedTextInput
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: Colors.dark,
              }}
              editable={false}
              underlineColorAndroid={"transparent"}
              animatedProps={animatedText}
            />

            <AnimatedTextInput
              style={{
                fontSize: 18,
                color: Colors.dark,
              }}
              editable={false}
              underlineColorAndroid={"transparent"}
              animatedProps={animatedDateText}
            />
          </View>
          <CartesianChart
            chartPressState={state}
            axisOptions={{
              font: font,
              tickCount: 5,
              labelOffset: { x: -2, y: 0 },
              labelColor: Colors.gray,
              formatXLabel: (ms) => {
                const parts = dateFormatter.formatToParts(new Date(ms));
                const day = parts.find((p) => p.type === "day")!;
                const month = parts.find((p) => p.type === "month")!;
                return `${day.value}/${month.value}`;
              },
              formatYLabel: (v) =>
                `${currencyFormatter.format(v)} ${currencySymbol}`,
            }}
            data={chartDate}
            xKey="timestamp"
            yKeys={["price"]}
          >
            {({ points }) => (
              // 👇 and we'll use the Line component to render a line path.
              <Fragment>
                <Line
                  points={points.price}
                  color={Colors.primary}
                  strokeWidth={3}
                />
                {isActive ? (
                  <Circle
                    cx={state.x.position}
                    cy={state.y.price.position}
                    r={8}
                    color={Colors.primary}
                  />
                ) : null}
              </Fragment>
            )}
          </CartesianChart>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default CryptoChart;
