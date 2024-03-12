import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import {useFonts} from "expo-font";
import ThemeProvider, {ThemeContext} from "./contexts/ThemeContext";
import {useContext} from "react";
import Main from "./Main";
import {ToastProvider} from "react-native-rooster";
import {LocationProvider} from "./contexts/LocationContext";
import {PaperProvider} from "react-native-paper";

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'Almarai-Bold': require('./assets/fonts/Almarai-Bold.ttf'),
        'Almarai-ExtraBold': require('./assets/fonts/Almarai-ExtraBold.ttf'),
        'Almarai-Light': require('./assets/fonts/Almarai-Light.ttf'),
        'Almarai-Regular': require('./assets/fonts/Almarai-Regular.ttf'),
        'Quran' : require('./assets/fonts/KfgqpcHafsUthmanicScriptRegular-1jGEe.ttf'),
        'Digital' : require('./assets/fonts/DS-DIGIT.ttf')

    });

    if (fontsLoaded) {
        return <PaperProvider>
        <ToastProvider>
           <LocationProvider>
               <ThemeProvider>
                   <Main />
               </ThemeProvider>
           </LocationProvider>
        </ToastProvider>
    </PaperProvider>
    }
}