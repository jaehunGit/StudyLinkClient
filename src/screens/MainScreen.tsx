import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";

const MainScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center mt-4 mb-6">
        <Text className="text-primary text-2xl font-bold">StudyLink</Text>
        <TouchableOpacity>
          {/* 알림 배지 */}
          <Text className="text-primary text-lg">🔔</Text>
          <View className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full justify-center items-center">
            <Text className="text-white text-xs">3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 태그 사용 통계 */}
      <View className="p-4 bg-white rounded-lg mb-4">
        <Text className="text-lg font-bold mb-4">태그 사용 통계</Text>
        <View className="mb-3">
          <Text className="text-secondary">React: 40%</Text>
          <View className="h-2 bg-gray-300 rounded-lg">
            <View className="h-2 bg-primary rounded-lg" style={{ width: "40%" }} />
          </View>
        </View>
        <View className="mb-3">
          <Text className="text-secondary">Node.js: 30%</Text>
          <View className="h-2 bg-gray-300 rounded-lg">
            <View className="h-2 bg-primary rounded-lg" style={{ width: "30%" }} />
          </View>
        </View>
        <View>
          <Text className="text-secondary">Java: 30%</Text>
          <View className="h-2 bg-gray-300 rounded-lg">
            <View className="h-2 bg-primary rounded-lg" style={{ width: "30%" }} />
          </View>
        </View>
      </View>

      {/* 추천 게시물 */}
      <View className="p-4 bg-white rounded-lg mb-4">
        <Text className="text-lg font-bold mb-4">추천 게시물</Text>
        <View className="border border-gray-300 rounded-lg p-4">
          <Text className="text-primary font-bold">React 프로젝트를 함께할 사람 모집</Text>
          <Text className="text-secondary">#React #Java #Spring</Text>
        </View>
      </View>

      {/* 내 프로필 */}
      <View className="p-4 bg-white rounded-lg mb-4 items-center">
        <Image
          source={require("../assets/images/default-memoji.png")}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-lg font-bold">
          <Text className="text-secondary">어서오세요, 정재훈님!</Text>
        </Text>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg mt-4">
          <Text className="text-white text-center">프로필 수정</Text>
        </TouchableOpacity>
      </View>

      {/* 팀원 찾기 바로가기 */}
      <View className="p-4 bg-white rounded-lg mb-4">
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
          <Text className="text-white text-center">팀원 찾기 게시판으로 이동</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MainScreen;
