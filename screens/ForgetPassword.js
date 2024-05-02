import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../components/firebaseConfig';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent", "Please check your email inbox for further instructions.");
        navigation.navigate('Login'); // Navigate back to login screen
      })
      .catch((error) => {
        Alert.alert("Password reset failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
    color: '#2d144b',
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2D144B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backToLogin: {
    color: '#2D144B',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ForgetPassword;
