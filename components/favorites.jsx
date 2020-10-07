import React, { useState, useEffect } from 'react';
import { Button, View, FlatList, Text , ActivityIndicator } from 'react-native';
import Header from './header.jsx';
import { importData } from './storageFunctions';
import PlaceDetails from './placeDetails';
import { units } from '../styles/units.jsx';
import { globalStyles } from '../styles/globalStyles.jsx';


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
        navigation.navigate('MainPage', { location })
    }

    useEffect(() => {
        (async () => {
            var value = await importData()
            const val = JSON.parse(JSON.stringify(value));
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
    }, [])

    const displayPlaces = () => {
        if (favorites.length) {
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
        } else {
            let noFav = <View style={{ display: 'flex', alignItems: 'center', height: 150, justifyContent: 'space-evenly' }}>
                <Text >there are no favorite places yet,</Text>
                <Text >add some from home page!</Text>
                <Button
                    onPress={() => navigation.navigate('MainPage')}
                    title="to home page"
                    color="#841584"
                />
            </View>
            return noFav
        }
    }

    return (
        <View>
            <Header title='Favorites' menuFunc={() => navigation.openDrawer()} />
            <View style={{ marginTop: 30, height: 80 * units.vh }}>
                {favorites ? displayPlaces()
                    :
                    <View style={[globalStyles.container, globalStyles.horizontal]}>
                        <ActivityIndicator size="large" color="#841584" />
                    </View>}
            </View>
        </View>
    )
}