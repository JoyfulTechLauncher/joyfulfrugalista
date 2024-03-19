import { View, Text, Pressable } from "react-native";
function PostsGrid({ title, author }) {
  return (
    <View>
      <Pressable>
        <View>
          <Text>
            {title},{author}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default PostsGrid;
