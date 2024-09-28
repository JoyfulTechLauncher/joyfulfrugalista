import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, Alert, Platform } from "react-native";
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchSavingData, updateEntryInDatabase } from '../components/FirebaseDatabase';
import { useAuth } from '../components/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { categories } from '../screens/addPage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteEntryFromDatabase } from '../components/FirebaseDatabase';


function Detail({ navigation }) {
  const route = useRoute();
  const [dateIndex, setDateIndex] = useState(0);
  const [dataType, setDataType] = useState("saving"); // 'saving', 'expense', 'income'
  const { currentUser } = useAuth();
  const [fetchedData, setFetchedData] = useState({
    savingEntries: [],
    totalSaved: 0,
  });
  const [totalSavingAmount, setTotalSavingAmount] = useState(0);
  const [dailySavingAmount, setDailySavingAmount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // 新增状态变量
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editingDate, setEditingDate] = useState(new Date());
  const [editingMoneyAdded, setEditingMoneyAdded] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to get today's date in the format: "yyyy-mm-dd"
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
      setDateIndex(0);
      fetchDataAndUpdate();
    }
  }, [route.params, dateIndex]);

  useFocusEffect(
      React.useCallback(() => {
        setDateIndex(0);
        fetchDataAndUpdate();
        // No cleanup action needed, but you could return a cleanup function if necessary
        return () => { };
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
            setDailySavingAmount(calculateDailySavingAmount(currentData));
            setFetchedData(currentData);
          })
          .catch((error) => {
            console.error("Error fetching saving data:", error);
          });
    } else {
      console.log('User is not logged in');
    }
  };

  // Function to categorize saving entries by dates
  const categorizeSavingEntries = (savingEntries) => {
    const categorizedData = {};
    Object.entries(savingEntries.savingEntries).forEach(([entryId, entry]) => {
      const { date } = entry;
      if (categorizedData[date]) {
        categorizedData[date].push({ ...entry, id: entryId });
      } else {
        categorizedData[date] = [{ ...entry, id: entryId }];
      }
    });
    return categorizedData;
  };

  const formatDateString = (dateString) => dateString;


  // Function to get entries for a specific date from categorized data
  const getEntriesForDate = (categorizedData, date) => {
    if (categorizedData[date]) {
      return categorizedData[date];
    } else {
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

  // 点击记录，弹出编辑弹窗
  const handleRecordPress = (entry) => {
    setEditingEntryId(entry.id);
    setEditingDate(new Date(entry.date));
    setEditingMoneyAdded(entry.moneyAdded.toString());
    setEditingCategory(entry.category);
    setEditingDescription(entry.description);
    setIsModalVisible(true);
  };

  // 保存修改
  const handleSaveChanges = () => {
    if (!editingEntryId) return;

    const updatedData = {
      date: formatDateForDatabase(editingDate),
      moneyAdded: editingMoneyAdded.toString(),  // 确保 moneyAdded 以字符串格式存储
      category: editingCategory,
      description: editingDescription,
    };

    updateEntryInDatabase(currentUser.uid, editingEntryId, updatedData)
        .then(() => {
          Alert.alert("Record updated successfully!");
          setIsModalVisible(false);
          fetchDataAndUpdate();
        })
        .catch((error) => {
          console.error('Error updating record:', error);
          Alert.alert("Error", error.message);
        });
  };

  const formatDateForDatabase = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  // 删除记录的函数
  const handleDeleteRecord = () => {
    if (!editingEntryId) return;

    deleteEntryFromDatabase(currentUser.uid, editingEntryId)
        .then(() => {
          Alert.alert("Record deleted successfully!");
          setIsModalVisible(false);
          fetchDataAndUpdate(); // 重新获取数据并刷新页面
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
          Alert.alert("Error", error.message);
        });
  };


  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || editingDate;
    setShowDatePicker(false);
    setEditingDate(currentDate);
  };

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
          <TouchableOpacity
              onPress={() => {
                handleDataChange("saving");
              }}
              style={getButtonStyle("saving")}
          >
            <Text style={getButtonTextColor("saving")}>Saving Records</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View>
            <View style={styles.board}>
              <Text style={styles.boardLabel}>You have saved</Text>
              <Text style={styles.amount}>${totalSavingAmount}</Text>
            </View>
            <View style={styles.subBoard}>
              <Text style={styles.subBoardLabel}>
                You saved ${dailySavingAmount} today!
              </Text>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.dateTextForData}>{getDate(dateIndex)}</Text>
              {fetchedData && fetchedData.length > 0 ? (
                  fetchedData.map((entry, index) => {
                    const { date, category, moneyAdded, description } = entry;
                    const categoryInfo = categories.find(
                        (item) => item.id === category
                    );
                    const displayText = description?.trim()
                        ? `${category}: ${description}`
                        : category;
                    if (!categoryInfo) return null; // Skip if category not found
                    return (
                        <View key={index}>
                          <TouchableOpacity onPress={() => handleRecordPress(entry)}>
                            <View style={styles.dataContainer}>
                              <View
                                  style={[
                                    styles.data,
                                    { backgroundColor: categoryInfo.color },
                                  ]}
                              >
                                <Image
                                    source={categoryInfo.iconName}
                                    style={styles.dataIcon}
                                />
                                <View style={styles.dataText}>
                                  <Text style={styles.dataLabel}>{displayText}</Text>
                                  <Text style={styles.dataAmount}>${moneyAdded}</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                    );
                  })
              ) : (
                  <Text>No data available</Text>
              )}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
            onPress={() => navigation.navigate("   ", { screen: "AddPage" })}
            style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* 编辑弹窗 */}
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Record</Text>

              {/* 日期选择 */}
              <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                <Text style={styles.datePickerButtonText}>Select Date: {formatDateForDatabase(editingDate)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                  <DateTimePicker
                      value={editingDate}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                  />
              )}

              {/* 金额输入 */}
              <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={editingMoneyAdded}
                  onChangeText={setEditingMoneyAdded}
              />

              {/* 分类选择 */}
              <ScrollView horizontal style={styles.categoryScroll}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          editingCategory === category.id && { borderColor: '#2d144b', borderWidth: 2 },
                        ]}
                        onPress={() => setEditingCategory(category.id)}
                    >
                      <Image source={category.iconName} style={styles.categoryIcon} />
                      <Text style={styles.categoryText}>{category.title}</Text>
                    </TouchableOpacity>
                ))}
              </ScrollView>

              {/* 描述输入 */}
              <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={editingDescription}
                  onChangeText={setEditingDescription}
              />

              {/* 按钮 */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                    onPress={handleDeleteRecord} // 调用删除函数
                    style={styles.deleteButton}
                >
                  <Text style={styles.buttonTextModal}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={styles.cancelButton}
                >
                  <Text style={styles.buttonTextModal}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSaveChanges}
                    style={styles.saveButton}
                >
                  <Text style={styles.buttonTextModal}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d144b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
  },
  navButton: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: "#603a6b",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 15,
    color: "#2d144b",
  },
  mainButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  activeButton: {
    flex: 1,
    backgroundColor: "#603a6b",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 1,
  },
  activeButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 1,
  },
  buttonText: {
    color: "#2d144b",
    fontSize: 15,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 10,
    marginBottom: 0,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f2c875",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#2d144b",
    fontSize: 30,
  },
  board: {
    backgroundColor: "#f2c875",
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 10,
    marginBottom: 0,
    alignItems: "center",
    height: 120,
  },
  boardLabel: {
    color: "#2d144b",
    lineHeight: 50,
  },
  amount: {
    color: "#2d144b",
    lineHeight: 35,
    fontSize: 30,
    fontWeight: "bold",
  },
  subBoard: {
    backgroundColor: "#2d144b",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 10,
    alignItems: "left",
    height: 40,
  },
  subBoardLabel: {
    fontSize: 15,
    color: "#f2c875",
    marginLeft: 10,
    fontWeight: "bold",
  },
  dataContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dateTextForData: {
    fontSize: 15,
    color: "#2d144b",
    margin: 10,
  },
  data: {
    alignItems: "center",
    flexDirection: "row",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataLabel: {
    color: "#2d144b",
    fontSize: 15,
  },
  dataAmount: {
    color: "#2d144b",
    fontSize: 15,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: "#2d144b",
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#2d144b',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#f2c875',
    borderRadius: 5,
    marginVertical: 5,
  },
  datePickerButtonText: {
    color: '#2d144b',
    textAlign: 'center',
  },
  categoryScroll: {
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 12,
    color: '#2d144b',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#2d144b',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonTextModal: {
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },

});

export default Detail;
