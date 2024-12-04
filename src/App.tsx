import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen"; // Home 역할을 할 메인 스크린
import TeamScreen from "./screens/TeamScreen";
import StatsScreen from "./screens/StatsScreen";
import AllPostsScreen from "./screens/AllPostsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BottomNavBar from "./components/BottomNavBar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Home"); // 기본 탭: Home (MainScreen)

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <MainScreen />;
      case "Team":
        return <TeamScreen />;
      case "Stats":
        return <StatsScreen />;
      case "AllPosts":
        return <AllPostsScreen />;
      case "Settings":
        return <SettingsScreen />;
      default:
        return <MainScreen />;
    }
  };

  return isLoggedIn ? (
    <View className="flex-1">
      {/* 현재 활성화된 화면 */}
      <View className="flex-1">{renderScreen()}</View>

      {/* 하단 네비게이션 바 */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  ) : (
    <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  );
}
