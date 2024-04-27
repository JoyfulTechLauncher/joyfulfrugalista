import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CategoryButton from '../components/categoryButton';
import CalculatorButton from '../components/calculatorButton';

const App = () => {
  const [inputValue, setInputValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  // Add the logic for handling button press
  // const handleButtonPress = (value) => {
  //   if (value === 'Back') {
  //     setInputValue(inputValue.slice(0, -1) || '0');
  //   } else if (value === 'Done') {
  //     if (!operator) return;
  //     const result = calculate(parseFloat(previousValue), parseFloat(inputValue), operator);
  //     setInputValue(String(result));
  //     setPreviousValue(null);
  //     setOperator(null);
  //   } else if (['+', '-'].includes(value)) {
  //     setOperator(value);
  //     setPreviousValue(inputValue);
  //     setInputValue('0');
  //   } else if (value === 'Date'){
  //     // handle the date button
  //   } else {
  //     setInputValue(inputValue === '0' ? String(value) : inputValue + value);
  //   }
  // };
  const handleButtonPress = (value) => {
    if (value === 'Back') {
      setInputValue(inputValue.slice(0, -1) || '0');
    }
    else if (value === 'Date') {
      setInputValue('0');
      setPreviousValue(null);
      setOperator(null);
    }
    else if (value === 'Done') {
      if (operator && previousValue !== null) {
        const result = calculate(parseFloat(previousValue), parseFloat(inputValue), operator);
        setInputValue(String(result));
        setPreviousValue(null);
        setOperator(null);
      }
    }
    else if (['+', '-'].includes(value)) {
      if (operator && previousValue !== null) {
        const result = calculate(parseFloat(previousValue), parseFloat(inputValue), operator);
        setPreviousValue(String(result));
        setInputValue('0');
        setOperator(value);
      } else {
        setPreviousValue(inputValue);
        setInputValue('0');
        setOperator(value);
      }
    }
    else if (!isNaN(value) || (value === '.' && !inputValue.includes('.'))) {
      setInputValue((inputValue === '0' && value !== '.') ? value : inputValue + value);
    }
  };

  const calculate = (a, b, operator) => {
    switch(operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      default:
        return b; // If no operator is provided, just return the second operand
    }
  };


  const calculatorButtons = [
    { label: '7', type: 'number' }, { label: '8', type: 'number' }, { label: '9', type: 'number' }, 
    // { label: 'Date', type: 'date' },
    { label: 'Date', type: 'date', imageSource: require('../assets/cal.png') },
    { label: '4', type: 'number' }, { label: '5', type: 'number' }, { label: '6', type: 'number' }, { label: '+', type: 'operator' },
    { label: '1', type: 'number' }, { label: '2', type: 'number' }, { label: '3', type: 'number' }, { label: '-', type: 'operator' },
    { label: '.', type: 'operator' }, { label: '0', type: 'number' },
    // { label: 'Back', type: 'backspace' }, 
    // { label: 'Done', type: 'done' }
    { label: 'Back', type: 'backspace', imageSource: require('../assets/backspace.png') },
    { label: 'Done', type: 'done', imageSource: require('../assets/add.png') },
  ];

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
              key={button.label}
              label={button.label}
              onPress={handleButtonPress}
              type={button.type}
              imageSource={button.imageSource}
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
    backgroundColor: '#29144A',
    color: '#FFFFFF',
    fontSize: 30,
    padding: 10,
    textAlign: 'right',
  },
  descriptionInput: {
    height: 40,
    borderColor: '#29144A',
    borderWidth: 1,
    margin: 10,
    color: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20, 
    borderRadius: 10,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures spacing between buttons horizontally
    padding: 10,
    backgroundColor: '#29144A',
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
