import React, { useState } from 'react';
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
  const [username, setUsername] = useState(route.params.otherParam?.name || '');
  const [phone, setPhone] = useState(route.params.otherParam?.phone || '');
  const [email, setEmail] = useState(route.params.otherParam?.email || '');
  const [goal, setGoal] = useState(route.params.otherParam?.goal || '');

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

  const sendVerificationCode = (field) => {
    Alert.alert(`Verification Code Sent`, `A verification code has been sent to your ${field}.`);
  };

  const clearInput = (setFunction) => {
    setFunction('');
  };

  return (
    <View style={styles.container}>
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
});

export default EditProfileScreen;
