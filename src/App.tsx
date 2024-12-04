import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import TeamScreen from "./screens/TeamScreen";
import StatsScreen from "./screens/StatsScreen";
import AllPostsScreen from "./screens/AllPostsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TeamDetailScreen from "./screens/TeamDetailScreen";
import BottomNavBar from "./components/BottomNavBar";

type TeamDataItem = {
  id: string;
  title: string;
  tags: string[];
  current: number;
  total: number;
  deadline: string;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedDetail, setSelectedDetail] = useState<TeamDataItem | null>(null);

  const renderScreen = () => {
    if (activeTab === "TeamDetail" && selectedDetail) {
      return (
        <TeamDetailScreen
          detail={selectedDetail}
          setActiveTab={setActiveTab}
        />
      );
    }

    switch (activeTab) {
      case "Home":
        return <MainScreen />;
      case "Team":
        return (
          <TeamScreen
            setActiveTab={setActiveTab}
            setSelectedDetail={setSelectedDetail}
          />
        );
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
      <View className="flex-1">{renderScreen()}</View>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  ) : (
    <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  );
}
