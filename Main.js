import React, {useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import ThemeProvider, {ThemeContext} from "./contexts/ThemeContext";
import App from "react-native/template/App";
import Home from "./screens/Home";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {fonts} from "./constants/constants";
import {SafeAreaProvider} from "react-native-safe-area-context";
import QuranData from "./constants/QuranNew.json";
import HadithData from "./constants/sahih_bukhariNew.json";
import Azkar from "./screens/Azkar";
import Tasbeeh from "./screens/Tasbeeh";
import MainPage from "./screens/MainPage";
import DoneZikrs from "./screens/DoneZikrs";
import ThankingBlesses from "./screens/ThankingBlesses";

const Main = () => {
    const {theme , themeColors} = useContext(ThemeContext)
    const Stack = createNativeStackNavigator();
    return (
        <>
            <StatusBar style={theme} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Home'} screenOptions={
                    {
                        animation : 'slide_from_right',
                        headerShown : false,
                        contentStyle : {
                            backgroundColor: themeColors.backgroundColor,
                        }
                    }
                }>
                    <Stack.Screen name={'Home'} component={MainPage} />
                    <Stack.Screen name={'Azkar'} component={Azkar} />
                    <Stack.Screen name={'Tasbeeh'} component={Tasbeeh} />
                    <Stack.Screen name={'DoneZikrs'} component={DoneZikrs} />
                    <Stack.Screen name={'ThankingBlesses'} component={ThankingBlesses} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Main;
