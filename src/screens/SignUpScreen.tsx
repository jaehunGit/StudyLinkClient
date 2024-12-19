import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios, { AxiosError } from 'axios';
import config from '../config';

const SignUpScreen = ({
  goToLogin,
  goToTechTags,
}: {
  goToLogin: () => void;
  goToTechTags: (userId: string) => void;
}) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const messages = [
    '당신의 팀원을 쉽게 찾으세요',
    '함께 목표를 정하고 달성하세요',
    '팀워크로 성장을 경험하세요',
    '함께 배우고 성장하세요',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSignUp = async () => {
    if (!isUsernameValid) {
      console.log('아이디 중복 검사를 해주세요.');
      return;
    }

    if (!isEmailValid || !isPasswordValid) {
      console.log('이메일 또는 비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    if (password !== confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    const userData = {
      userId: username,
      userPassword: password,
      userEmail: email,
    };

    try {
      const response = await axios.post(
        `${config.apiUrl}/user/signUp`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        },
      );

      if (response.status === 200) {
        console.log('회원가입 성공:', response.data);
        const userId = username;
        goToTechTags(userId);
      } else {
        console.log('회원가입 실패:', response.data.message);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error('회원가입 실패:', err.response?.data || err.message);
    }
  };

  const checkUsernameAvailability = async () => {
    if (username.trim() === '') {
      setIsUsernameValid(false);
      setErrorMessage('아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(`${config.apiUrl}/user/checkUsername`, {
        params: { username },
      });

      if (response.data.isAvailable) {
        setIsUsernameValid(true);
        setErrorMessage('');
      } else {
        setIsUsernameValid(false);
        setErrorMessage('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 검사 실패:', error);
    }
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(input));
  };

  const validatePassword = (input: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordRegex.test(input));
  };

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      {/* 로고 */}
      <Text className="text-primary text-4xl font-bold mb-2">StudyLink</Text>

      {/* 애니메이션 메시지 */}
      <Text className="text-gray-500 text-lg mb-4">{messages[currentMessageIndex]}</Text>

      {/* 아이디 입력 */}
      <View className="w-full flex-row items-center mb-2">
        <TextInput
          className="flex-1 h-12 border border-gray-300 rounded-lg px-3"
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity
          className="ml-2 px-4 py-2 bg-primary rounded-lg"
          onPress={checkUsernameAvailability}>
          <Text className="text-white text-sm">중복검사</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}>
        {isUsernameValid === false && (
          <Text className="text-red-500 text-xs">{errorMessage}</Text>
        )}
      </View>

      {/* 닉네임 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 이메일 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2"
        placeholder="이메일"
        value={email}
        onChangeText={(input) => {
          setEmail(input);
          validateEmail(input);
        }}
      />
      <View style={{ height: 20 }}>
        {!isEmailValid && email !== '' && (
          <Text className="text-red-500 text-xs">올바른 이메일 형식이 아닙니다.</Text>
        )}
      </View>

      {/* 비밀번호 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2"
        placeholder="비밀번호 (최소 8자, 문자와 숫자 포함)"
        secureTextEntry
        value={password}
        onChangeText={(input) => {
          setPassword(input);
          validatePassword(input);
        }}
      />
      <View style={{ height: 20 }}>
        {!isPasswordValid && password !== '' && (
          <Text className="text-red-500 text-xs">
            비밀번호는 최소 8자, 문자, 숫자, 그리고 특수문자를 포함해야 합니다.
          </Text>
        )}
      </View>

      {/* 비밀번호 확인 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2"
        placeholder="비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={{ height: 20 }}>
        {password !== confirmPassword && confirmPassword !== '' && (
          <Text className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        className="w-full h-12 bg-primary rounded-lg justify-center items-center mt-4"
        onPress={handleSignUp}>
        <Text className="text-background text-lg font-bold">회원가입</Text>
      </TouchableOpacity>

      {/* 로그인 화면으로 돌아가기 버튼 */}
      <TouchableOpacity className="mt-4" onPress={goToLogin}>
        <Text className="text-primary">로그인 화면으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
