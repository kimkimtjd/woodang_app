import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStorage = async (key: any) => {
    try {
        const result = await AsyncStorage.getItem(key);
        return result;
    } catch (error) {
        console.error('Error retrieving data from AsyncStorage', error);
        return null;
    }
};


// set
export const setStorage = async (key: any, value: any) => {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
};

// remove
export const removeStorage = async (key: any) => {
    return await AsyncStorage.removeItem(key);
};


export const getAllStoredData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);

        stores.forEach(([key, value]) => {
            console.log(`Stored value for ${key}: ${value}`);
        });
    } catch (error) {
        console.error('Error retrieving all stored data: ', error);
    }
};
