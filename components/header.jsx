import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { units } from '../styles/units.jsx';
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

export default function Header(props) {
    return (
        <View>
            <View style={[styles.header, { marginTop: Constants.statusBarHeight }]}>
                <TouchableOpacity
                    style={{ margin: 0 , justifyContent: 'center' }}
                    onPress={props.menuFunc}
                >
                    <Entypo name="menu" size={36} color="#841584" />
                </TouchableOpacity>
                <View style={{ width: 80 * units.vw, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20 , paddingLeft : 5, color:"#841584" , fontWeight:'bold'}}>{props.title}</Text>
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height:7* units.vh,
        zIndex:200,        
    },
});