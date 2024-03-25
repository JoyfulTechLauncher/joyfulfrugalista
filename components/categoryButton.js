import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const housingIcon = require('../assets/housing.png');

const CategoryButton = ({ iconName, title, onPress, color }) => {
  const buttonStyles = [styles.button, { backgroundColor: color }];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Image source={iconName} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '22%',
    height: 92,
    // backgroundColor: '#D0C6E1',
    borderRadius: 10,
    margin: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 5,
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CategoryButton;
