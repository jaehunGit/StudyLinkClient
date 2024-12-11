import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

interface StatsScreenProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StatsScreen = ({ activeTab, setActiveTab }: StatsScreenProps) => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [isPickerVisible, setPickerVisible] = useState(false);

  // Temporary states for year and month
  const [tempYear, setTempYear] = useState("2023");
  const [tempMonth, setTempMonth] = useState("01");

  const years = ["2022", "2023", "2024", "2025", "2026"];
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));

  const barChartData = [
    { month: "2023-01", React: 40, Java: 30, Python: 20 },
    { month: "2023-02", React: 35, Java: 25, Python: 40 },
    { month: "2023-03", React: 50, Java: 20, Python: 30 },
    { month: "2023-04", React: 45, Java: 30, Python: 25 },
  ];

  const colors = {
    React: "#007AFF",
    Java: "#FFA500",
    Python: "#FF6384",
  };

  const filteredData = barChartData.find(
    (data) => data.month === `${selectedYear}-${selectedMonth}`
  ) as { month: string; React: number; Java: number; Python: number } | undefined;

  const yearFlatListRef = useRef<FlatList<string>>(null);
  const monthFlatListRef = useRef<FlatList<string>>(null);

  useEffect(() => {
    if (isPickerVisible) {
        const yearIndex = years.indexOf(tempYear);
        const monthIndex = months.indexOf(tempMonth);
        yearFlatListRef.current?.scrollToIndex({ index: Math.max(0, yearIndex - 1), animated: false });
        monthFlatListRef.current?.scrollToIndex({ index: Math.max(0, monthIndex - 1), animated: false });
    }
  }, [isPickerVisible]);

  const renderPickerModal = () => {
    const renderYearItem = ({ item }: { item: string }) => (
      <TouchableOpacity
        className="py-2"
        onPress={() => setTempYear(item)}
      >
        <Text
          className={
            item === tempYear
              ? "font-bold text-blue-500"
              : "text-black"
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );

    const renderMonthItem = ({ item }: { item: string }) => (
      <TouchableOpacity
        className="py-2"
        onPress={() => setTempMonth(item)}
      >
        <Text
          className={
            item === tempMonth
              ? "font-bold text-blue-500"
              : "text-black"
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );

    return (
      <Modal transparent visible={isPickerVisible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="bg-white p-4 w-4/5 rounded-lg"
            style={{ height: Dimensions.get("window").height * 0.25 }}
          >
            <View className="flex-row justify-between mb-2">
              <View className="items-center w-1/2">
                <Text className="text-lg font-bold mb-1 text-black">년도</Text>
                <FlatList
                  ref={yearFlatListRef}
                  data={years}
                  keyExtractor={(item) => item}
                  renderItem={renderYearItem}
                  getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                  })}
                  showsVerticalScrollIndicator={false}
                  onScrollToIndexFailed={() => {}}
                  className="h-28"
                />
              </View>
              <View className="items-center w-1/2">
                <Text className="text-lg font-bold mb-1 text-black">월</Text>
                <FlatList
                  ref={monthFlatListRef}
                  data={months}
                  keyExtractor={(item) => item}
                  renderItem={renderMonthItem}
                  getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                  })}
                  showsVerticalScrollIndicator={false}
                  onScrollToIndexFailed={() => {}}
                  className="h-28"
                />
              </View>
            </View>
            <View className="flex-row justify-center w-full mt-2 space-x-20">
              <TouchableOpacity
                className="bg-blue-500 py-2 px-4 rounded-lg"
                onPress={() => {
                  setSelectedYear(tempYear);
                  setSelectedMonth(tempMonth);
                  setPickerVisible(false);
                }}
              >
                <Text className="text-white text-lg font-bold">확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onPress={() => {
                  setTempYear(selectedYear);
                  setTempMonth(selectedMonth);
                  setPickerVisible(false);
                }}
              >
                <Text className="text-black text-lg">취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl text-primary font-bold px-2 mb-4">통계</Text>
      <TouchableOpacity
        className="bg-white py-2 px-4 rounded-lg border border-gray-300 mb-4"
        onPress={() => {
          setTempYear(selectedYear);
          setTempMonth(selectedMonth);
          setPickerVisible(true);
        }}
      >
        <Text className="text-lg text-black">{`${selectedYear} - ${selectedMonth}`}</Text>
      </TouchableOpacity>
      {isPickerVisible && renderPickerModal()}
      <View className="mt-4">
        <Text className="text-xl font-semibold mb-2">{`${selectedYear}-${selectedMonth}`} 태그 사용 통계</Text>
        <View className="flex-row items-end justify-around h-52 bg-white rounded-lg p-2">
          {filteredData ? (
            Object.keys(colors).map((tag) => (
            <View key={tag} className="items-center">
                <View
                  style={{
                    height: (filteredData[tag as keyof typeof colors] || 0) * 2,
                    backgroundColor: colors[tag as keyof typeof colors]
                  }}
                  className="w-5 mx-1"
                />
                <Text className="text-sm mt-1">{tag}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">데이터 없음</Text>
          )}
        </View>
        <View className="flex-row justify-around mt-4">
          {Object.keys(colors).map((tag) => (
            <View key={tag} className="flex-row items-center">
              <View
                style={{ backgroundColor: colors[tag as keyof typeof colors] }}
                className="w-4 h-4 mr-2"
              />
              <Text className="text-sm">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default StatsScreen;
