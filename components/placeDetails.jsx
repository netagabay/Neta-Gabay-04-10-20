import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { units } from '../styles/units.jsx';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { storeData, retrieveData, removeItem } from './storageFunctions';
import  { globalStyles } from '../styles/globalStyles.jsx'


export default function PlaceDetails(props) {
    const [isFavorite, setIsFavorite] = useState(props.favoritePage ? true : false)

    useEffect(() => {
        // let find = retrieveData(props.location.key);
        // console.log("find" , find)
        // setIsFavorite( find )
        (async () => {
            if (!props.favoritePage) {
                console.log("props", props.location.city + '$' + props.location.country, typeof (props.location.key + '$' + props.location.country));
                var value = await retrieveData(props.location.key)
                console.log("value", value)
                setIsFavorite(value)
            }
        })()
    }, [props.location])

    const favoriteButtonPressed = () => {
        let success = isFavorite ? removeItem(props.location.key) : storeData(props.location.key,  props.location.city + '$' + props.location.country);
        if (success) {
            setIsFavorite(!isFavorite)
            props.favoritePage && props.deletedFromFavorites(props.location.key);
        } else Alert.alert('there was a problem saving your changes');
    }

    // const weatherIcon = () => {
    //     console.log("hio")
    //     let icon = null
    //     switch (props.icon) {
    //         case 0 < props.icon < 6:
    //             icon = <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
    //             break;
    //         case 5 < props.icon < 12:
    //             icon = <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
    //             break;
    //         case 11 < props.icon < 30:
    //             icon = <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
    //             break;
    //         case 29 < props.icon < 32:

    //             break;
    //         case 32:

    //             break;
    //         case 32 < props.icon < 36:

    //             break;
    //         case 35 < props.icon < 39:

    //             break;
    //         case 38 < props.icon < 45:

    //             break;


    //         default:
    //             break;
    //     }
    //     return icon
    // }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={styles.card}>
                <View style={{ justifyContent: 'space-evenly', height: 100, width: 130 }}>
                    <Text style={[globalStyles.Text, { fontSize: 30 }]}>
                        {props.location.city}
                    </Text>
                    <Text style={[globalStyles.Text, { fontSize: 20 }]}>
                    {props.location.country}
                </Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly' }}>
                    {props.favoritePage ?
                        <TouchableOpacity 
                        style={{ justifyContent: 'center', height: 150 }}
                        onPress = {()=>props.moveToMainPage(props.location)}
                        >
                            <MaterialIcons name="keyboard-arrow-right" size={100} color="white" />
                        </TouchableOpacity>
                        :
                        <View style={{ justifyContent: 'space-evenly', height: 100 }}>
                            <Text style={[globalStyles.Text, { fontSize: 40, textAlign: 'center' , marginTop: 15  }]}>
                                {props.weatherDetails.Temperature}°C
                            </Text>
                            {/* <View>
                        {weatherIcon()}
                    </View> */}
                            <Text style={[globalStyles.Text, { fontSize: 20 , textAlign: 'center' }]}>
                                {props.weatherDetails.text}
                            </Text>
                        </View>}
                    <TouchableOpacity
                        onPress={favoriteButtonPressed}
                    >
                        {isFavorite ? <MaterialCommunityIcons name="heart" size={24} color="white" style={{ marginTop: 5 }} />
                            : <MaterialCommunityIcons name="heart-outline" size={24} color="white" style={{ marginTop: 5 }} />}
                    </TouchableOpacity>
                    {/* <TouchableOpacity 
                    onPress={()=>retrieveData('key')}>
                        <Text>hi</Text>
                    </TouchableOpacity> */}

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        backgroundColor: '#841584',
        height: 150,
        width: 300,
        opacity: 0.7,
        borderRadius: 30,
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        padding: 7
    }
});