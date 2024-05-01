import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { uid } from "./Login.js";
const URL =
  "https://joyful-429b0-default-rtdb.asia-southeast1.firebasedatabase.app/";

const pickerStyle = {
  inputIOS: {
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 0,
    color: "black",
    paddingRight: 30,
    height: "100%", // 确保填满容器高度
  },
  inputAndroid: {
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 0,
    color: "black",
    paddingRight: 30,
    height: "100%", // 确保填满容器高度
  },
};

async function updateProfile(uid, newData) {
  const str = URL + "users/" + uid + ".json";
  console.log(str);
  try {
    const response = await axios.patch(str, newData);
  } catch (error) {
    console.error("error2");
  }
  //console.log(response);
}

//TODO:  (1.type check 2. no empty fields check)
const EditProfileScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState(route.params.otherParam?.name || "");
  const [phone, setPhone] = useState(route.params.otherParam?.phone || "");
  const [email, setEmail] = useState(route.params.otherParam?.email || "");
  const [goal, setGoal] = useState(route.params.otherParam?.goal || "");

  const handleSave = async () => {
    const userDataToUpdate = {
      name: username,
      phone: phone,
      email: email,
      goal: goal,
    };
    try {
      await updateProfile(uid, userDataToUpdate);
      Alert.alert(
        "Profile Updated",
        "Your profile has been successfully updated.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
    }
  };

  const sendVerificationCode = (field) => {
    Alert.alert(
      `Verification Code Sent`,
      `A verification code has been sent to your ${field}.`
    );
  };

  console.log(typeof username);
  console.log(username);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder="username"
        placeholderTextColor={styles.placeholderColor.color}
        onChangeText={setUsername}
        value={username}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="phone"
          placeholderTextColor={styles.placeholderColor.color}
          onChangeText={setPhone}
          value={phone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          onPress={() => sendVerificationCode("phone")}
          style={styles.button}
        ></TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="goal"
          placeholderTextColor={styles.placeholderColor.color}
          onChangeText={setGoal}
          value={goal}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          onPress={() => sendVerificationCode("phone")}
          style={styles.button}
        ></TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={styles.placeholderColor.color}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          onPress={() => sendVerificationCode("email")}
          style={styles.button}
        ></TouchableOpacity>
      </View>

      <Button title="Save Profile" onPress={handleSave} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EBCA81",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // 确保子项垂直居中
    marginBottom: 10,
    borderWidth: 0,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    height: 50,
    overflow: "hidden",
    backgroundColor: "#fae8be",
  },

  input: {
    flex: 1,
    marginRight: 10,
    height: "100%",
  },

  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  placeholderColor: {
    color: "#CECCCB",
  },
});

export default EditProfileScreen;
