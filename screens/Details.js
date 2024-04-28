import { StyleSheet,View, Text, TouchableOpacity, Image, Platform} from "react-native";
import React, { useState, useEffect  } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getDatabase, ref, push, get } from 'firebase/database';
import { useAuth } from '../components/AuthContext';

function Detail({ navigation }) {

  const [dateIndex, setDateIndex] = useState(0);
  const [dataType, setDataType] = useState('saving'); // 'saving', 'expense', 'income'
  const { currentUser } = useAuth();
  const [fetchedData, setFetchedData] = useState(null);

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

  // Date navigation
  const handlePrevious = () => {
    setDateIndex(dateIndex - 1);
  };

  const handleNext = () => {
    setDateIndex(Math.min(0, dateIndex + 1));
  };
  const monthlyBudget = 1000; // Example monthly budget
  const currentExpenses = 750; // Example current expenses

  // Calculate the progress (percentage of expenses relative to budget)
  const progress = currentExpenses / monthlyBudget;

  const fetchSavingData = (uid) => {
    const database = getDatabase();
    const userAddInfoRef = ref(database, `addInfo/${uid}`);
  
    // Fetch data from Firebase
    return new Promise((resolve, reject) => {
      get(userAddInfoRef).then((snapshot) => {
        if (snapshot.exists()) {
          // Data exists, extract and return it
          resolve(snapshot.val());
        } else {
          // Handle case when no data exists
          resolve(null);
        }
      }).catch((error) => {
        // Handle error while fetching data
        console.error('Error fetching data from database:', error);
        reject(error);
      });
    });
  };

  useEffect(() => {
    // Check if the user is logged in and has a valid UID
    if (currentUser) {
      // Fetch data from Firebase
      fetchSavingData(currentUser.uid)
        .then((data) => {
          setFetchedData(data);
          console.log( 'Data fetched from database:', data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [currentUser]);

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
            <Text style={styles.amount}>$300</Text>
          </View>
        </View>
      <ScrollView style={styles.scrollView}>
        <View>
          {fetchedData ? (
            Object.keys(fetchedData).map((key, index) => {
              const { date, category, moneyAdded } = fetchedData[key];
              const categoryInfo = categories.find((item) => item.id === category);
              if (!categoryInfo) return null; // Skip if category not found
              return(
                <View key={index}>
                <View style={styles.dataContainer}>
                  <Text style={styles.dateText}>{date}</Text>
                  <View style={[styles.data, { backgroundColor: categoryInfo.color }]}>
                    <Image source={categoryInfo.iconName} style={styles.dataIcon} />
                    <View style={styles.dataText}>
                      <Text style={styles.dataLabel}>Description</Text>
                      <Text style={styles.dataAmount}>{moneyAdded}</Text>
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
    <TouchableOpacity onPress={() => navigation.navigate("Back", { screen: "AddPage" })} style={styles.addButton}>
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
