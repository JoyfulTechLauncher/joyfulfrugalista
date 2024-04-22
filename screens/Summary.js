import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const App = () => {
  const [timePeriod, setTimePeriod] = useState('Week'); // 'Week', 'Month', 'Year'
  const [periodIndex, setPeriodIndex] = useState(1);
  const [loading, setLoading] = useState(true); 
  const targetSavings = 88.88; // show savings
  const [displayedSavings, setDisplayedSavings] = useState(0);
  const targetTotalSavings = 1088.98; // show total savings
  const [displayedTotalSavings, setDisplayedTotalSavings] = useState(0);
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      data: []
    }]
  });

  useEffect(() => {
    setDisplayedSavings(0);
    const increment = targetSavings / 30;
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
    }, 10);
    return () => clearInterval(intervalId);
  }, [targetSavings]);

  useEffect(() => {
    setDisplayedTotalSavings(0);
    const increment = targetTotalSavings / 60;
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
    }, 10);
    return () => clearInterval(intervalId);
  }, [targetTotalSavings]);

  const loadData = (period, index) => {
    setLoading(true); 
    let labels = [];
    let count = 0;
    switch (period) {
      case 'Week':
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        count = 7;
        break;
      case 'Month':
        labels = ["Day 1", "Day 6", "Day 11", "Mid", "Day 21", "Day 26", "End"];
        count = 7;
        break;
      case 'Year':
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        count = 12;
        break;
      default:
        console.error("Invalid time period:", period);
        return;
    }
    setData({
      labels: labels,
      datasets: [{
        data: Array.from({ length: count }, () => Math.floor(Math.random() * 100))
      }]
    });
    setLoading(false); 
  };

  useEffect(() => {
    loadData(timePeriod, periodIndex);
  }, [timePeriod, periodIndex]);

  const handlePrevious = () => {
    setPeriodIndex(Math.max(1, periodIndex - 1));
  };

  const handleNext = () => {
    setPeriodIndex(periodIndex + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.timePeriodSelector}>
          <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('Week')}>
            <Text style={styles.topbuttonText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('Month')}>
            <Text style={styles.topbuttonText}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('Year')}>
            <Text style={styles.topbuttonText}>Annually</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePrevious}>
          <Text style={styles.buttonText}>&lt;</Text>
          </TouchableOpacity>
        <Text style={styles.periodText}>{timePeriod} {periodIndex}</Text>
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
    color: '#f2c875',
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 10,
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  topbuttonStyle: {
    backgroundColor: '#603a6b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  topbuttonText: {
    color: '#fff',
    fontSize: 16,
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
