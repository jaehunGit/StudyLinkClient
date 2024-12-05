import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, LogBox  } from 'react-native';

const dummyTags = [
  'React', 'Vue', 'Angular', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Ruby', 'Java', 'Go',
];

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

const TeamRecruitScreen = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [recruitmentNumber, setRecruitmentNumber] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCurrentTag('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(0);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleTagInputChange = (text: string) => {
    setCurrentTag(text);
    if (text) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  
    if (filteredTags.length > 0 && selectedSuggestionIndex === 0 && !currentTag.includes(' ')) {
      setSelectedSuggestionIndex(0);
    }
  };
  
  const handleKeyPress = (e: any) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex(Math.min(filteredTags.length - 1, selectedSuggestionIndex + 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex(Math.max(0, selectedSuggestionIndex - 1));
    } else if (e.key === 'Enter') {
      const tagToAdd = filteredTags[selectedSuggestionIndex] || currentTag;
      addTag(tagToAdd);
    }
  };
  

  const submitRecruitmentPost = () => {
    console.log({
      title,
      tags,
      recruitmentNumber,
      deadline,
      description,
    });
    setActiveTab("Team");
  };

  const filteredTags = dummyTags.filter(tag => 
    tag.toLowerCase().startsWith(currentTag.toLowerCase()) && !tags.includes(tag)
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 px-6 py-8" keyboardShouldPersistTaps="handled" nestedScrollEnabled>
      {/* 헤더 */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800">팀원 모집 공고 등록</Text>
        <Text className="text-sm text-gray-500 mt-1">팀원 모집을 위해 아래 정보를 입력하세요.</Text>
      </View>

      {/* 프로젝트 제목 */}
      <View className="mb-4">
        <Text className="text-base font-medium text-gray-700 mb-2">프로젝트 제목</Text>
        <TextInput
          className="w-full bg-white p-4 rounded-lg border border-gray-300"
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* 기술 태그 */}
      <View className="mb-4 relative">
        <Text className="text-base font-medium text-gray-700 mb-2">기술 태그</Text>
        <View className="bg-white p-3 rounded-lg border border-gray-300">
          <View className="flex-row flex-wrap items-center">
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2 flex-row items-center"
                onPress={() => removeTag(tag)}
              >
                <Text className="text-blue-800">{tag}</Text>
                <Text className="text-red-500 font-bold ml-2">x</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              className="flex-1 text-sm py-1"
              placeholder="태그를 입력하세요"
              value={currentTag}
              onChangeText={handleTagInputChange}
              onSubmitEditing={() => {
                const tagToAdd = filteredTags.length > 0 ? filteredTags[0] : currentTag;
                addTag(tagToAdd);
              }}
              onKeyPress={handleKeyPress}
            />
          </View>
        </View>

        {/* 자동완성 리스트 */}
        {showSuggestions && currentTag && (
          <View
            className="absolute top-full left-0 right-0 bg-white z-10 border border-gray-300 rounded-lg"
            style={{
              maxHeight: 150,
              overflow: "hidden",
            }}
          >
            <FlatList
              data={filteredTags}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => addTag(item)}
                  className={`p-2 border-b border-gray-200 ${
                    selectedSuggestionIndex === index ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={{
                maxHeight: 150,
              }}
              
            />
          </View>
        )}
      </View>


      {/* 모집 정보 */}
      <View className="flex-row mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-base font-medium text-gray-700 mb-2">모집 인원</Text>
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-300"
            placeholder="모집 인원"
            keyboardType="numeric"
            value={recruitmentNumber}
            onChangeText={setRecruitmentNumber}
          />
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-base font-medium text-gray-700 mb-2">마감 기한</Text>
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-300"
            placeholder="YYYY-MM-DD"
            value={deadline}
            onChangeText={setDeadline}
          />
        </View>
      </View>

      {/* 상세 설명 */}
      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">상세 설명</Text>
        <TextInput
          className="bg-white p-4 rounded-lg border border-gray-300"
          style={{ minHeight: 150, textAlignVertical: 'top' }}
          placeholder="상세 설명을 입력하세요"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* 공고 등록 버튼 */}
      <TouchableOpacity
        className="w-full bg-blue-500 py-4 rounded-lg mt-4"
        onPress={submitRecruitmentPost}
      >
        <Text className="text-white text-center font-bold">공고 등록</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TeamRecruitScreen;
