import React, { useEffect, useRef } from "react";
import { Animated, View, Text } from "react-native";

const TagUsageSection = () => {
  const data = [
    { tag: "React", percentage: 40 },
    { tag: "Node.js", percentage: 30 },
    { tag: "Java", percentage: 30 },
  ];

  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      200,
      data.map((_, index) =>
        Animated.timing(animatedValues[index], {
          toValue: data[index].percentage,
          duration: 1000,
          useNativeDriver: false,
        })
      )
    ).start();
  }, []);

  return (
    <View className="p-4 bg-white rounded-lg shadow mb-4">
      <Text className="text-lg font-bold mb-4">태그 사용 통계</Text>
      {data.map((item, index) => (
        <View key={item.tag} className="mb-4">
          <Text className="text-base mb-2">
            {item.tag}: {item.percentage}%
          </Text>
          <View className="w-full h-3 bg-gray-200 rounded-full">
            <Animated.View
              style={{
                width: animatedValues[index].interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              }}
              className="h-3 bg-primary rounded-full"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default TagUsageSection;
