import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const dummyTags = [
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "Ruby",
  "Java",
  "Go",
];

const MyPageScreen = ({
  onSave,
  onBack,
}: {
  onSave: () => void;
  onBack: () => void;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("정재훈");
  const [email, setEmail] = useState("ghty6323@gmail.com");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState(["React", "Node.js", "Java"]);
  const [currentTag, setCurrentTag] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>(dummyTags);

  const addTag = (tag: string) => {
    if (tag.trim() !== "" && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
    }
    setCurrentTag("");
    setFilteredTags(dummyTags.filter((t) => !tags.includes(t)));
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setFilteredTags(dummyTags.filter((t) => !tags.includes(t)));
  };

  const handleTagInputChange = (text: string) => {
    setCurrentTag(text);
    if (text.trim() !== "") {
      const filtered = dummyTags.filter(
        (tag) =>
          tag.toLowerCase().startsWith(text.toLowerCase()) &&
          !tags.includes(tag)
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(dummyTags.filter((t) => !tags.includes(t)));
    }
  };

  const handleImageChange = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          setProfileImage(selectedImage || null);
        }
      }
    );
  };

  const handleSave = () => {
    console.log("닉네임:", nickname);
    console.log("이메일:", email);
    console.log("비밀번호:", password);
    console.log("기술 태그:", tags);
    onSave();
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 헤더 */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={onBack}>
            <Text className="text-black text-lg font-bold">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-black text-lg font-bold">
            {nickname}님의 정보
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-black text-lg font-bold">수정</Text>
          </TouchableOpacity>
        </View>

        {/* 프로필 이미지 */}
        <View className="items-center mb-8">
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../assets/images/default-memoji.png")
            }
            className="w-28 h-28 rounded-full mb-4 border-2 border-grey -300"
          />
          <TouchableOpacity
            onPress={handleImageChange}
            className="bg-gray-200 px-4 py-2 rounded-full"
          >
            <Text className="text-gray-700">이미지 변경</Text>
          </TouchableOpacity>
        </View>

        {/* 닉네임 변경 */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 mb-2">닉네임</Text>
          <TextInput
            className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        {/* 이메일 변경 */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 mb-2">이메일 주소</Text>
          <TextInput
            className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* 비밀번호 변경 */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 mb-2">비밀번호 수정</Text>
          <TextInput
            className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg"
            placeholder="새 비밀번호를 입력하세요"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* 기술 태그 추가/수정 */}
        <Text className="text-gray-500 font-bold mb-2">기술 태그</Text>
        <View className="bg-white p-4 rounded-lg mb-4">
          <View className="flex-row flex-wrap mb-3">
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
          </View>
          <TextInput
            className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg mb-2"
            placeholder="기술 태그를 입력하세요"
            placeholderTextColor="#aaa"
            value={currentTag}
            onChangeText={handleTagInputChange}
            onSubmitEditing={() => {
              const tagToAdd =
                filteredTags.length > 0 ? filteredTags[0] : currentTag;
              addTag(tagToAdd);
            }}
          />
          {currentTag.trim() !== "" && filteredTags.length > 0 && (
            <View className="w-full bg-white rounded-lg border border-gray-300 max-h-40 overflow-auto">
              <FlatList
                data={filteredTags}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-2 border-b border-gray-200"
                    onPress={() => addTag(item)}
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;
