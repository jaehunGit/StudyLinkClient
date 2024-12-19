import React, {useState} from 'react';
import {View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import TeamScreen from './screens/TeamScreen';
import StatsScreen from './screens/StatsScreen';
import AllMenuScreen from './screens/AllMenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import TeamDetailScreen from './screens/TeamDetailScreen';
import TeamRecruitScreen from './screens/TeamRecruitScreen';
import SignUpScreen from './screens/SignUpScreen';
import BottomNavBar from './components/BottomNavBar';
import TechTagsScreen from './screens/TechTagsScreen';
import MyPageScreen from './screens/MyPageScreen';
import MyPageMainScreen from './screens/MyPageMainScreen';

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
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedDetail, setSelectedDetail] = useState<TeamDataItem | null>(
    null,
  );
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [userId, setUserId] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Home') setCurrentScreen('Main');
    else if (tab === 'Team') setCurrentScreen('Main');
    else if (tab === 'Stats') setCurrentScreen('Main');
    else if (tab === 'AllPosts') setCurrentScreen('Main');
  };

  const renderScreen = () => {
    if (currentScreen === 'SignUp') {
      return (
        <SignUpScreen
          goToLogin={() => setCurrentScreen('Login')}
          goToTechTags={(id: string) => {
            setUserId(id);
            setCurrentScreen('TechTags');
          }}
        />
      );
    }

    if (currentScreen === 'TechTags' && userId) {
      return (
        <TechTagsScreen
          userId={userId}
          onComplete={() => {
            setCurrentScreen('Main');
            setIsLoggedIn(true);
          }}
        />
      );
    }

    if (currentScreen === 'Login') {
      return (
        <LoginScreen
          onLogin={(id: string) => {
            setUserId(id);
            setIsLoggedIn(true);
            setCurrentScreen('Main');
          }}
          goToSignUp={() => setCurrentScreen('SignUp')}
        />
      );
    }

    if (currentScreen === 'MyPageMain') {
      return (
        <MyPageMainScreen goToProfileEdit={() => setCurrentScreen('MyPage')} />
      );
    }

    if (currentScreen === 'MyPage') {
      return (
        <MyPageScreen
          onBack={() => setCurrentScreen('MyPageMain')}
          onSave={() => setCurrentScreen('MyPageMain')}
        />
      );
    }

    if (activeTab === 'TeamRecruit') {
      return <TeamRecruitScreen setActiveTab={setActiveTab} userId={userId} />;
    }

    if (!isLoggedIn) {
      return null;
    }

    switch (activeTab) {
      case 'Home':
        return <MainScreen goToMyPage={() => setCurrentScreen('MyPageMain')} />;
      case 'Team':
        return (
          <TeamScreen
            setActiveTab={setActiveTab}
            setSelectedDetail={setSelectedDetail}
          />
        );
      case 'Stats':
        return (
          <StatsScreen activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case 'AllPosts':
        return (
          <AllMenuScreen
            goToPage={page => {
              if (page === 'MyPage') {
                setCurrentScreen('MyPageMain');
              } else {
                setActiveTab(page);
              }
            }}
          />
        );
      case 'Settings':
        return <SettingsScreen />;
      case 'TeamDetail':
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
        return <MainScreen goToMyPage={() => setCurrentScreen('MyPageMain')} />;
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1">{renderScreen()}</View>
      {/* 네비바 표시 */}
      {isLoggedIn && (
        <BottomNavBar activeTab={activeTab} setActiveTab={handleTabChange} />
      )}
    </View>
  );
}
