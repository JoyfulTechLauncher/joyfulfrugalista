import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Alert, Modal, Platform, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import CategoryButton from '../components/categoryButton';
import CalculatorButton from '../components/calculatorButton';
import { useAuth } from '../components/AuthContext';
import { addEntryToDatabase } from '../components/FirebaseDatabase';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [description, setDescription] = useState(''); // new state for description input
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };


  const handleButtonPress = (value) => {
    if (value === 'Back') {
      setInputValue(inputValue.slice(0, -1) || '0');
    }
    else if (value === 'Date') {
      if (Platform.OS === 'ios') {
        toggleDatePicker(); // 对于 iOS，显示模态
      } else {
        showDatepicker(); // 对于安卓，直接显示选择器
      }
    }
    else if (value === 'Done') {
      let result = inputValue;
      if (operator && previousValue !== null) {
        result = calculate(parseFloat(previousValue), parseFloat(inputValue), operator);
        setPreviousValue(null);
        setOperator(null);
      }
      setInputValue(String(result));
      if (currentUser && currentUser.uid && description.trim()) {
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const categoryToSave = selectedCategory ?? "Others";
        addEntryToDatabase(currentUser.uid, formattedDate, result, categoryToSave, description)
            .then(() => {
              Alert.alert("Added successfully!");
              navigation.goBack();
            })
            .catch((error) => {
              console.error('Error adding data:', error);
              Alert.alert("Error", error.message);
            });
        setSelectedCategory(null);
        setDescription(''); // clear description input
        setShowDatePicker(false);
      }
    }
    else if (['+', '-'].includes(value)) {
      if (operator && previousValue !== null) {
        const result = calculate(parseFloat(previousValue), parseFloat(inputValue), operator);
        setPreviousValue(String(result));
        setInputValue('0');
        setOperator(value);
      } else {
        setShowDatePicker(false);
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
        return b;
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
    setSelectedCategory(category);
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
        {/* Scroll view for content */}
        <ScrollView style={styles.scrollView}>
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

          <View style={styles.inputContainer}>
            {/* Display for the input value */}
            <Text style={styles.inputDisplay}>{inputValue}</Text>
            {/* Description input */}
            <TextInput style={styles.descriptionInput} placeholder="Description" value={description} onChangeText={setDescription} />
          </View>
          <SafeAreaView style={styles.keypadContainer}>
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
          </SafeAreaView>
        </ScrollView>

        {/* iOS DatePicker Modal */}
        {Platform.OS === 'ios' && (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDatePickerVisible}
                onRequestClose={toggleDatePicker}>
              <View style={styles.centeredModalView}>
                <View style={styles.modalView}>
                  <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={onDateChange}
                  />
                  <TouchableOpacity
                      style={styles.doneButton}
                      onPress={toggleDatePicker}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        )}

        {/* Android DateTimePicker */}
        {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
            />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0', // Change this to your preferred button color
    padding: 10,
  },
  doneButtonText: {
    color: '#000', // Change this to your preferred button text color
  },
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
  inputContainer: {
    backgroundColor: '#29144A',
  },
  inputDisplay: {
    backgroundColor: '#29144A',
    color: '#F6E9DC',
    fontSize: 30,
    paddingTop: 10,
    paddingRight: 20,
    textAlign: 'right',
  },
  descriptionInput: {
    height: 40,
    borderColor: '#29144A',
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#F6E9DC',
    color: '#29144A',
    padding: 5,
    marginHorizontal: 10, 
    borderRadius: 10,
  },
  keypadContainer: {
    backgroundColor: '#29144A',
    marginBottom: 0,
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
