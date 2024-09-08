import React from 'react';
import { Dimensions, Text, Alert, BackHandler, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';


const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Calender() {

    const numbers = [1, 2, 3, 4, 5, 6, 7,];
    const numberssecond = [8, 9, 10, 11, 12, 13, 14];
    const numbersthird = [15, 16, 17, 18, 19, 20, 21];
    const numbersfour = [22, 23, 24, 25, 26, 27, 28];
    const numbersfive = [29, 30, 31];

    const day = ["일", "월", "화", "수", "목", "금", "토"];
    
    const [date, setdate] = useState(new Date());
    const formattedDate = date.toLocaleDateString()
    const dateArray = formattedDate.split('/'); 
    const today = dateArray[1];
    
    return (
        <View style={{
            display: "flex", flexDirection: "column", width: Width * 0.8, height: Height, justifyContent: "flex-start", alignItems: "center",
            backgroundColor: "#FFFFFF"
        }}>
            <Text style={{ marginBottom: 50, marginTop: 50, color: "black", fontSize: 30, fontWeight: 700 }}> 9월 </Text>

            <View style={styles.container}>
                {day.map((number, index) => (
                    <View key={index} style={styles.daysContainer}>
                        {number === "일" ?
                            <Text style = {{ color:"#FF0000" }}>
                                {number}                                
                            </Text>
                            :
                            number === "토" ?
                            <Text style={{ color:"blue" }}>
                                {number}
                            </Text>
                            :
                            <Text style={styles.number}>
                                {number}
                            </Text>
                        }
                    </View>
                ))}
            </View>


            <View style={styles.container}>
                {numbers.map((number, index) => (
                    <View key={index} style={styles.numberContainer}>
                        {Number(today) === number ? 
                        <Text style={{ color:"red"}}>
                            {number}
                        </Text>
                            :
                        <Text style={styles.number}>
                            {number}
                        </Text>
                        }
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                {numberssecond.map((number, index) => (
                    <View key={index} style={styles.numberContainer}>
                        {Number(today) === number ? 
                        <Text style={{ color:"red"}}>
                            {number}
                        </Text>
                            :
                        <Text style={styles.number}>
                            {number}
                        </Text>
                        }
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                {numbersthird.map((number, index) => (
                    <View key={index} style={styles.numberContainer}>
                        {Number(today) === number ? 
                        <Text style={{ color:"red"}}>
                            {number}
                        </Text>
                            :
                        <Text style={styles.number}>
                            {number}
                        </Text>
                        }
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                {numbersfour.map((number, index) => (
                    <View key={index} style={styles.numberContainer}>
                       {Number(today) === number ? 
                        <Text style={{ color:"red"}}>
                            {number}
                        </Text>
                            :
                        <Text style={styles.number}>
                            {number}
                        </Text>
                        }
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                {numbersfive.map((number, index) => (
                    <View key={index} style={styles.numberContainer}>
                        {Number(today) === number ? 
                        <Text style={{ color:"red"}}>
                            {number}
                        </Text>
                            :
                        <Text style={styles.number}>
                            {number}
                        </Text>
                        }
                    </View>
                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row"
    },
    numberContainer: {
        width: Dimensions.get('window').width * 0.8 / 7,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: "flex",
        borderColor: "black",
        borderWidth: 1,
    },
    daysContainer: {
        width: Dimensions.get('window').width * 0.8 / 7,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        borderColor: "black",
        borderWidth: 1,
    },
    number: {
        color:"black",
        marginLeft:5
    },

});
