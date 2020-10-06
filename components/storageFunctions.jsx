import { AsyncStorage } from 'react-native';

export const storeData = async (key, val) => {
    console.log("hi", key, val)
    try {
        await AsyncStorage.setItem(key, val);
        return true
    } catch (error) {
        console.log("error", error)
        return false
    }
};

export const removeItem = async (key) => {
    console.log("remove")
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
      console.log("keys" , keys);
      const result = await AsyncStorage.multiGet(keys);
      console.log("result" , result);
  
      return result;
    } catch (error) {
      console.error(error)
    }
  }

export const retrieveData = async (key) => {
    console.log("bye")
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            console.log(value);
            return value
        } else return false
    } catch (error) {
        console.log("error", error)
    }
};
