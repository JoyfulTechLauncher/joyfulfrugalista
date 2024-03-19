import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalculatorButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={() => onPress(label)}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#f2f2f2'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default CalculatorButton;