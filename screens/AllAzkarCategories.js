import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator, Animated,
    StyleSheet,
    Text, useWindowDimensions,
    View
} from 'react-native';
import {ThemeContext} from "../contexts/ThemeContext";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {fonts} from "../constants/constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import AppBar from "../components/AppBar";
import { MaterialIcons } from '@expo/vector-icons';
import AllCategoriesItem from "../components/AllCategoriesItem";
import {FlashList} from "@shopify/flash-list";
import Zikr from "../components/Zikr";

const AllAzkarCategories = ({navigation}) => {
    const [items , setItems] = useState([
        'أذكار الصباح' , 'أذكار المساء' , 'أذكار النوم' , "أذكار الاستيقاظ من النوم" , 'أذكار الوضوء' , 'أذكار الأذان' , "أذكار الذهاب إلى المسجد" , "أذكار ما بعد الصلاة" , "سنن الجمعة"]);
    const {width} = useWindowDimensions();
    const openScreenAnimation = useRef(new Animated.Value(0)).current;
    const [loading , setLoading] = useState(true);
    const moveAnimationHandler = () => {
        Animated.spring(openScreenAnimation , {
            toValue : 1,
            friction : 6,
            tension : 50,
            useNativeDriver : true
        }).start();
    }
    useEffect(() => {
        const timeOut = setTimeout(() => {
                setLoading(false);
                moveAnimationHandler();
            }
            , 1000)
        return () => clearInterval(timeOut);
    }, []);
    const {themeColors , theme , handleChangeTheme} = useContext(ThemeContext)
    const leftIcon = theme === 'dark' ? <MaterialIcons name="sunny" size={24} color={themeColors.backgroundColor} /> : <Octicons name="moon" size={24} color={themeColors.backgroundColor} />
    return (
        <SafeAreaProvider style={{flex : 1 , backgroundColor : themeColors.backgroundColor}}>
            <AppBar title={'الأذكار'}  onPress={handleChangeTheme} leftIcon={leftIcon} icon={ <MaterialIcons name="mosque" size={24} color={themeColors.backgroundColor} />}/>
            {loading ?
                <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                    <ActivityIndicator size={'large'} color={themeColors.primary} />
                </View> :
                <Animated.View style={{flex : 1 , width  ,
                    marginTop : 10,
                    transform : [
                        {
                            translateY : openScreenAnimation.interpolate(
                                {
                                    inputRange : [0 , 1],
                                    outputRange : [200 , 0]
                                }
                            )
                        }
                    ]}}>
                    <FlashList data={items}
                               estimatedItemSize={200}
                               renderItem={({item }) => {
                                   return <AllCategoriesItem name={item} />
                               }}  />
                </Animated.View>}

        </SafeAreaProvider>
    );
}

export default AllAzkarCategories
