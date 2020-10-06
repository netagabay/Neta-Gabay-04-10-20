import React, { useState, useEffect, useRef } from 'react';
import { Button, TextInput, View, FlatList, Text, StyleSheet, Alert, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchArea(props) {
    const [text, setText] = useState('');
    const [autoComplete, setAutoComplete] = useState(null);
    const [textError, setTextError] = useState('');

    const heightAnim = useRef(new Animated.Value(100)).current;

    const animations = (animationName, value, dur = 1000) => {
        Animated.timing(animationName, { toValue: value, duration: dur }).start();
    };

    const autocompleteFunction = () => {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=xeOxh2CVVam4yNzvGelq9v4rrLWe3zOX&q=${text}`)
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                // if (typeof data !== 'array') return Alert.alert('there was an error calling the server');
                let arrayOfPlaces = [];
                for (let i in data) {
                    let obj = {
                        city: data[i].LocalizedName,
                        country: data[i].Country.LocalizedName,
                        key: data[i].Key
                    }
                    // console.log(data[i].key ,  data[i].LocalizedName)
                    arrayOfPlaces.push(obj)
                }
                setAutoComplete(arrayOfPlaces)
            }).catch((error) => {
                Alert.alert('there was an error calling the server');
                console.log('Error:', error);
            });
        // let arrayOfPlaces = [
        //     {
        //         city: 'check1',
        //         key: '1'
        //     },
        //     {
        //         city: 'check2',
        //         key: '2'
        //     },
        //     {
        //         city: 'check3',
        //         key: '3'
        //     },
        //     {
        //         city: 'check4',
        //         key: '4'
        //     },

        // ];
        // setAutoComplete(arrayOfPlaces);
        // console.log("autoComplete", autoComplete)
    }

    const displayAutoCompletePlaces = () => {
        console.log("tired")
        let list = <FlatList
            data={autoComplete}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={{ width: 200, height: 40, justifyContent: 'center', backgroundColor: "#DDDDDD" }}
                    onPress={() => { props.searchFunc(item); setText('') }}
                >
                    <View>
                        <Text style={{ fontSize: 16, margin: 3 }}>{item.city}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
        />
        return list
    }


    useEffect(() => {
        if (text != '') {
            const letters = /^[A-Za-z]+$/;
            if (text.match(letters)) {
                autocompleteFunction()
                setTextError('')
            } else {
                setTextError("use english letters only")
            }
        } else {
            setAutoComplete(null)
        }
    }, [text])


    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <View>
                    <TouchableOpacity style={styles.searchBtn} onPress={searchFunc} >
                        <FontAwesome name="search" size={24} color="white" />
                    </TouchableOpacity>
                    
                </View> */}
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextInput
                        textAlign='center'
                        placeholder='enter city'
                        style={{ borderRadius: 10, borderColor: textError !== '' ? 'red' : '#841584', width: 200, height: 40, borderWidth: 3, display: 'flex' }}
                        onChangeText={text => setText(text)}
                        value={text}
                        // onBlur={() => animations(height, 120)}
                    />
                    <View>
                        {textError !== '' ?
                            <Animated.View style={[{ display: "flex", flexDirection: 'row-reverse',justifyContentL: 'center' },  { height: 120 , opacity: heightAnim }]}>
                                <MaterialIcons name="error" size={24} color="red" />
                                <Text> {textError} </Text>
                            </Animated.View>
                            :
                            <Animated.View style={{ height: heightAnim }}>
                                {autoComplete &&
                                    displayAutoCompletePlaces()}
                            </Animated.View>}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBtn: {
        display: 'flex',
        backgroundColor: '#841584',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
});