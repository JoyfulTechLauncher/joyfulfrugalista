import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { uid } from './Login.js';

const URL = 'https://joyful-429b0-default-rtdb.asia-southeast1.firebasedatabase.app/';

async function updateProfile(uid, newData) {
  const str = URL + 'users/' + uid + '.json';
  console.log(str);
  try {
    const response = await axios.patch(str, newData);
  } catch (error) {
    console.error('error2');
  }
}

const EditProfileScreen = ({ route, navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(route.params.otherParam?.name || '');
  const [phone, setPhone] = useState(route.params.otherParam?.phone || '');
  const [email, setEmail] = useState(route.params.otherParam?.email || '');
  const [goal, setGoal] = useState(route.params.otherParam?.goal || '');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleChooseAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setAvatar({ uri: result.assets[0].uri });
    }
  };
  

  const handleSave = async () => {
    const userDataToUpdate = {
      name: username,
      phone: phone,
      email: email,
      goal: goal,
    };
    try {
      await updateProfile(uid, userDataToUpdate);
      Alert.alert('Profile Updated', 'Your profile has been successfully updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearInput = (setFunction) => {
    setFunction('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseAvatar} style={styles.avatarContainer}>
    <Image
      source={avatar || require('../assets/portrait.png')}
      style={styles.avatar}
    />
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>Edit</Text>
    </View>
  </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={styles.placeholderColor.color}
          onChangeText={setUsername}
          value={username}
        />
        {username && (
          <TouchableOpacity onPress={() => clearInput(setUsername)} style={styles.clearButton}>
            <Image source={require('../assets/close.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={styles.placeholderColor.color}
          onChangeText={setPhone}
          value={phone}
          keyboardType="phone-pad"
        />
        {phone && (
          <TouchableOpacity onPress={() => clearInput(setPhone)} style={styles.clearButton}>
            <Image source={require('../assets/close.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={styles.placeholderColor.color}
          value={email}
          onChangeText={setEmail}
        />
        {email && (
          <TouchableOpacity onPress={() => clearInput(setEmail)} style={styles.clearButton}>
            <Image source={require('../assets/close.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Saving Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="How Much You Want to Save?"
          placeholderTextColor={styles.placeholderColor.color}
          onChangeText={setGoal}
          value={goal}
          keyboardType="decimal-pad"
        />
        {goal && (
          <TouchableOpacity onPress={() => clearInput(setGoal)} style={styles.clearButton}>
            <Image source={require('../assets/close.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <Button title="Save Profile" onPress={handleSave} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    height: 50,
  },
  avatarContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',  
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  placeholderColor: {
    color: '#CECCCB',
  },
  clearButton: {
    padding: 5,
  },
  icon: {
    width: 15,
    height: 15,
  },
  avatarContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute', 
    bottom: 0,  
    height: '25%',  
    width: '100%',  
    backgroundColor: 'rgba(0,0,0,0.5)',  
    justifyContent: 'center',  
    alignItems: 'center',  
    borderBottomLeftRadius: 60,  
    borderBottomRightRadius: 60,  
  },
  overlayText: {
    color: 'white', 
  },
});

export default EditProfileScreen;
