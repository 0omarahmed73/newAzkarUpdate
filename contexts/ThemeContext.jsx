import {createContext, useEffect, useState} from "react";
import {StyleSheet, useWindowDimensions} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useToast} from "react-native-rooster";
import * as Clipboard from "expo-clipboard";
import Storage from 'react-native-storage';
import {storage} from "../constants/constants";

export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

    const {width , fontScale} = useWindowDimensions()
    const [theme , setTheme] = useState('light')
    const [themeColors , setThemeColors] = useState(
        {
        primary : '#9C28B1',
        textColor: '#000',
        backgroundColor: '#fff',
        secondary : '#6C63FF',
            button : '#00A7EE',

        }
    );
    const light = {
        primary : '#9C28B1',
        textColor: '#000',
        backgroundColor: '#ffffff',
        secondary : 'rgba(176,176,185,0.62)',
        button : '#00A7EE',
        azkarBg : '#e8e8e8',
        cardBg : '#FFF'
    }
    const dark = {
        primary : '#FFEB3C',
            textColor: '#fff',
            backgroundColor: '#000',
            secondary : '#6C63FF',
            button : '#00A7EE',
            azkarBg: '#181616',
            cardBg : '#000'
    }
    const { addToast } = useToast();
    const copyToClipboard = async ({subTitle}) => {
        try {
            await Clipboard.setStringAsync(subTitle);
            addToast({
                type: 'success',
                message: 'تم النسخ بنجاح'
            });
            console.log('تم نسخ النص')
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };
    const bordered = StyleSheet.create({
        bordered : {
            borderWidth : 1,
            borderColor : themeColors.textColor,
            padding : 10,
            borderRadius : 10,
            width : width - 30,
            paddingVertical : 20,
            paddingHorizontal : 25,

        }
    })

    const handleChangeTheme = async () => {
        try {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            await AsyncStorage.setItem('theme', newTheme);

        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const theme = async () => {
            const data = await AsyncStorage.getItem('theme');
            if (!data) {
                await AsyncStorage.setItem('theme' , theme)
                setTheme('light');
            } else {
                setTheme(data)
            }
        }
        theme();
    }, [])
    useEffect(() => {
        if (theme === 'dark') {
            setThemeColors(dark)
        } else {
            setThemeColors(light)
        }
    }, [theme]);
    const [doneZikrs , setDoneZikrs] = useState(0);
    const handleDoneZikrs = async () => {
        try {
            const newDoneZikrs = doneZikrs + 1;
            setDoneZikrs(newDoneZikrs);
            await AsyncStorage.setItem('zikrs', newDoneZikrs.toString() );
        } catch (e) {
            console.log(e)
        }
    }
    console.log(doneZikrs)
    return (
        <ThemeContext.Provider value={{doneZikrs , handleDoneZikrs ,copyToClipboard , fontScale , theme , themeColors , bordered , handleChangeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;