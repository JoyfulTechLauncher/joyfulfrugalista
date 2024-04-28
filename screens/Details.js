import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, TouchableOpacity, Image, Platform} from "react-native";
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

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

  const monthlyBudget = 1000; // Example monthly budget
  const currentExpenses = 750; // Example current expenses

  // Calculate the progress (percentage of expenses relative to budget)
  const progress = currentExpenses / monthlyBudget;

  const loadData = () => {
    switch (dataType) {
      case 'saving':
        return (
          <View>
            <View style={styles.board}>
              <Text style={styles.boardLabel}>You have saved</Text>
              <Text style={styles.amount}>$300</Text>
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.dataContainer}>
                <Text style={styles.dateText}>{getDate(0)}</Text>
                <View style={styles.data}>
                  <Image source={require('../assets/housing.png')} style={styles.dataIcon}/>
                  <View style={styles.dataText}>
                    <Text style={styles.dataLabel}>Description</Text>
                    <Text style={styles.dataAmount}>$30</Text>
                  </View>
                </View>
                <View style={styles.data}>
                  <Image source={require('../assets/food.png')} style={styles.dataIcon}/>
                  <View style={styles.dataText}>
                    <Text style={styles.dataLabel}>Description</Text>
                    <Text style={styles.dataAmount}>$40</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      case 'expense':
        return (
          <View>
          <View style={styles.board}>
              <Text style={styles.boardLabel}>You have spent</Text>
              <Text style={styles.amount}>$350</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.dataContainer}>
              <Text style={styles.dateText}>{getDate(0)}</Text>
              <View style={styles.data}>
                <Image source={require('../assets/education.png')} style={styles.dataIcon}/>
                <View style={styles.dataText}>
                  <Text style={styles.dataLabel}>Description</Text>
                  <Text style={styles.dataAmount}>$500</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        );
      case 'income':
        return (
          <View>
          <View style={styles.board}>
              <Text style={styles.boardLabel}>You have earned</Text>
              <Text style={styles.amount}>$1400</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.dataContainer}>
              <Text style={styles.dateText}>{getDate(0)}</Text>
              <View style={styles.data}>
                <Image source={require('../assets/household.png')} style={styles.dataIcon}/>
                <View style={styles.dataText}>
                  <Text style={styles.dataLabel}>Description</Text>
                  <Text style={styles.dataAmount}>$800</Text>
                </View>
              </View>
              <View style={styles.data}>
                <Image source={require('../assets/education.png')} style={styles.dataIcon}/>
                <View style={styles.dataText}>
                  <Text style={styles.dataLabel}>Description</Text>
                  <Text style={styles.dataAmount}>$900</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        );
      default:
        return null;
    }
  };

  // Date navigation
  const handlePrevious = () => {
    setDateIndex(dateIndex - 1);
  };

  const handleNext = () => {
    setDateIndex(Math.min(0, dateIndex + 1));
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
    <TouchableOpacity onPress={() => navigation.navigate("MyStack", { screen: "AddPage" })} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
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
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: '#603a6b',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2c875',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2d144b',
    fontSize: 30,
  },
  board: {
    backgroundColor: '#f2c875',
    padding: 5,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    height: 120,
  },
  boardLabel: {
    color: '#2d144b',
    lineHeight: 50,
  },
  amount: {
    color: '#2d144b',
    lineHeight: 35,
    fontSize: 30,
    fontWeight: 'bold',
  },
  dataContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  data: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F1EBF2',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    height: 50,
  },
  dataIcon: {
    height: 30,
    width: 30,
    margin: 10,
  },
  dataText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataLabel: {
    color: '#2d144b',
    fontSize: 15,
  },
  dataAmount: {
    color: '#2d144b',
    fontSize: 15,
    
  }
});

export default Detail;
