import React, {useState, useEffect, useContext} from 'react';
import {Platform, Text, View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import * as Location from 'expo-location';
import {LocationContext} from "../contexts/LocationContext";
import {ThemeContext} from "../contexts/ThemeContext";
import {fonts} from "../constants/constants";
import AppBar from "../components/AppBar";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
export default function Loca() {
    const {themeColors} = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container : {
            flexDirection : 'row' , gap : 5 , padding : 10 , backgroundColor : themeColors.primary , marginBottom : 10 , borderRadius : 10
        } , prayerText : {
            color : themeColors.backgroundColor,
            fontFamily : fonts.bold,
            fontSize : 20
        } , prayerTime : {
            color : themeColors.bgColor
        }
    })
    const {loading, location, errorMsg , setErrorMsg , setLoading , findLocation} = useContext(LocationContext);
    console.log(location);
    const [text, setText] = useState('Loading...');
    const [data , setData] = useState({
        "Fajr": "04:53",
        "Sunrise": "06:25",
        "Dhuhr": "12:11",
        "Asr": "15:14",
        "Sunset": "17:57",
        "Maghrib": "17:57",
        "Isha": "19:29",
        "Imsak": "04:43",
        "Midnight": "00:11",
        "Firstthird": "22:07",
        "Lastthird": "02:16"
    });
    useEffect(() => {
        const func = async () => {
            if (location) {
                setLoading(true);
                try {
                const { latitude , longitude } = location;
                const time = new Date();
                const prayers = await fetch(`https://api.aladhan.com/v1/timings/${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=5`);
                const prayersJson = await prayers.json();
                console.log(prayersJson);
                setData({
                    "Fajr": prayersJson.data.timings.Fajr,
                    "Sunrise": prayersJson.data.timings.Sunrise,
                    "Dhuhr": prayersJson.data.timings.Dhuhr,
                    "Asr": prayersJson.data.timings.Asr,
                    "Sunset": prayersJson.data.timings.Sunset,
                    "Maghrib": prayersJson.data.timings.Maghrib,
                    "Isha": prayersJson.data.timings.Isha,
                    "Imsak": prayersJson.data.timings.Imsak,
                    "Midnight": prayersJson.data.timings.Midnight,
                    "Firstthird": prayersJson.data.timings.Firstthird,
                    "Lastthird": prayersJson.data.timings.Lastthird
                });
                } catch (e) {
                    setErrorMsg("حدث خطأ الرجاء المحاولة مرة اخرى");
                }
                setLoading(false);
                }

        };
        func();
    }, [location]);
    
    return (
        <View style={{ flex : 1 , backgroundColor : themeColors.backgroundColor }} >
            <AppBar title={"مواقيت الصلاة"} onPress={() => findLocation()} leftIcon={<MaterialIcons name="my-location"  size={24} color={themeColors.backgroundColor} />}
                    icon={<MaterialIcons name="access-time-filled" size={24} color={themeColors.backgroundColor} />} />

                <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                    {loading ? <View>
                        <ActivityIndicator size="large" color={themeColors.primary} />
                        <Text style={{color : themeColors.textColor}}>{"جاري تحميل الموقع"}</Text>
                    </View> : errorMsg ? <Text style={{color : themeColors.textColor}}>{"حدث خطأ الرجاء المحاولة مرة اخرى"}</Text> : <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                <ScrollView style={{flex : 1}} contentContainerStyle={{flexGrow : 1 , justifyContent : 'center' , alignItems : 'center'} } >
                <View style={{justifyContent : 'center' , alignItems : 'center' , flex : 1}}>
                    <View style={styles.container}>
                        <Text style={styles.prayerText} >{data['Fajr']}</Text>
                        <Text style={styles.prayerText} >{"صلاة الفجر :"}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.prayerText} >{data['Dhuhr']}</Text>
                        <Text style={styles.prayerText} >{"صلاة الظهر :"}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.prayerText} >{data['Asr']}</Text>
                        <Text style={styles.prayerText} >{"صلاة العصر :"}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.prayerText} >{data['Maghrib']}</Text>
                        <Text style={styles.prayerText} >{"صلاة المغرب :"}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.prayerText} >{data['Isha']}</Text>
                        <Text style={styles.prayerText} >{"صلاة العشاء :"}</Text>
                    </View>
                </View>
                </ScrollView>
            </View>}
                </View>
        </View>
    );

}