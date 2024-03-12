import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, useWindowDimensions, View, FlatList, BackHandler} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import BorderMessage from "../components/borderMessage";
import Category from "../components/Category";
import Space from "../components/Space";
import { ThemeContext } from "../contexts/ThemeContext";
import * as allAzkar from '../constants/AllAzkar'
import { fonts } from "../constants/constants";
import Zikr from "../components/Zikr";
import AppBar from "../components/AppBar";
import { SpeedyList, SpeedyListItemMeta, SpeedyListItemRenderer } from "react-native-speedy-list"
import {FlashList} from "@shopify/flash-list";
import {OptimizedFlatList} from "react-native-optimized-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DoneZikrs from "./DoneZikrs";


const Azkar = ({ route, navigation }) => {
    const { width } = useWindowDimensions();
    const { title } = route.params;
    const [azkar, setAzkar] = useState(
        title === 'أذكار المساء' ? allAzkar.night  :
             title === 'أذكار الصباح' ? allAzkar.morning :
                title === 'أذكار النوم' ? allAzkar.sleep :
                    title === 'أذكار الاستيقاظ من النوم' ? allAzkar.wakeup :
                        title === 'أذكار الوضوء' ?  allAzkar.wodu :
                            title === 'أذكار الأذان' ? allAzkar.azan :
                                title === 'أذكار الذهاب إلى المسجد' ? allAzkar.mosque :
                                    title === 'أذكار ما بعد الصلاة' ? allAzkar.afterPrayZekrList :
                                        title === 'سنن الجمعة' ? allAzkar.gomaaSunn : null
    );
    const removeEndedAzkar = (id) => {
        const newAzkar = azkar.filter((item) => item.id !== id);
        setAzkar(newAzkar);
    }

    const [numOfItems, setNumOfItems] = useState(10);
    const [done , setDone] = useState(false);
    const { themeColors, fontScale, copyToClipboard } = useContext(ThemeContext);
    const openScreenAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.spring(openScreenAnimation, {
            toValue: 1,
            friction: 6,
            tension: 50,
            useNativeDriver: true
        }).start();
    }, []);
    const [numOfZeros , setNumOfZeros] = useState(0);
    const numberOfItems = () => {
        setNumOfZeros(numOfZeros + 1);
    }
    useEffect(() => {
        if (azkar.length === 0) {
            navigation.navigate('DoneZikrs');
        }
    }, [azkar]);
    console.log(numOfZeros , done , azkar.length)
    function handleBackButtonClick() {
        navigation.navigate('DoneZikrs');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    console.log(azkar.length)
    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: themeColors.azkarBg }}>
            <AppBar title={title} onPress={() => navigation.goBack()} leftIcon={<Feather name="arrow-left" size={24} color={themeColors.backgroundColor} />}
                    icon={
                        title === 'أذكار المساء' ? <Ionicons name="moon-sharp" size={24} color={themeColors.backgroundColor} />
                            : title === 'أذكار الصباح' ? <Ionicons name="sunny" size={24} color={themeColors.backgroundColor} /> :
                                title === 'أذكار النوم' ? <Ionicons name="bed" size={24} color={themeColors.backgroundColor} /> :
                                    title === 'أذكار الاستيقاظ من النوم' ? <Ionicons name="bed" size={24} color={themeColors.backgroundColor} /> :
                                         title === 'أذكار الوضوء' ? <Ionicons name="water" size={24} color={themeColors.backgroundColor} /> :
                                            title === 'أذكار الأذان' ? <MaterialIcons name="mosque" size={24} color={themeColors.backgroundColor} /> :
                                                title === 'أذكار الذهاب إلى المسجد' ? <MaterialIcons name="mosque" size={24} color={themeColors.backgroundColor} /> :
                                                    title === 'أذكار ما بعد الصلاة' ? <MaterialIcons name="mosque" size={24} color={themeColors.backgroundColor} /> :
                                                        title === 'سنن الجمعة' ? <MaterialIcons name="mosque" size={24} color={themeColors.backgroundColor} /> : null                    } />
            {!done ? <Animated.View style={{
                flex: 1, width,
                transform: [{
                    translateY: openScreenAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0]
                    })
                }]
            }}>
                <FlatList
                    data={azkar.slice(0, numOfItems)}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Zikr setDone={removeEndedAzkar} zikr={item} numberHandler={numberOfItems}   />
                    )}
                    contentContainerStyle={{ padding: 15 }}
                    estimatedItemSize={200}
                    onEndReached={() => setNumOfItems(numOfItems + 10)}
                    onEndReachedThreshold={1}
                />
            </Animated.View> : <DoneZikrs appBar={false} title={title} />}
        </SafeAreaProvider>
    );
};

export default Azkar;
