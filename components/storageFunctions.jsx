import { AsyncStorage } from 'react-native';

export const storeData = async (key, val) => {
    try {
        await AsyncStorage.setItem(key, val);
        return true
    } catch (error) {
        console.log("error", error)
        return false
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true
    } catch (error) {
        console.log("error", error)
        return false
    }
};

export const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      return result;
    } catch (error) {
      console.error(error)
    }
  }

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value
        } else return false
    } catch (error) {
        console.log("error", error)
    }
};
