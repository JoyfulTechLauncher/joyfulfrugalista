import { StyleSheet,View, Text, TouchableOpacity, Image, Platform} from "react-native";
import React, { useState, useEffect  } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchSavingData } from '../components/FirebaseDatabase';
import { useAuth } from '../components/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

function Detail({ navigation }) {

  const route = useRoute();
  const [dateIndex, setDateIndex] = useState(0);
  const [dataType, setDataType] = useState('saving'); // 'saving', 'expense', 'income'
  const { currentUser } = useAuth();
  const [fetchedData, setFetchedData] = useState({ savingEntries: [], totalSaved: 0 });
  const [totalSavingAmount, setTotalSavingAmount] = useState(0);
  const [dailySavingAmount, setDailySavingAmount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);


  // Function to get today's date in the format: "March 23, 2024"
  const getDate = (dateIndex) => {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + dateIndex);

    // Get year, month, and day components from the target date
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1; 
    const day = targetDate.getDate();

    // Format the date components with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    // Return the formatted date string in the "yyyy-mm-dd" format
    return `${year}-${formattedMonth}-${formattedDay}`;
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

  // Date navigation
  const handlePrevious = () => {
    setDateIndex(dateIndex - 1);
    fetchDataAndUpdate();
  };

  const handleNext = () => {
    const today = new Date(); 
      const nextDate = new Date(getDate(dateIndex + 1)); 
      if (nextDate <= today) { 
      setDateIndex(dateIndex + 1); 
      fetchDataAndUpdate(); 
    }
  };
  
  useEffect(() => {
    if (!isMounted) {
      setDateIndex(0);
      setIsMounted(true);
      fetchDataAndUpdate();
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      fetchDataAndUpdate();
    }
    // Call fetchDataAndUpdate when the screen mounts or when the fetchDataAndUpdate flag is true
    if (route.params && route.params.fetchDataAndUpdate) {
      fetchDataAndUpdate();
    }
  }, [route.params, dateIndex]);

  useFocusEffect(
      React.useCallback(() => {
        fetchDataAndUpdate();
        // No cleanup action needed, but you could return a cleanup function if necessary
        return () => {};
      }, [currentUser])
  );

  const fetchDataAndUpdate = () => {
    // Check if currentUser and currentUser.uid exist before proceeding
    if (currentUser && currentUser.uid) {
      // Fetch saving data from the database using the user's UID
      fetchSavingData(currentUser.uid)
        .then((data) => {
          setTotalSavingAmount(data.totalSaved);
          const categorizedData = categorizeSavingEntries(data);
          console.log(categorizedData)
          const currentData = getEntriesForDate(categorizedData, getDate(dateIndex));
          console.log('current data', currentData);
          setDailySavingAmount(calculateDailySavingAmount(currentData));
          console.log('daily saving amount', dailySavingAmount);
          setFetchedData(currentData);
        })
        .catch((error) => {
          console.error('Error fetching saving data:', error);
        });
    } else {
      console.log('User is not logged in');
      
    }
  };

    // Function to categorize saving entries by dates
const categorizeSavingEntries = (savingEntries) => {
  const categorizedData = {};
  Object.values(savingEntries.savingEntries).forEach((entry) => {
    const { date } = entry;
    if (categorizedData[date]) {
      categorizedData[date].push(entry);
    } else {
      categorizedData[date] = [entry];
    }
  });
  return categorizedData;
};

const formatDateString = (dateString) => {
  const [year, month, day] = dateString.split('-').map((component) => parseInt(component));
  const formattedMonth = month.toString();
  const formattedDay = day.toString();
  return `${year}-${formattedMonth}-${formattedDay}`;
};

// Function to get entries for a specific date from categorized data
const getEntriesForDate = (categorizedData, date) => {
  // Check if the date exists as a key in categorizedData
  const reformattedDate = formatDateString(date);

  if (categorizedData[reformattedDate]) {
    console.log('return data', categorizedData[reformattedDate]);
    // If it exists, return the entries for that date
    return categorizedData[reformattedDate];
  } else {
    console.log('no data');
    return [];
  }
};

const calculateDailySavingAmount = (currentData) => {
  let savingAmount = 0;

  // Iterate over each entry in currentData
  currentData.forEach((entry) => {
    const moneyAdded = parseInt(entry.moneyAdded);
    savingAmount += moneyAdded;
  });
  return savingAmount;
};

  const categories = [
    { id: 'Housing', iconName: require('../assets/housing.png'), color: '#D0C6E1' },
    { id: 'Household', iconName: require('../assets/household.png'), color: '#F1EBF2' },
    { id: 'Utilities', iconName: require('../assets/utilities.png'), color: '#C4D3EB' },
    { id: 'Transport', iconName: require('../assets/transport.png'), color: '#D0ECF3' },
    { id: 'Food', iconName: require('../assets/food.png'), color: '#BCE1D6' },
    { id: 'Health', iconName: require('../assets/health.png'), color: '#C5E1BA' },
    { id: 'Education', iconName: require('../assets/education.png'), color: '#F5C4DB' },
    { id: 'Appearance', iconName: require('../assets/appearance.png'), color: '#F7E8E4' },
    { id: 'Lifestyle', iconName: require('../assets/lifestyle.png'), color: '#F4EB85' },
    { id: 'Service Fee', iconName: require('../assets/service fee.png'), color: '#FFD6A1' },
  ];

  // Render the component's UI
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
        <Text style={getButtonTextColor('saving')}>Saving Records</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.content}>
      <View>
          <View style={styles.board}>
            <Text style={styles.boardLabel}>You have saved</Text>
            <Text style={styles.amount}>${totalSavingAmount}</Text>
          </View>
          <View style={styles.subBoard}>
            <Text style={styles.subBoardLabel}>You saved ${dailySavingAmount} today !</Text>
          </View>
        </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.dateTextForData}>{getDate(dateIndex)}</Text>
          {fetchedData ? (
            Object.keys(fetchedData).map((key, index) => {
              const { date, category, moneyAdded, description } = fetchedData[key];
              const categoryInfo = categories.find((item) => item.id === category);
              const displayText = description?.trim() ? `${category}: ${description}` : category;
              if (!categoryInfo) return null; // Skip if category not found
              return(
                <View key={index}>
                <View style={styles.dataContainer}>
                  <View style={[styles.data, { backgroundColor: categoryInfo.color }]}>
                    <Image source={categoryInfo.iconName} style={styles.dataIcon} />
                    <View style={styles.dataText}>
                      <Text style={styles.dataLabel}>{displayText}</Text>
                      <Text style={styles.dataAmount}>${moneyAdded}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      </ScrollView>

      </View>
    <TouchableOpacity onPress={() => navigation.navigate("   ", { screen: "AddPage" })} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    margin: 10,
    marginBottom: 0,
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
  subBoard: {
    backgroundColor: '#2d144b',
    padding: 10,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    alignItems: 'left',
    height: 40,
  },
  subBoardLabel: {
    fontSize: 15,
    color: '#f2c875',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  dataContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateTextForData: {
    fontSize: 15,
    color: '#2d144b',
    margin: 10,
  },
  data: {
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: '#F1EBF2',
    marginTop: 5,
    marginBottom: 5,
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
