import React, {useContext} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {fonts} from "../constants/constants";
import {ThemeContext} from "../contexts/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
const AppBar = ({icon , title , onPress , leftIcon }) => {
    const {themeColors , handleChangeTheme} = useContext(ThemeContext);
    const {width} = useWindowDimensions();
    const appBarStyles = StyleSheet.create({
        appBar : {
            backgroundColor : themeColors.primary,
            width,
            flexDirection : 'row',
            paddingTop : StatusBar.currentHeight + 10,
            paddingBottom : 20,
            paddingHorizontal : 20,
            gap : 10,
            justifyContent :'space-between',
            alignItems : 'center'
        },
        text : {
            color : themeColors.backgroundColor,
            fontFamily : fonts.bold,
            fontSize : 18
        }
    })
    return (
        <View style={appBarStyles.appBar}>
            <TouchableOpacity onPress={onPress} >{leftIcon && leftIcon}</TouchableOpacity>
            <View style={{flexDirection : 'row' , gap : 10}} >
                <Text style={appBarStyles.text}>{title}</Text>
                {icon && icon}
            </View>
        </View>
    );
}

export default AppBar;
