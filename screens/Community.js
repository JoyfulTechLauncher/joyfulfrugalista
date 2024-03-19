import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native";
import { POSTS } from "../data/dummy-community";
import PostsGrid from "../components/PostsGrid";

function renderPostsItem(itemData) {
  return (
    <PostsGrid title={itemData.item.title} author={itemData.item.author} />
  );
}

function Community({ author, title, color }) {
  return (
    <View>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPostsItem}
      />
    </View>
  );
}

export default Community;
