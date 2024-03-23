import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, TouchableOpacity, Image} from "react-native";
import React, { useState } from 'react';


function Detail({ navigation }) {

  const [dateIndex, setDateIndex] = useState(0);
  const [dataType, setDataType] = useState('saving'); // 'saving', 'expense', 'income'

  // Function to get today's date in the format: "March 23, 2024"
  const getDate = (dateIndex) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + dateIndex);
    return targetDate.toLocaleDateString(undefined, options);
  };

  // Button color and data changes
  const handleDataChange = (data) => {
    setDataType(data);
  };

  const getButtonStyle = (data) => {
    return dataType === data ? styles.activeButton : styles.button;
  };

  const getButtonTextColor = (data) => {
    return dataType === data ? styles.activeButtonText : styles.buttonText;
  };

  const loadData = () => {
    switch (dataType) {
      case 'saving':
        return <Text>Saving Page Content</Text>;
      case 'expense':
        return <Text>Expense Page Content</Text>;
      case 'income':
        return <Text>Income Page Content</Text>;
      default:
        return null;
    }
  };

  // Date navigation
  const handlePrevious = () => {
    setDateIndex(dateIndex - 1);
  };

  const handleNext = () => {
    setDateIndex(dateIndex + 1);
  };


  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
        <Text style={styles.navButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{getDate(dateIndex)}</Text>
      <TouchableOpacity onPress={handleNext} style={styles.navButton}>
        <Text style={styles.navButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.mainButtons}>
      <TouchableOpacity onPress={() => {handleDataChange('saving')}} style={getButtonStyle('saving')}>
        <Text style={getButtonTextColor('saving')}>Saving</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {handleDataChange('expense')}} style={getButtonStyle('expense')}>
        <Text style={getButtonTextColor('expense')}>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {handleDataChange('income')}} style={getButtonStyle('income')}>
        <Text style={getButtonTextColor('income')}>Income</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.content}>
        {loadData()}
      </View>
    <TouchableOpacity onPress={() => navigation.navigate('AddPage')} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#2d144b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#fff',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#603a6b',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#2d144b',
  },
  mainButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20
  },
  activeButton: {
    flex: 1,
    backgroundColor: '#603a6b',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  },
  activeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  },
  buttonText: {
    color: '#2d144b',
    fontSize: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
    marginBottom: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#f2c875',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2d144b',
    fontSize: 30,
  }
});

export default Detail;
