import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AllMenuScreen = ({goToPage}: {goToPage: (page: string) => void}) => {
  const menuItems = [
    {label: '팀원 찾기', page: 'Team', icon: 'users', color: '#4CAF50'},
    {label: '통계', page: 'Stats', icon: 'bar-chart-2', color: '#2196F3'},
    {label: '마이페이지', page: 'MyPage', icon: 'user', color: '#FF9800'},
    {label: '설정', page: 'Settings', icon: 'settings', color: '#607D8B'},
    {label: '문의하기', page: 'Support', icon: 'help-circle', color: '#00BCD4'},
    {label: '앱 정보', page: 'AppInfo', icon: 'info', color: '#8BC34A'},
    {label: '로그아웃', page: 'Logout', icon: 'log-out', color: '#FF5722'},
  ];

  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-4 py-6"
      contentContainerStyle={{paddingBottom: 80}}>
      {/* 헤더 */}
      <Text className="text-2xl font-bold text-gray-800 mb-6">전체 메뉴</Text>

      {/* 메뉴 항목 */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center bg-white rounded-lg p-4 mb-4 shadow-md"
          onPress={() => goToPage(item.page)}>
          <View className="mr-4 items-center justify-center">
            <Icon name={item.icon} size={24} color={item.color} />
          </View>
          <Text className="text-lg text-gray-800 font-medium">
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AllMenuScreen;
