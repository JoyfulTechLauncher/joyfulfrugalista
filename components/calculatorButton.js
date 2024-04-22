import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const CalculatorButton = ({ label, onPress, type, imageSource }) => {
  const content = imageSource ? (
    <Image source={imageSource} style={styles.imageStyle} />
  ) : (
    <Text style={styles.buttonText}>{label}</Text>
  );

  return (
    <TouchableOpacity style={[styles.button, styles[type]]} onPress={() => onPress(label)}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    // margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minWidth: '20%',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#f2f2f2',
    // borderRadius: 10,
  },
  number: { // Style for number buttons
    backgroundColor: '#FFF8DC',
  },
  operator: { // Style for operators like +, -, etc.
    backgroundColor: '#FFF8DC',
  },
  date: { // Style for the date button
    backgroundColor: '#FFF8DC',
  },
  backspace: { // Style for the backspace button
    backgroundColor: '#FFF8DC',
  },
  done: { // Style for the done button
    backgroundColor: '#FFCD29',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  imageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default CalculatorButton;