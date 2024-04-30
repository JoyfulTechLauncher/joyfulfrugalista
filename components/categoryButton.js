import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const CategoryButton = ({ iconName, title, onPress, color, isSelected }) => {
  const buttonStyles = [
    styles.button,
    { backgroundColor: color },
    isSelected && styles.selected // Apply selected style if isSelected is true
  ];

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
    borderRadius: 20,
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
  selected: {
    borderColor: '#480076',
    borderWidth: 2,
  }
});

export default CategoryButton;
