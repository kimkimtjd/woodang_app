import React from 'react';
import { Dimensions, Text, Alert, ActivityIndicator, View, StyleSheet, Image, FlatList, TouchableOpacity , Modal , Linking ,ScrollView  } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import ImagePicker , { launchImageLibrary }  from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

// 배열을 3개씩 묶어서 그룹화하는 함수
const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
};


// 이미지 업로드 - 회원 + 날짜 커스텀 진행
// 회원 리스트 작성

export default function Mypage() {

    const content = ["누적인증일수", "이번주인증일수", "벌금금액"];
    const [image, setImage] = useState(null);
    const [total_uploads, settotal_uploads] = useState({ total_uploads: "", username: "" });
    const [uploads_this_week, setuploads_this_week] = useState({ uploads_this_week: "", username: "" });
    const [fine_amount, setfine_amount] = useState({ fine_amount: "", username: "" });
    const [imagelist, setimagelist] = useState({ user_images: [], username: "" });
    const [modalVisible, setModalVisible] = useState(false); // 모달 상태
    const [selectedImageUri, setSelectedImageUri] = useState(null); // 선택한 이미지 URI

    const [isLoading, setIsLoading] = useState(true); // State for loading indicator
    const [loading, setLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const fetchData = async () => {
        setIsLoading(true); // Show loading indicator while fetching data
        try {
            const response = await fetch('https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/mypage/user/' + "김성원" + "/total_uploads");
            const apiData = await response.json();
            settotal_uploads(apiData); // Process API data for calendar format
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Hide loading indicator after fetch is complete
        }
    };

    const fetchData_uploads_this_week = async () => {
        setIsLoading(true); // Show loading indicator while fetching data
        try {
            const response = await fetch('https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/mypage/user/' + "김성원" + "/uploads_this_week");
            const apiData = await response.json();
            setuploads_this_week(apiData); // Process API data for calendar format
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Hide loading indicator after fetch is complete
        }
    };

    const fetchData_image = async () => {
        setIsLoading(true); // Show loading indicator while fetching data
        try {
            const response = await fetch('https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/mypage/user/' + "김성원" + "/images");
            const apiData = await response.json();
            setimagelist(apiData); // Process API data for calendar format
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Hide loading indicator after fetch is complete
        }
    };

    const fetchData_fine_amount = async () => {
        setIsLoading(true); // Show loading indicator while fetching data
        try {
            const response = await fetch('https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/mypage/user/' + "김성원" + "/fine_amount");
            const apiData = await response.json();
            setfine_amount(apiData); // Process API data for calendar format
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Hide loading indicator after fetch is complete
        }
    };


    useEffect(() => {
        
        fetchData();
        fetchData_uploads_this_week();
        fetchData_fine_amount();
        fetchData_image();

    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission Required",
                    message: "This app needs access to your storage to upload images.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
    
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Storage permission granted");
                return true;
            } else {
                console.log("Storage permission denied");
                Alert.alert(
                    "권한 필요",
                    "저장소 접근 권한이 필요합니다.",
                    [
                        { text: "취소", onPress: () => {}, style: "cancel" },
                        { text: "설정 열기", onPress: () => Linking.openSettings() }
                    ]
                );
                return false;
            }
        } catch (err) {
            console.warn("Permission error: ", err);
            return false;
        }
    };

   
    const pickImage = async () => {
        const permissionGranted = await requestStoragePermission();
    
        if (!permissionGranted) {
            Alert.alert("권한이 필요합니다.");
            return;
        }
    
        const options = {
            mediaType: 'photo',
            includeBase64: false,
          };
        
          const response = await new Promise((resolve, reject) => {
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    reject(new Error('사용자가 선택을 취소했습니다.'));
                } else if (response.errorCode) {
                } else if (!response.assets || response.assets.length === 0) {
                    reject(new Error('선택된 이미지가 없습니다.'));
                } else {
                    resolve(response);
                }
            });
          });
        
          // 선택된 이미지 정보 추출 (예: uri, fileName)
          const imageUri = response.assets[0].uri; // file:// 경로
          const mimeType = response.assets[0].type || 'image/jpeg'; // MIME 타입 가져오기
          const fileName = "김성원_20240907.jpg"; // 확장자 추가
          
          uploadImageToServer(imageUri, fileName, mimeType);
    };

    // 서버에 이미지 업로드하는 함수
    const uploadImageToServer = async (imageUri, fileName, mimeType) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
    
        
        formData.append('imagefile', {
            uri: imageUri,  // 파일 경로
            name: fileName,  // 지정한 파일명
            type: mimeType,  // 실제 MIME 타입
        });
        setLoading(true); // 로딩 시작

        xhr.open('POST', 'https://oow-challenge-backend-182517703842.asia-northeast3.run.app/api/mypage/upload_image');
        xhr.setRequestHeader('Accept', 'application/json');
    
        xhr.onload = () => {
            setLoading(false); 
            if (xhr.status === 200) {
                Alert.alert('이미지 업로드 성공!');
                fetchData();
                fetchData_uploads_this_week();
                fetchData_fine_amount();
                fetchData_image();
                console.log(xhr.responseText);
            } else {
                Alert.alert('이미지 업로드 실패', xhr.responseText);
            }
        };
    
        xhr.onerror = () => {
            Alert.alert('이미지 업로드 중 오류가 발생했습니다.');
        };
    
        xhr.send(formData);
    };

    // 3개씩 그룹화한 이미지 목록을 가져옴
    const chunkedImages = chunkArray(imagelist.user_images, 3);

    const handleImagePress = (imageUri) => {
        setSelectedImageUri(imageUri); // 선택한 이미지 URI 저장
        setModalVisible(true); //         // 여기서 이미지 터치 시 추가 작업을 수행할 수 있음 (예: 상세 화면 이동 등)
    };
    
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <View style={styles.case1} >

                        <View style={styles.case1first} >

                            <View style={styles.case1firstlogo} >
                                <Image source={require('../Commin/logo.png')} resizeMode='contain'
                                    style={{
                                        width: 100,
                                        height: 100,

                                    }}
                                />
                            </View>

                            <View style={styles.case1firstcontent} >
                                <Text style={{ color: "white", marginBottom: 10 }} >김성원</Text>
                                <Text style={{ color: "white" }} >kimeende@naver.com</Text>
                            </View>


                        </View>

                        <TouchableOpacity style={styles.case1second} onPress={pickImage}>
                            <Text style={{ color: 'black', fontWeight: "900", fontSize: 20 }}>오운완 인증하기</Text>
                        </TouchableOpacity>

                        <View style={styles.case1third} >
                            <View style={styles.case1thirdfirst}>
                                <View style={styles.case1thirdcontent}>
                                    {content.map((number, index) => (
                                        <View key={index} style={{
                                            width: Width * 0.9 / 3, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                            flexDirection: 'column'
                                        }}>
                                            {number === "누적인증일수" ?
                                                <>
                                                    <Text style={{ color: "white" }}>
                                                        {number}
                                                    </Text>
                                                    <Text style={{ color: "white" }}>
                                                        {total_uploads.total_uploads}일
                                                    </Text>
                                                </>
                                                :
                                                number === "이번주인증일수" ?
                                                    <>
                                                        <Text style={{ color: "white" }}>
                                                            {number}
                                                        </Text>
                                                        <Text style={{ color: "white" }}>
                                                            {uploads_this_week.uploads_this_week}일
                                                        </Text>
                                                    </>
                                                    :
                                                    <>
                                                        <Text style={{ color: "white" }}>
                                                            {number}
                                                        </Text>
                                                        <Text style={{ color: "white" }}>
                                                            {fine_amount.fine_amount}원
                                                        </Text>
                                                    </>
                                            }
                                        </View>
                                    ))}

                                </View>
                            </View>

                        </View>

                    </View>

                    <ScrollView style={styles.case2}  >
                        <FlatList
                            data={chunkedImages}  // 그룹화한 이미지 배열 사용
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.row}>
                                    {item.map((imageUri, idx) => (
                                        <TouchableOpacity key={idx} onPress={() => handleImagePress(imageUri)}>
                                            <Image
                                                key={idx}
                                                source={{ uri: imageUri }}
                                                style={{
                                                    width: Width / 3,
                                                    height: Width / 3,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                            showsVerticalScrollIndicator={true} 
                        />
                    </ScrollView>

                    <Modal visible={modalVisible} transparent={true} animationType="fade">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </>
            )}



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    case1: {
        flex: 1,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'column',
    },
    case1first: {
        flex: 3,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'row'
    },
    case1firstlogo: {
        flex: 1.5,
        backgroundColor: '#05052F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    case1firstcontent: {
        flex: 3,
        backgroundColor: '#05052F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    case1second: {
        flex: 1,
        backgroundColor: '#FFAB70',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    case1third: {
        flex: 2,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    case1thirdfirst: {
        width: Width * 0.9,
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    case1thirdcontent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    case2: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: "row",
        
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: Width * 0.3,
        height: Width * 0.3,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: Width * 0.9,
        height: Height * 0.7,
        borderRadius: 10,
    },
});
