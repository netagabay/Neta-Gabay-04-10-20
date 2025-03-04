import React, { useEffect, useState } from 'react';
import { View, Alert, Image, ActivityIndicator } from 'react-native';
import SearchArea from './searchArea.jsx';
import Header from './header.jsx';
import PlaceDetails from './placeDetails.jsx'
import { units } from '../styles/units.jsx';
import { globalStyles } from '../styles/globalStyles.jsx';
import NextFiveDays from './nextFiveDays.jsx';
import rain from '../assets/rainy.png';
import Constants from "expo-constants";
import sky from '../assets/sky.png';

export default function MainPage(props) {
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [location, setLocation] = useState(null);
    const [nextFiveDays, setNextFiveDays] = useState(null);
    const [checkFavAgain, setCheckFaveAgin] = useState(false)

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => { 
                setCheckFaveAgin(true)
        });

        return unsubscribe;
    }, []);


    //default location - telAviv
    useEffect(() => {
        let defaultLocation = {
            city: "Tel Aviv",
            country: "Israel",
            key: "215854"
        }
        searchFunc(defaultLocation)
    }, [])

    //from favorite page
    useEffect(() => {
        if (props.route.params && props.route.params.location) {
            searchFunc(props.route.params.location);
        }
    }, [props])


    const fiveDaysFunc = (res) => {
        let daysArr = [];
        for (let i in res.DailyForecasts) {
            const date = new Date(res.DailyForecasts[i].Date);
            const day1 = date.getDay();
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let obj = {
                min: res.DailyForecasts[i].Temperature.Minimum.Value,
                max: res.DailyForecasts[i].Temperature.Maximum.Value,
                day: weekday[day1],
                date: res.DailyForecasts[i].Date
            }
            daysArr.push(obj)
        }
        setNextFiveDays(daysArr)
    }

    const searchFunc = async (location) => {
        setLocation(location)
        //Temp 
        await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=PpWYxRhsO7kaFE0x6GzUbZUnhK0BiO0l`)
            .then(response => response.json())
            .then(data => {
                console.log("Temp data", data)
                let weatherDetails = {
                    text: data[0].WeatherText,
                    Temperature: data[0].Temperature.Metric.Value
                }
                setWeatherDetails(weatherDetails)
            }).catch((error) => {
                Alert.alert('there was an error calling the server');
                console.log('Error:', error);
            });
        //Next5days 
        await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=PpWYxRhsO7kaFE0x6GzUbZUnhK0BiO0l&metric=true`)
            .then(response => response.json())
            .then(data => {
                console.log("Next5days data", data)
                fiveDaysFunc(data)
            }).catch((error) => {
                Alert.alert('there was an error calling the server');
                console.log('Error:', error);
            });
    }

    return (
        <View >
            <Header title="Home Page" menuFunc={() => props.navigation.openDrawer()} />
            {weatherDetails && <Image source={weatherDetails.Temperature < 20 ? rain : sky} style={[globalStyles.BackgroundImage, { marginTop: Constants.statusBarHeight + 7 * units.vh }]} resizeMode='stretch' />}
            <View style={{ height: 80 * units.vh, marginTop: 5 * units.vh }}>
                <SearchArea searchFunc={searchFunc} />
                {weatherDetails && nextFiveDays ?
                    <View style={{ marginTop: 5 * units.vh }}>
                        <PlaceDetails
                            setCheckFaveAgin={() => setCheckFaveAgin(false)}
                            checkFavAgain={checkFavAgain}
                            location={location}
                            weatherDetails={weatherDetails}
                        />
                        <NextFiveDays nextDaysArr={nextFiveDays} />
                    </View> :
                    <View style={[globalStyles.container, globalStyles.horizontal]}>
                        <ActivityIndicator size="large" color="#841584" />
                    </View>}
            </View>
        </View>
    );
}







// {
//     "Headline": {
//       "EffectiveDate": "2020-10-08T02:00:00+01:00",
//       "EffectiveEpochDate": 1602118800,
//       "Severity": 3,
//       "Text": "Expect showery weather late Wednesday night through Thursday evening",
//       "Category": "rain",
//       "EndDate": "2020-10-09T02:00:00+01:00",
//       "EndEpochDate": 1602205200,
//       "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/extended-weather-forecast/328328?unit=c&lang=en-us",
//       "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?unit=c&lang=en-us"
//     },
//     "DailyForecasts": [
//       {
//         "Date": "2020-10-06T07:00:00+01:00",
//         "EpochDate": 1601964000,
//         "Temperature": {
//           "Minimum": {
//             "Value": 8.9,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 15,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 12,
//           "IconPhrase": "Showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Night": {
//           "Icon": 34,
//           "IconPhrase": "Mostly clear",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2020-10-07T07:00:00+01:00",
//         "EpochDate": 1602050400,
//         "Temperature": {
//           "Minimum": {
//             "Value": 11.1,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 15,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 14,
//           "IconPhrase": "Partly sunny w/ showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Night": {
//           "Icon": 12,
//           "IconPhrase": "Showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2020-10-08T07:00:00+01:00",
//         "EpochDate": 1602136800,
//         "Temperature": {
//           "Minimum": {
//             "Value": 10.6,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 16.7,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 13,
//           "IconPhrase": "Mostly cloudy w/ showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Night": {
//           "Icon": 12,
//           "IconPhrase": "Showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2020-10-09T07:00:00+01:00",
//         "EpochDate": 1602223200,
//         "Temperature": {
//           "Minimum": {
//             "Value": 8.7,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 14.7,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 12,
//           "IconPhrase": "Showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Night": {
//           "Icon": 12,
//           "IconPhrase": "Showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&unit=c&lang=en-us"
//       },
//       {
//         "Date": "2020-10-10T07:00:00+01:00",
//         "EpochDate": 1602309600,
//         "Temperature": {
//           "Minimum": {
//             "Value": 8.3,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Maximum": {
//             "Value": 13.2,
//             "Unit": "C",
//             "UnitType": 17
//           }
//         },
//         "Day": {
//           "Icon": 14,
//           "IconPhrase": "Partly sunny w/ showers",
//           "HasPrecipitation": true,
//           "PrecipitationType": "Rain",
//           "PrecipitationIntensity": "Light"
//         },
//         "Night": {
//           "Icon": 35,
//           "IconPhrase": "Partly cloudy",
//           "HasPrecipitation": false
//         },
//         "Sources": [
//           "AccuWeather"
//         ],
//         "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&unit=c&lang=en-us"
//       }
//     ]
//   }