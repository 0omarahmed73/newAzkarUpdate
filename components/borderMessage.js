import React, {useContext} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {ThemeContext} from "../contexts/ThemeContext";
import {fonts} from "../constants/constants";
import * as Clipboard from 'expo-clipboard';
import {useToast} from "react-native-rooster";

const BorderMessage = ({welcome , title , subTitle , marginBottomT = true ,  children , quran}) => {
    const { addToast } = useToast();


    const {fontScale} = useWindowDimensions()
    const {themeColors , bordered , theme , handleChangeTheme} = useContext(ThemeContext)
    const styles = StyleSheet.create({
        mainText : {
            fontFamily : fonts.bold,
            fontSize : 30 * fontScale,
            color : themeColors.textColor,
            textAlign : 'right'},
        subText : {
            lineHeight : 32,
            fontFamily : fonts.bold,
            fontSize : 20 * fontScale,
            color : themeColors.textColor,
            textAlign : 'right'
        }
    })
    const copyToClipboard = async () => {
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

    return (
        marginBottomT ? <View style={{marginBottom : 15}} >
            <View style={[bordered.bordered]} >
                <Text style={styles.mainText}>{title}</Text>
                {quran ? <Text style={{
                    lineHeight : 32,
                    fontFamily : fonts.quran,
                    fontSize : 20 * fontScale,
                    fontWeight : 'bold',
                    color : themeColors.textColor,
                    textAlign : 'right'
                }}>{subTitle}</Text> : <Text style={styles.subText}>{subTitle}</Text>}
                {!welcome && <TouchableOpacity activeOpacity={0.5}  onPress={copyToClipboard} >
                    <Feather name="copy" size={24} color={themeColors.textColor} />
                </TouchableOpacity>}
                {children}
            </View>
        </View> : <View >
            <View style={bordered.bordered} >
                <Text style={styles.mainText}>{title}</Text>
                {quran ? <Text style={{
                    lineHeight : 32,
                    fontSize : 20 * fontScale,
                    fontWeight : 'bold',
                    fontFamily : fonts.quran,
                    color : themeColors.textColor,
                    textAlign : 'right'
                }}>{subTitle}</Text> : <Text style={styles.subText}>{subTitle}</Text>
                }
                {!welcome && <TouchableOpacity activeOpacity={0.5}  onPress={copyToClipboard} >
                    <Feather name="copy" size={24} color={themeColors.textColor} />
                </TouchableOpacity>}
                {children}
            </View>
        </View>
    );
}

export default BorderMessage;
