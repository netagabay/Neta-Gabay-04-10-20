import { useWindowDimensions } from 'react-native';
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from "./mainPage.jsx";
import Favorites from './favorites'

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="MainPage"
            drawerContentOptions={{
                activeTintColor: '#841584',
                itemStyle: { marginVertical: 10 },
            }}
        >
            <Drawer.Screen
                name="MainPage"
                component={MainPage}
                options={{
                    drawerLabel: 'HomePage'
                }}
            />
            <Drawer.Screen
                name="fav"
                component={Favorites}
                options={{
                    unmountOnBlur: true,
                    drawerLabel: 'Favorites',

                }}
                style={{ backgroundColor: '' }}
            />
        </Drawer.Navigator>
    );
}