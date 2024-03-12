import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import AppBar from "../components/AppBar";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {ThemeContext} from "../contexts/ThemeContext";
import {fonts} from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const DoneZikrs = ({ title ,  appBar = true }) => {
    const navigation = useNavigation();
const { themeColors } = useContext(ThemeContext);
const styles = StyleSheet.create({
    container : {
        backgroundColor : themeColors.primary,
        padding : 10,
        borderRadius : 10
    },
    text : {
        fontFamily : fonts.bold,
        fontSize : 20,
        color : themeColors.backgroundColor
    }
})
    const [doneZikr , setDoneZikr] = useState(0);
    const loadDoneZikr = async () => {
    }
    useEffect(() => {
        const load = async () => {
            try {
                const doneZikr = await AsyncStorage.getItem('count');
                setDoneZikr(JSON.parse(doneZikr) || 0);
            } catch (error) {
                console.error(error);
            }
        }
        load().then(r =>  r);
    }, []);
    function handleBackButtonClick() {
        navigation.navigate('Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    return (
        <View style={{flex : 1}}>
            {appBar && <AppBar onPress={() => navigation.navigate('Home')} leftIcon={<Feather name="arrow-left" size={24} color={themeColors.backgroundColor} />} title={"الأذكار المنتهى منها"} /> }
            <View style={{backgroundColor : themeColors.cardBg ,flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
               <View style={styles.container}>
                   <Text style={styles.text}> تم بحمد الله الإنتهاء من  {doneZikr} ذكر  </Text>
               </View>
            </View>
        </View>
    );
}

export default DoneZikrs;
