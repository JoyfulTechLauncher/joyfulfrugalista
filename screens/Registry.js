import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../components/firebaseConfig';
import { useAuth } from '../components/AuthContext';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useAuth();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User UID:", userCredential.user.uid);
        setUser({ uid: userCredential.user.uid })
        sendVerificationEmail(userCredential.user);
        Alert.alert("Registration Successful", "You are now registered and logged in. Please check your email to verify your account.");
        navigation.navigate('MyTabs'); // Assuming you want to navigate to 'MyTabs' after registration
      })
      .catch((error) => {
        Alert.alert("Registration failed", error.message);
      });
  };
  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
      .then(() => {
        console.log("Verification email sent.");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
        Alert.alert("Verification Email Failed", "Failed to send verification email. Please try again later.");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source = {require('../assets/Joyful Savings Jar 4.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUp}>Already have an account? Sign in</Text>
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
  logoContainer: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    backgroundColor: '#E91E63',
    borderRadius: 80,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#673AB7',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#673AB7',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default Register;
