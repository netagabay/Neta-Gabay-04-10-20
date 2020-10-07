import { StyleSheet } from 'react-native';
import { units } from './units.jsx';

export const globalStyles = StyleSheet.create({
    Text: {
        color: 'white',
        fontFamily: 'System'
    },
    BackgroundImage : {
        position: 'absolute',
        top: 0,
        width: 100 * units.vw,
        height: 100 * units.vh,
    },
    container: {
        flex: 1,
        justifyContent: "center"
      },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})