import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity,Dimensions, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const App = () => {
  // 当前查看的时间段类型和时间段索引（比如第几周、第几月、哪一年）
  const [timePeriod, setTimePeriod] = useState('weekly'); // 'weekly', 'monthly', 'annually'
  const [periodIndex, setPeriodIndex] = useState(1);
  const targetSavings = 88.88; // 展示储蓄金额
  const [displayedSavings, setDisplayedSavings] = useState(0); 
  const targetTotalSavings = 1088.98; // 展示所有储蓄金额
  const [displayedTotalSavings, setDisplayedTotalSavings] = useState(0); 

  useEffect(() => {
    // 每次当目标储蓄金额变化时，从0开始
    setDisplayedSavings(0);

    const increment = targetSavings / 30; // 计算每步增加的量
    const intervalId = setInterval(() => {
      setDisplayedSavings(currentSavings => {
        const newSavings = currentSavings + increment;
        if (newSavings < targetSavings) {
          return newSavings;
        } else {
          clearInterval(intervalId); // 停止定时器
          return targetSavings; // 直接设置为目标值以避免超过
        }
      });
    }, 10); // 每20毫秒更新一次

    // 清理函数，防止内存泄漏
    return () => clearInterval(intervalId);
  }, [targetSavings]); // 依赖于目标储蓄金额

  useEffect(() => {
    // 每次当目标储蓄金额变化时，从0开始
    setDisplayedTotalSavings(0);

    const increment = targetTotalSavings / 60; // 计算每步增加的量
    const intervalId = setInterval(() => {
      setDisplayedTotalSavings(currentSavings => {
        const newSavings = currentSavings + increment;
        if (newSavings < targetTotalSavings) {
          return newSavings;
        } else {
          clearInterval(intervalId); // 停止定时器
          return targetTotalSavings; // 直接设置为目标值以避免超过
        }
      });
    }, 10); // 每20毫秒更新一次

    // 清理函数，防止内存泄漏
    return () => clearInterval(intervalId);
  }, [targetTotalSavings]); // 依赖于目标储蓄金额

  
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      data: []
    }]
  });

  const generateRandomData = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
  };
  // 修改月标签逻辑，只显示每5天的标签
const labels = Array.from({ length: 6 }, (_, i) => `${i * 5 + 1}`);


  // 模拟加载数据的函数
  const loadData = (period, index) => {
    let labels = [];
    let count = 0;
    switch (period) {
      case 'weekly':
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        count = 7;
        break;
      case 'monthly':
        labels = ["Day 1", "Day 6", "Day 11", "Mid", "Day 21", "Day 26", "End"];
        count = 7;
        break;
      case 'annually':
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        count = 12;
        break;
      default:
        break;
    }
    setData({
      labels: labels,
      datasets: [{
        data: generateRandomData(count)
      }]
    });
  };

  // 初始化加载默认数据
  React.useEffect(() => {
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
        <Text style={styles.headerText}>Summary</Text>

      <View style={styles.timePeriodSelector}>
        <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('weekly')}>
          <Text style={styles.topbuttonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('monthly')}>
          <Text style={styles.topbuttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttonStyle} onPress={() => setTimePeriod('annually')}>
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
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={Dimensions.get('window').height/3 }
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
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
    backgroundColor: '#603a6b', // 按钮背景色
    paddingHorizontal: 20, // 水平内间距
    paddingVertical: 10, // 垂直内间距
    borderRadius: 5, // 圆角
    justifyContent: 'center', // 内部文本居中
    alignItems: 'center',
    marginHorizontal: 15, // 添加一些水平外间距
  },
  topbuttonText: {
    color: '#fff', // 文本颜色
    fontSize: 16, // 文本大小
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
  decimalPlaces: 2, // optional, defaults to 2dp
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
