import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import AppBar from "../components/AppBar";
import {Feather, Ionicons} from "@expo/vector-icons";
import BorderMessage from "../components/borderMessage";
import Category from "../components/Category";
import Space from "../components/Space";
import {ThemeContext} from "../contexts/ThemeContext";
import { MaterialIcons } from '@expo/vector-icons';
import {fonts} from "../constants/constants";
import {Toaster} from "react-native-toastboard";
const Tasbeeh = ({route , navigation}) => {
    const [count , setCount] = useState(0)
    const {themeColors , theme , handleChangeTheme , fontScale} = useContext(ThemeContext)
    const openScreenAnimation = useRef(new Animated.Value(0)).current;
    const moveAnimationHandler = () => {
        Animated.spring(openScreenAnimation , {
            toValue : 1,
            friction : 6,
            tension : 50,
            useNativeDriver : true
        }).start();
    }
    useEffect(() => {
        moveAnimationHandler();
    }, []);
    const styles = StyleSheet.create({
        sebha : {
            transform : [
                {
                  scaleX :1.2,
                }
                ],
            width : 150,
            height : 240,
            borderRadius : 10,
            backgroundColor : themeColors.backgroundColor,
            overflow : 'hidden',
            borderColor : themeColors.textColor,
            borderWidth : 1,
        },
        sebhachild1 : {
            width : '100%',
            height : 70,
            backgroundColor : themeColors.textColor
        },
        sebhachild2 : {
            justifyContent : 'center',
            alignItems : 'center',
            width : '100%',
            height : 170,
        },
        sebhachild3 : {
            width : '100%',
            height : 50,
            paddingHorizontal : 10,
            paddingTop : 10,
        }
    })
    return (
        <SafeAreaProvider style={{flex : 1}}>
            <AppBar title={"خاتم التسبيح"} onPress={() => navigation.goBack()} leftIcon={<Feather name="arrow-left" size={24} color={themeColors.backgroundColor} />}
                    />
            <Animated.ScrollView style={{flex : 1 ,

                transform : [
                    {
                        translateY : openScreenAnimation.interpolate(
                            {
                                inputRange : [0 , 1],
                                outputRange : [50 , 0]
                            }
                        )
                    }
                ]
            }} contentContainerStyle={{ flexGrow: 1, justifyContent : 'center' , paddingHorizontal : 15 , alignItems : 'center' , }}>
                <View style={{paddingVertical : 20 ,
                    justifyContent : 'center' ,
                    flex : 1 ,
                    alignItems : 'center'}}>
                    <View style={styles.sebha}>
                        <View style={styles.sebhachild1}>
                            <Text style={{fontSize : 32 * fontScale , fontFamily : fonts.digital , color : themeColors.backgroundColor , textAlign : 'center' , marginTop : 20}}>{count}</Text>
                        </View>
                        <View style={styles.sebhachild3}>
                            <TouchableOpacity onPress={() => setCount(0)} style={{width : 30 , height : 30 , justifyContent : 'center' , alignItems : 'center' ,
                            backgroundColor : themeColors.primary ,
                                borderRadius : 50,
                            }
                            } />

                        </View>
                        <View style={styles.sebhachild2}>
                            <TouchableOpacity onPress={() => setCount(count + 1)} style={{width : 70 , height : 70 , justifyContent : 'center' , alignItems : 'center' ,
                            backgroundColor : themeColors.primary ,
                                borderRadius : 50,
                                top : -20
                            }
                            } />

                        </View>


                    </View>
                </View>
            </Animated.ScrollView>

        </SafeAreaProvider>
    );
}

export default Tasbeeh;
