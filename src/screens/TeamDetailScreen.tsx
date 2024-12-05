import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';

type TeamDataItem = {
  id: string;
  title: string;
  tags: string[];
  current: number;
  total: number;
  deadline: string;
};

type TeamDetailScreenProps = {
  detail: TeamDataItem;
  setActiveTab: (tab: string) => void;
};

const TeamDetailScreen = ({detail, setActiveTab}: TeamDetailScreenProps) => {
  const dummyComments = [
    {id: '1', author: '홍길동', content: '이 프로젝트 너무 좋네요!'},
    {id: '2', author: '김철수', content: '참여 신청합니다!'},
  ];

  const similarProjects = [
    {
      id: '1',
      title: 'Python 기반 데이터 분석 프로젝트',
      tags: ['Python', 'Django'],
    },
    {
      id: '2',
      title: '머신러닝 모델 개발 프로젝트',
      tags: ['Python', 'TensorFlow'],
    },
    {
      id: '3',
      title: 'Django로 웹 애플리케이션 개발 프로젝트',
      tags: ['Python', 'Django'],
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    console.log({
      username: 'dummyUser',
      selfIntroduction,
    });
    setIsModalVisible(false);
    setHasApplied(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        {/* 상단 제목 섹션 */}
        <View className="bg-white p-6 shadow-md mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {detail.title}
          </Text>
          <View className="flex-row flex-wrap">
            {detail.tags.map((tag: string, index: number) => (
              <Text
                key={index}
                className={`text-xs px-2 py-1 rounded-full mr-2 mb-2 ${
                  tag === 'React'
                    ? 'bg-blue-100 text-blue-800'
                    : tag === 'Node.js'
                    ? 'bg-green-100 text-green-800'
                    : tag === 'Java'
                    ? 'bg-yellow-100 text-yellow-800'
                    : tag === 'Python'
                    ? 'bg-yellow-200 text-yellow-900'
                    : tag === 'Django'
                    ? 'bg-gray-200 text-gray-800'
                    : tag === 'TypeScript'
                    ? 'bg-indigo-100 text-indigo-800'
                    : tag === 'GraphQL' ||
                      tag === 'Kubernetes' ||
                      tag === 'Laravel'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                {tag}
              </Text>
            ))}
          </View>
        </View>

        {/* 상세 정보 섹션 */}
        <View className="bg-white p-4 rounded-lg shadow-md mb-4 mx-4">
          <Text className="text-gray-700 text-base mb-4">
            이 프로젝트는 심장질환 예측을 목표로 하며, Django와 Python을
            활용하여 모델을 구축합니다. 프로젝트는 6개월간 진행되며, 매주
            스프린트를 통해 진행 상황을 공유합니다.
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700 text-base">
              모집 인원: {detail.current}/{detail.total}명
            </Text>
            <Text className="text-gray-700 text-base">
              마감 기한: {detail.deadline}
            </Text>
          </View>
          {/* 신청하기 버튼 */}
          <TouchableOpacity
            className={`px-4 py-2 rounded-lg mt-4 ${
              hasApplied ? 'bg-gray-400' : 'bg-blue-500'
            }`}
            onPress={() => !hasApplied && setIsModalVisible(true)}
            disabled={hasApplied}>
            <Text
              className={`text-center font-bold text-sm ${
                hasApplied ? 'text-white' : 'text-white'
              }`}>
              {hasApplied ? '이미 지원한 공고에요!' : '신청하기'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 댓글 섹션 */}
        <View className="bg-white p-4 rounded-lg shadow-md mx-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">댓글</Text>
            <Text className="text-xs text-gray-500">
              {dummyComments.length}개의 댓글
            </Text>
          </View>
          {dummyComments.map(comment => (
            <View
              key={comment.id}
              className="border-b border-gray-200 pb-2 mb-2">
              <Text className="text-gray-800 font-semibold">
                {comment.author}
              </Text>
              <Text className="text-gray-700 text-sm">{comment.content}</Text>
            </View>
          ))}
          <TextInput
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 mt-2 text-sm"
            placeholder="댓글을 입력하세요."
          />
        </View>

        {/* 비슷한 기술 스택 프로젝트 섹션 */}
        <View className="bg-white p-4 rounded-lg shadow-md mx-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            비슷한 기술 스택의 프로젝트
          </Text>
          {similarProjects.map(project => (
            <View
              key={project.id}
              className="border-b border-gray-200 pb-2 mb-2">
              <Text className="text-gray-900 font-semibold">
                {project.title}
              </Text>
              <View className="flex-row flex-wrap mt-1">
                {project.tags.map((tag, index) => (
                  <Text
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full mr-2 ${
                      tag === 'React'
                        ? 'bg-blue-100 text-blue-800'
                        : tag === 'Python'
                        ? 'bg-yellow-200 text-yellow-900'
                        : tag === 'Django'
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 하단 네비게이션 */}
      <View className="absolute bottom-0 left-0 right-0 bg-white h-16 flex-row justify-around items-center border-t border-gray-200">
        <TouchableOpacity onPress={() => setActiveTab('Home')}>
          <Text className="text-gray-500">홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('Team');
          }}>
          <Text className="text-gray-900 font-bold">팀원 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Stats')}>
          <Text className="text-gray-500">통계</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('AllPosts')}>
          <Text className="text-gray-500">전체</Text>
        </TouchableOpacity>
      </View>

      {/* 모달 */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={handleCancel}>
        <View className="bg-black/40 flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-2xl shadow-lg w-4/5">
            <Text className="text-2xl font-semibold text-gray-800 mb-4">
              자기소개
            </Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-xl mb-4 text-gray-900"
              placeholder="간단한 자기소개를 적어주세요 !"
              placeholderTextColor="#999"
              value={selfIntroduction}
              onChangeText={setSelfIntroduction}
              multiline
              numberOfLines={4}
              style={{textAlignVertical: 'top'}}
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-gray-100 px-5 py-3 rounded-xl flex-1 mr-2">
                <Text className="text-gray-700 text-center font-medium">
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApply}
                className="bg-blue-600 px-5 py-3 rounded-xl flex-1 ml-2">
                <Text className="text-white text-center font-medium">신청</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamDetailScreen;
