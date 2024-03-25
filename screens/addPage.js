import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CategoryButton from '../components/categoryButton';
import CalculatorButton from '../components/calculatorButton';

const App = () => {
  const [inputValue, setInputValue] = useState('0.00');

  // Add the logic for handling button press
  const handleButtonPress = (value) => {
    // Update the inputValue state based on the button pressed
    if (!isNaN(value)) {
      setInputValue((prevInputValue) => prevInputValue === '0.00' ? value : prevInputValue + value);
    } else {
      // calculator logic, need to be modified
      setInputValue((prevInputValue) => prevInputValue + value);
    }
  };

  const calculatorButtons = [
    '7', '8', '9', 'Cal',
    '4', '5', '6', '+',
    '1', '2', '3', '-',
    '.', '0', 'C', 'ADD'
  ]

  const handleCategoryPress = (category) => {
    // press event logic
    console.log('Category selected:', category);
  };

  const categories = [
    { id: 'Housing', title: 'Housing', iconName: require('../assets/housing.png'), color: '#D0C6E1' },
    { id: 'Household', title: 'Household', iconName: require('../assets/household.png'), color: '#F1EBF2' },
    { id: 'Utilities', title: 'Utilities', iconName: require('../assets/utilities.png'), color: '#C4D3EB' },
    { id: 'Transport', title: 'Transport', iconName: require('../assets/transport.png'), color: '#D0ECF3' },
    { id: 'Food', title: 'Food', iconName: require('../assets/food.png'), color: '#BCE1D6' },
    { id: 'Health', title: 'Health', iconName: require('../assets/health.png'), color: '#C5E1BA' },
    { id: 'Education', title: 'Education', iconName: require('../assets/education.png'), color: '#F5C4DB' },
    { id: 'Appearance', title: 'Appearance', iconName: require('../assets/appearance.png'), color: '#F7E8E4' },
    { id: 'Lifestyle', title: 'Lifestyle', iconName: require('../assets/lifestyle.png'), color: '#F4EB85' },
    { id: 'Service Fee', title: 'Service Fee', iconName: require('../assets/service fee.png'), color: '#FFD6A1' },
    // maybe need more info
  ];

  return (
    <View style={styles.container}>
      {/* Add scroll */}
      <ScrollView style={styles.scrollView}>
        {/* Top navigation bar */}
        {/* <View style={styles.navBar}>
          <Text style={styles.navTitle}>Add</Text>
        </View> */}

        {/* Category buttons */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              iconName={category.iconName}
              title={category.title}
              onPress={() => handleCategoryPress(category.id)}
              color={category.color}
            />
          ))}
        </View>

        {/* Display for the input value */}
        <Text style={styles.inputDisplay}>{inputValue}</Text>

        {/* Description input */}
        <TextInput style={styles.descriptionInput} placeholder="Description" />

        {/* Numeric keypad */}
        <View style={styles.keypad}>
          {calculatorButtons.map((button) => (
            <CalculatorButton
              key={button}
              label={button}
              onPress={handleButtonPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#2d144b',
  },
  navTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // Additional styles needed
  },
  inputDisplay: {
    backgroundColor: '#eee',
    fontSize: 36,
    padding: 20,
    textAlign: 'right',
  },
  descriptionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // Additional styles needed
  },
  button: {
    // Styles for your calculator buttons
  },
  buttonText: {
    // Styles for the text inside your buttons
  },
  // Additional styles for other components
});

export default App;
