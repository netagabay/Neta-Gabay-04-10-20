import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import MyDrawer from "./components/drawer.jsx";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {

  return (
    <>
      <NavigationContainer>
        <MyDrawer />
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
