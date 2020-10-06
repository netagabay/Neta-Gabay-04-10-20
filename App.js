import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { units } from './styles/units.jsx';
import Constants from "expo-constants";
import { Dimensions } from 'react-native'
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import MainPage from "./components/mainPage.jsx";
import MyDrawer from "./components/drawer.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function App() {

  console.log("Drawer" , MyDrawer)

  return (
    <>
      <NavigationContainer>
        <MyDrawer />
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainPage}
            options={{
              headerTitle: "home",
              //route.params.name,
              headerRight: () => (
                <TouchableOpacity
                  style={{ margin: 6 }}
                  onPress={() => alert("This is a button!")}
                >
                  <Entypo name="menu" size={36} color="#841584" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
