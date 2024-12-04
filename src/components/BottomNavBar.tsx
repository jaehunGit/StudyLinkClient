import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BottomNavBar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <View className="flex-row justify-around items-center bg-white h-16 border-t border-gray-200">
      <TouchableOpacity onPress={() => setActiveTab("Home")} className="items-center">
        <Text className={`text-sm ${activeTab === "Home" ? "text-primary" : "text-gray-400"}`}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Team")} className="items-center">
        <Text className={`text-sm ${activeTab === "Team" ? "text-primary" : "text-gray-400"}`}>팀원 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Stats")} className="items-center">
        <Text className={`text-sm ${activeTab === "Stats" ? "text-primary" : "text-gray-400"}`}>통계</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("AllPosts")} className="items-center">
        <Text className={`text-sm ${activeTab === "AllPosts" ? "text-primary" : "text-gray-400"}`}>전체</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Settings")} className="items-center">
        <Text className={`text-sm ${activeTab === "Settings" ? "text-primary" : "text-gray-400"}`}>설정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
