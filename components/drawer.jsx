import { useWindowDimensions } from 'react-native';
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from "./mainPage.jsx";
import Favorites from './favorites'

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="MainPage">
            <Drawer.Screen
            name="MainPage" 
            component={MainPage} 
            options={{
                unmountOnBlur: true,
                drawerLabel: 'HomePage'
            }}
            />
             <Drawer.Screen
            name="fav" 
            component={Favorites} 
            options={{
                unmountOnBlur: true,
                drawerLabel: 'Favorites'
            }}
            />
        </Drawer.Navigator>
    );
}