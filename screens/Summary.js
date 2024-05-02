import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { LineChart, Tooltip} from 'react-native-chart-kit';
//import { LineChart, Tooltip } from 'react-native-svg-charts';
import { fetchSavingData } from '../components/FirebaseDatabase';
import { useAuth } from '../components/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';

const App = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [displayedSavings, setDisplayedSavings] = useState(0);
  const [targetSavings, setTargetSavings] = useState(0);
  const [targetTotalSavings, setTargetTotalSavings] = useState(0);
  const [displayedTotalSavings, setDisplayedTotalSavings] = useState(0);
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      data: []
    }]
  });


  const { currentUser } = useAuth();
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

  useEffect(() => {
    // Call fetchDataAndUpdate when the screen mounts or when the fetchDataAndUpdate flag is true
    if (route.params && route.params.fetchDataAndUpdate) {
      fetchDataAndUpdate();
    }
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDataAndUpdate();
      // No cleanup action needed, but you could return a cleanup function if necessary
      return () => {};
      }, [currentUser])
  );

  const [fetchedData, setFetchedData] = useState({ savingEntries: [], totalSaved: 0 });
  const fetchDataAndUpdate = () => {
    // Check if currentUser and currentUser.uid exist before proceeding
    if (currentUser && currentUser.uid) {
      // Fetch saving data from the database using the user's UID
      fetchSavingData(currentUser.uid)
        .then((data) => {
          // Update the state with the fetched saving data
          //const entriesArray = Object.values(data.savingEntries || {});
          setFetchedData({ savingEntries: data.savingEntries, totalSaved: data.totalSaved || 0 });
          setFetchedData(data);
          setTargetTotalSavings(data.totalSaved);
          //console.log("updated data:", data.savingEntries)
          //console.log("Updated totalSaved:", data.totalSaved);
        })
        .catch((error) => {
          console.error('Error fetching saving data:', error);
        });
    } else {
      console.log('User is not logged in');

    }
  };

  //useEffect(() => {
      //loadData(timePeriod, periodIndex);
      // const weeklySaving = calculateTotalSavingForWeek();
      // const yearlySaving = calculateTotalSavingForYear();
      // if (timePeriod === 'Week') {
          // setTargetSavings(weeklySaving);
      // } else if (timePeriod === 'Year') {
          //setTargetSavings(yearlySaving);
      // }
  //}, [timePeriod, periodIndex, fetchedData]);

  useEffect(() => {
    fetchDataAndUpdate();
  }, [currentUser]);

  useEffect(() => {
    setDisplayedTotalSavings(0);
    const increment = targetTotalSavings / 20;
    const intervalId = setInterval(() => {
      setDisplayedTotalSavings(currentSavings => {
        const newSavings = currentSavings + increment;
        if (newSavings < targetTotalSavings) {
          return newSavings;
        } else {
          clearInterval(intervalId);
          return targetTotalSavings;
        }
      });
    }, 5);
    return () => clearInterval(intervalId);
  }, [targetTotalSavings]);

  useEffect(() => {
    setDisplayedSavings(0);
    const increment = targetSavings / 10;
    const intervalId = setInterval(() => {
      setDisplayedSavings(currentSavings => {
        const newSavings = currentSavings + increment;
        if (newSavings < targetSavings) {
          return newSavings;
        } else {
          clearInterval(intervalId);
          return targetSavings;
        }
      });
    }, 5);
    return () => clearInterval(intervalId);
  }, [targetSavings]);



  const [timePeriod, setTimePeriod] = useState('Week'); // 'Week', 'Month', 'Year'
  const [periodIndex, setPeriodIndex] = useState(0);

  const updatePeriodAndIndex = (newPeriod) => {
    // const now = new Date();
    const today = new Date();
    console.log("today", today);
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    console.log("now", now);
    let newIndex = 0;

    switch (newPeriod) {
      case 'Week':
        // const startOfYear = new Date(now.getFullYear(), 0, 1);
        // const currentDayOfYear = Math.ceil((now - startOfYear) / (24 * 3600 * 1000));
        // newIndex = Math.ceil(currentDayOfYear / 7);
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const dayOfStartOfYear = startOfYear.getDay();
        const daysSinceStartOfYear = Math.floor((now - startOfYear) / (24 * 3600 * 1000)) + 1;
        let adjustedDayOfStart = dayOfStartOfYear === 0 ? 6 : dayOfStartOfYear - 1;
        const adjustedDaysSinceStartOfYear = daysSinceStartOfYear + adjustedDayOfStart;
        // newIndex = Math.floor((adjustedDaysSinceStartOfYear - 1) / 7) + 1;'
        newIndex = 0;
        const startOfWeek = startOfYear.getDay();
        break;
      //case 'Year':
        //newIndex = parseInt(now.getFullYear() * 100 + (now.getMonth() + 1));
        //break;
      case 'Year':
        newIndex = now.getFullYear();
        break;
      default:
        console.error("Invalid time period:", newPeriod);
        return; // Early exit if the period is not handled
    }
    setTimePeriod(newPeriod);
    setPeriodIndex(newIndex);
    loadData(newPeriod, newIndex);

  };

  useEffect(() => {
    loadData(timePeriod, periodIndex);
    //calculateAndUpdateTargetSavings(timePeriod, periodIndex);
  }, [timePeriod, periodIndex, fetchedData]);

  useEffect(() => {
    calculateAndUpdateTargetSavings(timePeriod, periodIndex);
  }, [data]);

  const loadData = (period, index) => {
      setLoading(true);
      let labels = [];
      let data = [];
      const today = new Date();
      console.log("Today's date:", today);
      switch (period) {
        case 'Week':
          let startOfWeek = new Date(today);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + (startOfWeek.getDay() === 0 ? -6 : 1));
          // console.log("Start of this week:", startOfWeek);
          // startOfWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
          startOfWeek.setDate(startOfWeek.getDate() - 7 * index);
          // console.log("Start of the calculated week:", startOfWeek);
          labels = Array.from({ length: 7 }, (_, i) => {
            // const day = new Date(startOfWeek);
            let day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            // console.log('Day ${i}:', day.toISOString().slice(0, 10));
            //return `${day.getDate()}/${day.getMonth() + 1}`;
            //const formattedDate = `${day.getMonth() + 1}-${day.getDate()}`;
            return day.toISOString().slice(0, 10);
            //return formattedDate
          });
          labels_display = Array.from({ length: 7 }, (_, i) => {
            // const day = new Date(startOfWeek);
            let day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            // console.log('Day ${i}:', day.toISOString().slice(0, 10));
            //return `${day.getDate()}/${day.getMonth() + 1}`;
            const formattedDate = `${day.getMonth() + 1}-${day.getDate()}`;
            return formattedDate
          });
          // console.log("Labels:", labels);
          // console.log("test for data", fetchedData.savingEntries);
          const savingEntriesArray = Object.values(fetchedData.savingEntries);
          // console.log("test for array", savingEntriesArray);
          data = labels.map(label => {

            const totalAmount = savingEntriesArray.reduce((total, entry) => {
              const entryDate = new Date(entry.date).toISOString().slice(0, 10);
              if (entryDate === label) {
                // console.log("date_equal", label);
                // console.log("total value", total);
                // console.log("parse", entry.moneyAdded);
                return total + parseFloat(entry.moneyAdded);
              } else {
                // console.log("date1",entryDate);
                // console.log("date2",label);
                return total;
              }
            }, 0);
            console.log("amount", totalAmount);
            return totalAmount;
          });
          //const weeklySaving = calculateTotalSavingForWeek();
          //setTargetSavings(weeklySaving);
          //count = 7
          break;
        // case 'Month':
          // labels =  [1, 6, 11, 16, 21, 26];
          // labels_display =  ["Day 1", "Day 6", "Day 11", "Day 16", "Day 21", "Day 26"];
          // const savingEntriesArray = Object.values(fetchedData.savingEntries);
          // const monthDate = new Date(now.getFullYear(), now.getMonth() - index, 1);
          //
          //count = 7
          //break;
        case 'Year':
          const now = new Date();
          const startOfYear = new Date(index, 0, 1);
          //const startOfYear = now.day.toISOString().slice(0, 10);
          console.log("get year", startOfYear)
          console.log("test for year", fetchedData.savingEntries);
          for (let i = 0; i < 12; i++) {
            const monthDate = new Date(startOfYear.getFullYear(), startOfYear.getMonth() + i, 1);
            const formattedMonth = monthDate.toLocaleString('default', { month: 'short' }); // Get month abbreviation
            labels.push(formattedMonth);
            labels_display =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                // Calculate total amount for each month from database entries
            const savingEntriesArray = Object.values(fetchedData.savingEntries);
            const totalAmount = savingEntriesArray.reduce((total, entry) => {
              const entryDate = new Date(entry.date);
              if (entryDate.getFullYear() === monthDate.getFullYear() && entryDate.getMonth() === monthDate.getMonth()) {

                return total + parseFloat(entry.moneyAdded);

              } else {
                // console.log("month1",entryDate.getFullYear());
                // console.log("date2",monthDate.getFullYear());
                return total;
              }
            }, 0);
            data.push(totalAmount);
          }
          //const yearlySaving = calculateTotalSavingForYear();
          //setTargetSavings(yearlySaving);
          //const yearDate = new Date(now.getFullYear() - index, 0, 1);
          //labels =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          //count = 12
          break;
        default:
          console.error("Invalid time period:", period);
          setLoading(false);
          return;
      }

      setData({
        labels: labels_display,
        datasets: [{
          data: data,
          label: "Savings over time",
          fill: false

          //data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 100))
        }]
      });
      console.log(`Data set for chart: `, data); // Log final data set for the chart
      setLoading(false);
  };

  const handleNext = () => {

    setPeriodIndex(periodIndex + 1);

  };

  const handlePrevious = () => {

    setPeriodIndex(Math.max(0, periodIndex - 1));

  };

  const calculateTotalSavingForWeek = () => {
    const weeklyData = data.datasets[0].data;
    const weeklySaving = weeklyData.reduce((acc, cur) => acc + cur, 0);
    return weeklySaving;
  };
  const calculateTotalSavingForYear = () => {
    const yearlyData = data.datasets[0].data;
    const yearlySaving = yearlyData.reduce((acc, cur) => acc + cur, 0);
    return yearlySaving;
  };
  const calculateAndUpdateTargetSavings = (period, index) => {
    const weeklySaving = calculateTotalSavingForWeek();
    const yearlySaving = calculateTotalSavingForYear();
    if (period === 'Week') {
      setTargetSavings(weeklySaving);
    } else if (period === 'Year') {
      setTargetSavings(yearlySaving);
    }
  };

  const topButtonStyle = {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  };

  const topButtonText = {
    color: '#2d144b',
    fontSize: 14,
  };

  const activeButton = {
    flex: 1,
    backgroundColor: '#603a6b',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  };

  const activeButtonText = {
    color: '#fff',
    fontSize: 14,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.timePeriodSelector}>
          <TouchableOpacity style={timePeriod === 'Week' ? activeButton : topButtonStyle} 
          onPress={() => updatePeriodAndIndex('Week')}>
            <Text style={timePeriod === 'Week' ? activeButtonText : topButtonText}>Weekly</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.topbuttonStyle} onPress={() => updatePeriodAndIndex('Month')}>
            <Text style={styles.topbuttonText}>Monthly</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity style={timePeriod === 'Year' ? activeButton : topButtonStyle}  onPress={() => updatePeriodAndIndex('Year')}>
            <Text style={timePeriod === 'Year' ? activeButtonText : topButtonText}>Annually</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePrevious}>
          <Text style={styles.buttonText}>&lt;</Text>
          </TouchableOpacity>
          {timePeriod === 'Week' ? (
            <Text style={styles.periodText}>{periodIndex} week ago</Text>
          ) : (
            <Text style={styles.periodText}>{periodIndex}</Text>
          )}
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNext}>
          <Text style={styles.buttonText}>&gt;</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Loading chart data...</Text>
      ) : (

        <LineChart
            data={data}
            width={Dimensions.get('window').width - 20}
            height={Dimensions.get('window').height / 3}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}

        />

      )}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>TOTAL SAVING THIS PERIOD</Text>
        <Animated.Text style={styles.savingsAmount}>
          ${displayedSavings.toFixed(2)}
        </Animated.Text>
      </View>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>TOTAL SAVING IN THIS APP</Text>
        <Animated.Text style={styles.savingsAmount}>
          ${displayedTotalSavings.toFixed(2)}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2d144b',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timePeriodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  handlePrevious:{
    color: '#c5b982',
  },
  periodText: {
    fontSize: 16,
    color: '#2d144b',
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 10,
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  summaryBox: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    color: '#2d144b',
    fontSize: 16,
    marginTop: 10,
  },
  savingsAmount: {
    color: '#2d144b',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 18,
  },
});
const chartConfig = {
  backgroundColor: '#eb6c9c',
  backgroundGradientFrom: '#eb6c9c',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#603a6b'
  }
};

export default App;