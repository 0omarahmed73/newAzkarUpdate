import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home";
import {ThemeContext} from "../contexts/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Tasbeeh from "./Tasbeeh";
import AllAzkarCategories from "./AllAzkarCategories";
import DoneZikrs from "./DoneZikrs";
import Loca from "./Location";
import {FontAwesome} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";
import AboutUs from "./AboutUs";
const MainPage = () => {
    const [loading , setLoading] = useState(true);
    const {theme , themeColors} = useContext(ThemeContext)
    useEffect(() => {
        const timeOut = setTimeout(() => {
                setLoading(false);
            }
            , 1000)
        return () => clearInterval(timeOut);
    }, []);
    const Tab = createMaterialBottomTabNavigator();
    return (
        loading ?   <View style={{flex : 1 , justifyContent : 'center' , backgroundColor : 'white' , alignItems : 'center'}}>
            <Image resizeMode={'cover'} source={require('../assets/photo_2024-03-04_20-44-09.jpg')} style={{width : 400 , height : 400}} />
        </View> : <Tab.Navigator
        initialRouteName={'الرئيسية'}
        activeColor= {themeColors.backgroundColor}
        inactiveColor={themeColors.secondary}
        barStyle={
            {
                backgroundColor: themeColors.primary }} // Add this line

    >
            <Tab.Screen name="عنا" component={AboutUs}
                        options={
                            {
                                tabBarIcon : ({color , size , focused}) => (
                                    focused ? <FontAwesome name="hashtag" size={24} color={'black'} /> : <Feather name="hash" size={24} color={themeColors.secondary} />
                                )
                            }

                        }
            />
        <Tab.Screen name="مواقيت الصلاة" component={Loca}
                    options={
                        {
                            tabBarIcon : ({color , size , focused}) => (
                                focused ? <Ionicons name="time-sharp" size={24} color={'black'} /> : <Ionicons name="time-outline" size={24} color={themeColors.secondary} />
                            )
                        }

                    }
        />
        <Tab.Screen name="الأذكار" component={AllAzkarCategories}
                    options={
                        {

                            tabBarIcon : ({color , size , focused}) => (
                                focused ? <MaterialIcons name="mosque" size={24} color={'black'} /> : <MaterialCommunityIcons name="mosque" size={24} color={themeColors.secondary} />
                            )
                        }

                    }
        />
        <Tab.Screen name="الرئيسية" component={Home}
                    options={
                        {
                            tabBarColor : themeColors.primary,
                            tabBarIcon : ({color , size , focused}) => (
                                focused ? <Ionicons name="home-sharp" size={24} color={'black'} /> : <Ionicons name="home-outline" size={24} color={themeColors.secondary} />
                            )
                        }

                    }
        />

    </Tab.Navigator>
    );
}

export default MainPage;
