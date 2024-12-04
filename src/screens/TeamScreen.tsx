import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

type TeamScreenProps = {
  setActiveTab: (tab: string) => void;
  setSelectedDetail: (detail: any) => void;
};

type TeamDataItem = {
  id: string;
  title: string;
  tags: string[];
  current: number;
  total: number;
  deadline: string;
};

const initialTeamData: TeamDataItem[] = [
  {
    id: "1",
    title: "심장질환 예측 프로젝트 팀원 모집 (Backend 개발자)",
    tags: ["Python", "Django"],
    current: 2,
    total: 4,
    deadline: "2024-12-31",
  },
  {
    id: "2",
    title: "쇼핑몰 플랫폼 개발 프로젝트 팀원 모집 (Fullstack)",
    tags: ["React", "Node.js", "MongoDB"],
    current: 3,
    total: 6,
    deadline: "2024-12-25",
  },
  {
    id: "3",
    title: "Kubernetes 모니터링 시스템 프로젝트 (DevOps 엔지니어)",
    tags: ["Kubernetes", "Docker", "Grafana"],
    current: 1,
    total: 3,
    deadline: "2024-12-20",
  },
  {
    id: "4",
    title: "GraphQL 기반 블로그 플랫폼 프로젝트 팀원 모집 (Frontend 개발자)",
    tags: ["GraphQL", "React", "TypeScript"],
    current: 2,
    total: 5,
    deadline: "2024-12-15",
  },
  {
    id: "5",
    title: "Laravel로 개발하는 음식 배달 서비스 프로젝트 (Backend 개발자)",
    tags: ["Laravel", "PHP", "MySQL"],
    current: 1,
    total: 4,
    deadline: "2024-12-10",
  },
];

const TeamScreen = ({
  setActiveTab,
  setSelectedDetail,
}: TeamScreenProps) => {
  const [data, setData] = useState<TeamDataItem[]>(initialTeamData);

  const fetchMoreData = () => {
    const newItems: TeamDataItem[] = data.map((item) => ({
      ...item,
      id: `${data.length + Math.random()}`,
    }));
    setData([...data, ...newItems]);
  };

  const renderItem = ({ item }: { item: TeamDataItem }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedDetail(item);
        setActiveTab("TeamDetail");
      }}
    >
      <View className="p-4 bg-white rounded-lg mb-4 shadow-md mx-4">
        <Text className="text-lg font-bold">{item.title}</Text>
        <View className="flex-row flex-wrap mt-2 mb-4">
          {item.tags.map((tag, index) => (
            <Text
              key={index}
              className={`text-xs px-2 py-1 rounded-full mr-2 mb-2 ${
                tag === "React"
                  ? "bg-blue-100 text-blue-800"
                  : tag === "Node.js"
                  ? "bg-green-100 text-green-800"
                  : tag === "Java"
                  ? "bg-yellow-100 text-yellow-800"
                  : tag === "Python"
                  ? "bg-yellow-200 text-yellow-900"
                  : tag === "Django"
                  ? "bg-gray-200 text-gray-800"
                  : tag === "TypeScript"
                  ? "bg-indigo-100 text-indigo-800"
                  : tag === "GraphQL" || tag === "Kubernetes" || tag === "Laravel"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tag}
            </Text>
          ))}
        </View>
        <Text className="text-gray-500 text-sm">
          모집 인원: {item.current}/{item.total}명
        </Text>
        <Text className="text-gray-500 text-sm">마감: {item.deadline}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center px-4 mt-4 mb-6">
        <Text className="text-primary text-2xl font-bold">팀원 찾기</Text>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
          <Text className="text-white text-sm">팀원 모집</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default TeamScreen;
