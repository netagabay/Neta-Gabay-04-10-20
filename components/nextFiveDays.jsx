import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { units } from '../styles/units.jsx';
import { globalStyles } from '../styles/globalStyles.jsx'

export default function NextFiveDays(props) {

    const displayCards = () => {
        let list = <FlatList
            horizontal={true}
            data={props.nextDaysArr}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
                <DayCard item={item} />
            )}
        />
        return list
    }

    return (
        <View style={{ alignItems: 'center' , marginTop : 3*units.vh}}>
            <View style={{ display: 'flex', width: 300 }}>
                {displayCards()}
            </View>
        </View>
    )
}

function DayCard(props) {
    return (
        <View style={styles.card} >
            <Text style={[globalStyles.Text, { fontSize: 24 }]}>{props.item.day}</Text>
            <View style={[globalStyles.Text, { display: 'flex', flexDirection: 'row-reverse' }]}>
                <Text style={[globalStyles.Text, { fontSize: 18 }]}>{props.item.min} - {props.item.max} °C </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        backgroundColor: '#841584',
        height: 140,
        width: 140,
        opacity: 0.7,
        borderRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
        justifyContent: 'space-evenly',
        padding: 5
    },

});