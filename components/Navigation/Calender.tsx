import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Calendar , LocaleConfig    } from 'react-native-calendars';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Calender() {
    const [data, setData] = useState({}); // State to store calendar data
    const [selectedDate, setSelectedDate] = useState(null); // State to track selected date
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator
    LocaleConfig.locales['fr'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
    };
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    LocaleConfig.defaultLocale = 'fr';

    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Show loading indicator while fetching data
            try {
                const response = await fetch('https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/calendar/');
                const apiData = await response.json();
                setData(apiData); // Process API data for calendar format
                setSelectedDate(today)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Hide loading indicator after fetch is complete
            }
        };

        fetchData();
    }, []);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const generateMarkedDates = () => {
        if (!selectedDate) {
          return {}; // Return empty object if no selected date
        }
    
        return {
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true, // Optional: Prevent re-selecting the same date
            selectedColor: 'red', // Your desired color for the selected date
          },
        };
    };

    

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Display loading indicator
            ) : (
                <Calendar
                    style={styles.calendar}
                    markedDates={generateMarkedDates()}
                    onDayPress={onDayPress}
                    locale={'fr'}
                    theme={{
                        calendarBackground: '#ffffff',
                        dayTextColor: 'black',
                        selectedDayTextColor: 'white',
                        selectedDayBackgroundColor: 'red',
                        todayTextColor:"white",
                        todayBackgroundColor:"black",          
                    }}
                />
            )}

            {selectedDate && (
                <View style={{ display: "flex", flexDirection: "column" }}>
                    {data[selectedDate].map((name, index) => (
                        <Text key={index} style={styles.selectedDateText}>
                            {name}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:8,
        width: Width * 0.8,
        height: Height-64,

    },
    calendar: {
        width: Width * 0.8,
        height: Width * 0.8,
    },
    selectedDateText: {
        marginTop: 20,
        fontSize: 18,
    },
});