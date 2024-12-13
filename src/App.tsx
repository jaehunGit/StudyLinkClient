import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import TeamScreen from "./screens/TeamScreen";
import StatsScreen from "./screens/StatsScreen";
import AllMenuScreen from "./screens/AllMenuScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TeamDetailScreen from "./screens/TeamDetailScreen";
import TeamRecruitScreen from "./screens/TeamRecruitScreen";
import SignUpScreen from "./screens/SignUpScreen";
import BottomNavBar from "./components/BottomNavBar";
import TechTagsScreen from "./screens/TechTagsScreen";
import MyPageScreen from "./screens/MyPageScreen";

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
  const [currentScreen, setCurrentScreen] = useState("Login");

  const renderScreen = () => {
    if (currentScreen === "SignUp") {
      return (
        <SignUpScreen
          goToLogin={() => setCurrentScreen("Login")}
          goToTechTags={() => setCurrentScreen("TechTags")}
        />
      );
    }

    if (currentScreen === "TechTags") {
      return <TechTagsScreen onComplete={() => setCurrentScreen("Login")} />;
    }

    if (currentScreen === "Login") {
      return (
        <LoginScreen
          onLogin={() => {
            setIsLoggedIn(true);
            setCurrentScreen("Main");
          }}
          goToSignUp={() => setCurrentScreen("SignUp")}
        />
      );
    }

    if (currentScreen === "MyPage") {
      return (
        <MyPageScreen
          onBack={() => setCurrentScreen("Main")}
          onSave={() => setCurrentScreen("Main")}
        />
      );
    }

    if (activeTab === "TeamRecruit") {
        return <TeamRecruitScreen setActiveTab={setActiveTab} />;
    }

    if (!isLoggedIn) {
      return null;
    }

    switch (activeTab) {
      case "Home":
        return <MainScreen goToMyPage={() => setCurrentScreen("MyPage")} />;
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
        return <AllMenuScreen />;
      case "Settings":
        return <SettingsScreen />;
      case "TeamDetail":
        if (selectedDetail) {
          return (
            <TeamDetailScreen
              detail={selectedDetail}
              setActiveTab={setActiveTab}
            />
          );
        }
        return null;
      default:
        return <MainScreen goToMyPage={() => setCurrentScreen("MyPage")} />;
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1">{renderScreen()}</View>
      {isLoggedIn && currentScreen === "Main" && (
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </View>
  );
}
