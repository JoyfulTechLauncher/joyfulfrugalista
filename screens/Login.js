import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo</Text>
      </View>
      <Text style={styles.title}>Sign In</Text>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUp}>Sign up</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch', // This will center the logo horizontally
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
    },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Logo text is probably white
  },
  title: {
    fontSize: 26, // Slightly larger title
    fontWeight: 'bold', // Bold title text
    marginBottom: 30, // Increase spacing
    alignSelf: 'left',
    color: '#2d144b', // Assuming a dark title color
  },
  input: {
    height: 50, // Larger touch area
    borderColor: '#d3d3d3', // Lighter border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15, // More padding inside
    borderRadius: 10, // Rounded borders
  },
  button: {
    backgroundColor: '#673AB7', // Button background color
    paddingVertical: 15, // Slightly larger button
    borderRadius: 10, // Rounded borders
    alignItems: 'center',
    marginBottom: 10, // Spacing after button
  },
  buttonText: {
    color: '#fff', // Text color is white
    fontSize: 18,
  },
  forgotPassword: {
    color: '#673AB7', // Match sign-in button color
    fontSize: 16, // Slightly larger font
    marginTop: 10,
    alignSelf: 'center', // Center align text
  },
  signUp: {
    color: '#673AB7', // Match sign-in button color
    fontSize: 16, // Slightly larger font
    marginTop: 10,
    alignSelf: 'center', // Center align text
  },
});


export default Login;
