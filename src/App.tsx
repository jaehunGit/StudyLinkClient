import React, {useState} from 'react';
import {View, Text} from 'react-native';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-primary text-2xl font-bold">
        로그인 성공! 메인 화면입니다.
      </Text>
    </View>
  );
}
