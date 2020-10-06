import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, FlatList, Text } from 'react-native';
import Header from './header.jsx';
import { importData } from './storageFunctions';
import PlaceDetails from './placeDetails';
import { units } from '../styles/units.jsx';

export default function Favorites({ navigation }) {

    const [favorites, setFavorites] = useState(null);

    const deletedFromFavorites = (key) => {
        console.log("deleted")
        let copyFavorites = [...favorites]
        let index = copyFavorites.findIndex((x) => x.key === key);
        copyFavorites.splice(index, 1)
        setFavorites(copyFavorites);
    }

    const moveToMainPage = (location) => {
        console.log("loc" , location)
        navigation.navigate('MainPage', { location })
    }

    useEffect(() => {
        (async () => {
            var value = await importData()
            const val = JSON.parse(JSON.stringify(value));
            console.log("value", JSON.parse(JSON.stringify(value))[0])
            let favArr = [];
            for (let i in val) {
                const arrayCityCountry = value[i][1].split('$')
                let obj = {
                    city: arrayCityCountry[0],
                    country: arrayCityCountry[1],
                    key: value[i][0]
                }
                favArr.push(obj)
            }
            setFavorites(favArr)
        })()
        // console.log("somei",importData())
    }, [])

    const displayPlaces = () => {
        let list = <FlatList
            data={favorites}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 30 }}>
                    <PlaceDetails moveToMainPage={moveToMainPage} deletedFromFavorites={deletedFromFavorites} favoritePage={true} location={item} />
                </View>
            )}
        />
        return list
    }

    return (
        <View>
            <Header title='Favorites' menuFunc={() => navigation.openDrawer()} />
            <View style={{ marginTop: 30, height: 80 * units.vh }}>
                {favorites ? displayPlaces()
                    :
                    <View>
                        <Text> loading</Text>
                    </View>}
            </View>
        </View>
    )
}