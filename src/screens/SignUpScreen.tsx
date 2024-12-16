import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import config from '../config';

const SignUpScreen = ({
  goToLogin,
  goToTechTags,
}: {
  goToLogin: () => void;
  goToTechTags: () => void;
}) => {
  const [username, setUsername] = useState(''); // 아이디
  const [nickname, setNickname] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호

  const messages = [
    '당신의 팀원을 쉽게 찾으세요',
    '함께 목표를 정하고 달성하세요',
    '팀워크로 성장을 경험하세요',
    '함께 배우고 성장하세요',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 텍스트 전환 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleSignUp = async () => {
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      console.log('모든 필드를 입력해주세요.');
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
        goToTechTags(); // 기술 태그 화면으로 이동
      } else {
        console.log('회원가입 실패:', response.data.message);
      }
    } catch (error) {
      console.error('회원가입 실패:', error.response?.data || error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      {/* 로고 */}
      <Text className="text-primary text-4xl font-bold mb-2">StudyLink</Text>

      {/* 애니메이션 메시지 */}
      <Animated.Text
        style={{
          opacity: fadeAnim,
          fontSize: 16,
          color: '#888',
          marginBottom: 20,
        }}>
        {messages[currentMessageIndex]}
      </Animated.Text>

      {/* 아이디 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />

      {/* 닉네임 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 이메일 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-6"
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        className="w-full h-12 bg-primary rounded-lg justify-center items-center"
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
