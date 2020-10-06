import { Dimensions } from 'react-native'


let { width, height } = Dimensions.get('window');

export const units = {
    vw: width / 100
    , vh: height / 100
};

// console.log("units" , units)

units.vmin = Math.min(units.vw, units.vh);
units.vmax = Math.max(units.vw, units.vh);