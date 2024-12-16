import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios, {AxiosError} from 'axios';
import config from '../config';

const LoginScreen = ({
  onLogin,
  goToSignUp,
}: {
  onLogin: () => void;
  goToSignUp: () => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/user/login`,
        {
          userId: username,
          userPassword: password,
        },
        {timeout: 5000},
      );

      if (response.data.success) {
        console.log('로그인 성공:', response.data);
        onLogin();
        setErrorMessage(null);
      } else {
        console.log('로그인 실패:', response.data.message);
        setErrorMessage(response.data.message || '로그인 실패');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.error('서버 오류 응답:', err.response.data);
        const {errorMessage} = err.response.data as {errorMessage?: string};
        setErrorMessage(errorMessage || '서버 오류가 발생했습니다.');
      } else if (err.request) {
        console.error('응답 없음:', err.request);
        setErrorMessage('서버 응답이 없습니다. 네트워크를 확인해주세요.');
      } else {
        console.error('요청 설정 오류:', err.message);
        setErrorMessage('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
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
        onPress={handleLogin}>
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
