import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import config from "../config";

const LoginScreen = ({
  onLogin,
  goToSignUp,
}: {
  onLogin: () => void;
  goToSignUp: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(`${config.apiUrl}/user/login`, {
        userId: username,
        userPassword: password,
      },
      { timeout: 5000 });

      if (response.data.success) {
        console.log("로그인 성공:", response.data);
        onLogin();
        setErrorMessage(null);
      } else {
        console.log("로그인 실패:", response.data.message);
        setErrorMessage(response.data.message || "아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생1:", error);
      console.error("에러 전체 정보:", JSON.stringify(error, null, 2));
      setErrorMessage("로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
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

      {/* 에러 메시지 표시 */}
      {errorMessage && (
        <Text className="text-red-500 text-sm mt-4">{errorMessage}</Text>
      )}
    </View>
  );
};

export default LoginScreen;
