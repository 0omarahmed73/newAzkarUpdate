import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {fonts} from "../constants/constants";
import {ThemeContext} from "../contexts/ThemeContext";
import Space from "./Space";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Zikr = ({zikr , numberHandler , setDone}) => {
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1
    const windowWidth = useWindowDimensions().width;
    const [visible , setVisible] = useState(true)
    const {themeColors , fontScale , copyToClipboard } = useContext(ThemeContext)
    const [count , setCount] = useState(zikr.repeat)
    const styles = StyleSheet.create({
        container : {
            borderRadius : 15,
            borderColor : themeColors.textColor,
            borderWidth : 1,
            backgroundColor : themeColors.cardBg,
            overflow : 'hidden',
        }, text : {
            color : themeColors.textColor,
            fontFamily : fonts.quran,
            textAlign : 'center',
            fontSize : 20 * fontScale
        }, topContainer : {
            padding : 20,
        } , bottomContainer : {
            height : 50,
            flexDirection : 'row',
            justifyContent : 'space-between',
            paddingHorizontal : 25,
            alignItems : 'center',
            backgroundColor : themeColors.textColor,
            gap : 5
        }
        , inside : {
            borderWidth : 1,
            borderColor : themeColors.backgroundColor,
            width : 40,
            height : 40,
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            textAlign : 'center',
            borderRadius : 50,

        }, countsText : {
            color : themeColors.backgroundColor,
            fontFamily : fonts.bold,
            fontSize : 20 * fontScale,
        }
    })
    const handlePress = useCallback( async () => {
        if (count === 1) {
            setCount(d => d - 1);
            numberHandler();
            try {
                const count2 = await AsyncStorage.getItem('count');
                await AsyncStorage.setItem('count', JSON.stringify(JSON.parse(count2) + 1));

            } catch(e) {
                // save error
            }
                setTimeout(() => {
                    setDone(zikr.id);
                } , 100)
             }
        else {
            setCount(count => count - 1);
            try {
                const count2 = await AsyncStorage.getItem('count');
                await AsyncStorage.setItem('count', JSON.stringify(JSON.parse(count2) + 1));
            } catch(e) {
                // save error
            }

        }
    }, [count, numberHandler]);
    useEffect(() => {
        if (count === 0) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true
            }).start(() => setVisible(false));
        }
    }  , [count])
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    return (
        (
            visible ? <>
                <AnimatedTouchable onPress={handlePress} activeOpacity={0.8}  style={[styles.container , {
                    transform : [
                        {
                            translateX : fadeAnim.interpolate({
                                inputRange : [0 , 1],
                                outputRange : [windowWidth + 100 , 0]
                            })
                        }
                    ]
                }]}>
                    <View style={styles.topContainer}>
                        <Text style={styles.text}>
                            {zikr.zekr}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => copyToClipboard({subTitle: zikr.zekr})}>
                            <Text style={{fontFamily : fonts.bold , fontSize : 16 * fontScale , color : themeColors.backgroundColor}}>
                                نسخ النص</Text>
                        </TouchableOpacity>
                        <View style={{justifyContent : 'center' , alignItems : 'center' , flexDirection : 'row' , gap : 10}}>
                            <View style={styles.inside}>
                                <Text style={styles.countsText}>
                                    {count}
                                </Text>
                            </View>
                            <Text style={{fontFamily : fonts.bold , fontSize : 16 * fontScale , color : themeColors.backgroundColor}}>
                                التكرارات  |
                            </Text>
                        </View>
                    </View>
                </AnimatedTouchable>
                <Space height={20}/>
            </> :  null
        )
    )
}

export default Zikr;
