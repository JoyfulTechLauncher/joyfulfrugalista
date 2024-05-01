import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const ForumPosts = () => {

  const imageMap = {
    post1: require('../assets/post.png'),
    post2: require('../assets/post.png'),
    post3: require('../assets/post.png'),
    post4: require('../assets/post.png'),
    post5: require('../assets/post.png'),
    post6: require('../assets/post.png'),
    // Add all necessary images
  };

  const posts = [
    { id: '1', userName: 'User Name', likes: 300, title: 'Title', image: 'post1' },
    { id: '2', userName: 'User Name', likes: 510, title: 'Title', image: 'post2' },
    { id: '3', userName: 'User Name', likes: 160, title: 'Title', image: 'post3' },
    { id: '4', userName: 'User Name', likes: 240, title: 'Title', image: 'post4' },
    { id: '5', userName: 'User Name', likes: 60, title: 'Title', image: 'post5' },
    { id: '6', userName: 'User Name', likes: 10, title: 'Title', image: 'post6' },
    // Map all posts accordingly
  ];



  const renderPost = ({ item }) => (
      <View style={styles.postCard}>
        <View style={styles.userInfo}>
          <Image style={styles.userAvatar} source={imageMap[item.image]} />
          <Text style={styles.userName}>{item.userName}</Text>
        </View>
        <Image style={styles.postImage} source={imageMap[item.image]} />
        <View style={styles.postFooter}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.likeButton}>
            <Image source={require('../assets/like.png')} style={styles.likeIcon} />
            <Text style={styles.likeCount}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> </Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={[styles.menuButton, styles.activeMenuButton]}>
          <Text style={styles.menuButtonText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText1}>Leader Board</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d144b',
  },
  header: {
    backgroundColor: '#2d144b',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 30, 
    paddingVertical: 10,
  },
  menuButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    //marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  activeMenuButton: {
    backgroundColor: '#f2c875',
  },
  menuButtonText: {
    color: '#ffffff',
  },
  menuButtonText1: {
    color: '#000000',
  },
  postsContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-around',
  },
  postCard: {
    backgroundColor: '#f2c875',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: '47%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 8, 
  },
  likeCount: {
    marginLeft: 3,
  },

});

export default ForumPosts;
