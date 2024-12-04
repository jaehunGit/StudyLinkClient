import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BottomNavBar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white h-16 border-t border-gray-200 rounded-t-3xl shadow-lg">
      <TouchableOpacity onPress={() => setActiveTab("Home")} className="items-center">
        <Text
          className={`text-sm ${
            activeTab === "Home" ? "text-black font-bold" : "text-gray-400"
          }`}
        >
          홈
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Team")} className="items-center">
        <Text
          className={`text-sm ${
            activeTab === "Team" ? "text-black font-bold" : "text-gray-400"
          }`}
        >
          팀원 찾기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Stats")} className="items-center">
        <Text
          className={`text-sm ${
            activeTab === "Stats" ? "text-black font-bold" : "text-gray-400"
          }`}
        >
          통계
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("AllPosts")} className="items-center">
        <Text
          className={`text-sm ${
            activeTab === "AllPosts" ? "text-black font-bold" : "text-gray-400"
          }`}
        >
          전체
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
