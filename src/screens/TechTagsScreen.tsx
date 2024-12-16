import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import config from '../config';

const dummyTags = [
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Python',
  'Ruby',
  'Java',
  'Go',
];

const TechTagsScreen = ({
  onComplete,
  userId,
}: {
  onComplete: () => void;
  userId: string;
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>(dummyTags);

  const messages = [
    '당신의 능력을 더 잘 보여주세요!',
    '팀원들에게 어떤 기술을 잘하는지 알려주세요.',
    '기술 태그로 나만의 강점을 어필하세요!',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 메시지 애니메이션 효과
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  // 태그 추가
  const addTag = (tag: string) => {
    if (tag.trim() !== '' && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
    }
    setCurrentTag('');
    setFilteredTags(dummyTags);
  };

  // 태그 삭제
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // 자동완성 필터링
  const handleTagInputChange = (text: string) => {
    setCurrentTag(text);
    if (text.trim() !== '') {
      const filtered = dummyTags.filter(
        tag =>
          tag.toLowerCase().startsWith(text.toLowerCase()) &&
          !tags.includes(tag),
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(dummyTags.filter(tag => !tags.includes(tag)));
    }
  };

  const handleComplete = async () => {
    if (tags.length === 0) {
      console.log('태그를 한 개 이상 선택해주세요.');
      return;
    }

    const payload = {
      userId: userId,
      tags: tags,
    };

    try {
      const response = await axios.post(
        `${config.apiUrl}/user/techTags`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        },
      );

      console.log('태그 전송 성공:', response.data);
      onComplete();
    } catch (error) {
      const err = error as AxiosError;
      console.error('태그 전송 실패:', err.response?.data || err.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      {/* 로고 */}
      <Text className="text-primary text-4xl font-bold mt-4 mb-6">
        StudyLink
      </Text>

      {/* 애니메이션 메시지 */}
      <Animated.Text
        className="text-center text-lg text-gray-600 mb-4"
        style={{opacity: fadeAnim}}>
        {messages[currentMessageIndex]}
      </Animated.Text>

      {/* 선택된 태그 리스트 */}
      <View className="w-full bg-white p-3 rounded-lg border border-gray-300 mb-4 min-h-[50px] max-h-[150px] overflow-auto">
        <View className="flex-row flex-wrap items-center">
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2 flex-row items-center"
              onPress={() => removeTag(tag)}>
              <Text className="text-blue-800">{tag}</Text>
              <Text className="text-red-500 font-bold ml-2">x</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 태그 입력 필드 */}
      <TextInput
        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg"
        placeholder="예: React, JavaScript"
        placeholderTextColor="#aaa"
        value={currentTag}
        onChangeText={handleTagInputChange}
        onSubmitEditing={() => {
          const tagToAdd =
            filteredTags.length > 0 ? filteredTags[0] : currentTag;
          addTag(tagToAdd);
        }}
      />

      {/* 자동완성 리스트 */}
      <View className="relative w-full">
        {currentTag.trim() !== '' && filteredTags.length > 0 && (
          <View className="absolute top-0 w-full bg-white p-3 rounded-lg border border-gray-300 mt-2 max-h-40 z-10">
            <FlatList
              data={filteredTags}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  className="p-2 border-b border-gray-200"
                  onPress={() => addTag(item)}>
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* 완료 버튼 */}
      <TouchableOpacity
        className="w-full h-12 bg-primary rounded-lg justify-center items-center mt-6"
        onPress={handleComplete}>
        <Text className="text-white text-lg font-bold">완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TechTagsScreen;
