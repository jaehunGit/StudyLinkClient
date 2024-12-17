import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const MyPageMainScreen = ({goToProfileEdit}: {goToProfileEdit: () => void}) => {
  return (
    <View className="flex-1 bg-gray-100 px-6 py-8">
      {/* 헤더 */}
      <Text className="text-2xl font-bold mb-6 text-gray-800">마이페이지</Text>

      {/* 프로필 정보 */}
      <View className="items-center mb-8">
        <Image
          source={require('../assets/images/default-memoji.png')}
          className="w-28 h-28 rounded-full mb-4 border-2 border-gray-300"
        />
        <Text className="text-xl font-bold text-gray-700 mb-2">정재훈</Text>
        <Text className="text-gray-500">ghty6323@gmail.com</Text>
      </View>

      {/* 프로필 수정 버튼 */}
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg items-center mb-6"
        onPress={goToProfileEdit}>
        <Text className="text-white font-bold text-lg">프로필 수정</Text>
      </TouchableOpacity>

      {/* 섹션: 내가 지원한 공고, 참여 중인 프로젝트, 즐겨찾기 */}
      <View className="bg-white rounded-lg p-4 mb-6 shadow-md">
        <View className="flex-row justify-between items-center">
          {/* 내가 지원한 공고 */}
          <TouchableOpacity className="items-center flex-1">
            <Text className="text-gray-500 text-sm">내가 지원한 공고</Text>
            <Text className="text-primary text-xl font-bold mt-1">0</Text>
          </TouchableOpacity>

          <View className="w-px h-12 bg-gray-300" />

          {/* 참여 중인 프로젝트 */}
          <TouchableOpacity className="items-center flex-1">
            <Text className="text-gray-500 text-sm">참여 중 프로젝트</Text>
            <Text className="text-primary text-xl font-bold mt-1">0</Text>
          </TouchableOpacity>

          <View className="w-px h-12 bg-gray-300" />

          {/* 즐겨찾기 */}
          <TouchableOpacity className="items-center flex-1">
            <Text className="text-gray-500 text-sm">즐겨찾기</Text>
            <Text className="text-primary text-xl font-bold mt-1">0</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 최근 본 공고 */}
      <TouchableOpacity className="flex-row items-center bg-white rounded-lg p-4 shadow-md mb-4">
        <Icon
          name="clock"
          size={24}
          color="#4DB6AC"
          style={{marginRight: 12}}
        />
        <Text className="text-lg text-gray-800 font-medium">최근 본 공고</Text>
      </TouchableOpacity>

      {/* 활동 내역 */}
      <TouchableOpacity className="flex-row items-center bg-white rounded-lg p-4 mb-4 shadow-md">
        <Icon
          name="activity"
          size={24}
          color="#FF9800"
          style={{marginRight: 12}}
        />
        <Text className="text-lg text-gray-800 font-medium">활동 내역</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPageMainScreen;
