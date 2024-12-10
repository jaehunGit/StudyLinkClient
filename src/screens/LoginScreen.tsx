import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const LoginScreen = ({
  onLogin,
  goToSignUp,
}: {
  onLogin: () => void;
  goToSignUp: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      console.log("아이디:", username);
      console.log("비밀번호:", password);
      onLogin();
    } else {
      console.log("아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      {/* 로고 */}
      <Text className="text-primary text-4xl font-bold mb-2">StudyLink</Text>
      <Text className="text-textSecondary text-base mb-6">
        당신의 팀원을 쉽게 찾으세요
      </Text>

      {/* 아이디 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-6"
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity
        className="w-full h-12 bg-primary rounded-lg justify-center items-center"
        onPress={handleLogin}
      >
        <Text className="text-background text-lg font-bold">로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 링크 */}
      <TouchableOpacity className="mt-4" onPress={goToSignUp}>
        <Text className="text-primary">회원가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
