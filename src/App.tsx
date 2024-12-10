import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import TeamScreen from "./screens/TeamScreen";
import StatsScreen from "./screens/StatsScreen";
import AllPostsScreen from "./screens/AllPostsScreen";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [activeTab, setActiveTab] = useState("Home"); // 현재 탭
  const [selectedDetail, setSelectedDetail] = useState<TeamDataItem | null>(
    null
  ); // 선택된 팀 데이터
  const [currentScreen, setCurrentScreen] = useState("Login"); // 현재 화면

  // 현재 화면 렌더링
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
      return (
        <TechTagsScreen
          onComplete={() => setCurrentScreen("Login")} // TechTags 완료 후 로그인 화면으로 이동
        />
      );
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

    if (currentScreen === "Main") {
      return (
        <MainScreen
          goToMyPage={() => setCurrentScreen("MyPage")} // 마이페이지로 이동
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

    if (isLoggedIn) {
      if (activeTab === "TeamDetail" && selectedDetail) {
        return (
          <TeamDetailScreen
            detail={selectedDetail}
            setActiveTab={setActiveTab}
          />
        );
      }

      if (activeTab === "TeamRecruit") {
        return <TeamRecruitScreen setActiveTab={setActiveTab} />;
      }

      switch (activeTab) {
        case "Home":
          return (
            <MainScreen goToMyPage={() => setCurrentScreen("MyPage")} />
          );
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
          return (
            <MainScreen goToMyPage={() => setCurrentScreen("MyPage")} />
          );
      }
    }

    return null; // 기본값
  };

  return (
    <View className="flex-1">
      <View className="flex-1">{renderScreen()}</View>
      {isLoggedIn && currentScreen !== "MyPage" && (
        // 마이페이지에서는 하단 네비바 비활성화
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </View>
  );
}
