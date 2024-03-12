import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator, Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import {ThemeContext} from "../contexts/ThemeContext";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {fonts} from "../constants/constants";
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import AppBar from "../components/AppBar";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import BorderMessage from "../components/borderMessage";
import QuranData from '../constants/QuranNew.json'; // Import the JSON data directly
import HadithData from '../constants/sahih_bukhariNew.json';
import Space from "../components/Space"; // Import the JSON data directly
import Category from "../components/Category";
import { AntDesign } from '@expo/vector-icons';
const Home = ({navigation}) => {
    const openScreenAnimation = useRef(new Animated.Value(0)).current;
    const [loading , setLoading] = useState(true);
    const [ayah , setAyah] = useState(QuranData[1]['array'][1]['ar']);
    const [hadith , setHadith] = useState(HadithData['all_books'][0]['hadith_list'][1]['arabic_text']);
    const moveAnimationHandler = () => {
        Animated.spring(openScreenAnimation , {
            toValue : 1,
            friction : 6,
            tension : 50,
            useNativeDriver : true
        }).start();
    }
    useEffect(() => {
        const randomNumber = Math.floor(Math.random()*16);
        const ayahNum = Math.floor(Math.random()*30);
        const randNum2 = Math.floor(Math.random()*33);
        const hadithNum = Math.floor(Math.random()*6);
        setAyah(QuranData[randomNumber]['array'][ayahNum]['ar']);
        setHadith(HadithData['all_books'][randNum2]['hadith_list'][hadithNum]['arabic_text'])
        const timeOut = setTimeout(() => {
            setLoading(false);
            moveAnimationHandler();
        }
        , 1000)
        return () => clearInterval(timeOut);
    }, []);
        const [message , setMessage] = useState({
            title : 'أسعد الله صباحكم',
            subTitle : 'ابدا يومك بقراءة أذكار الصباح',
            azkarTitle : 'أذكار الصباح'
        })
    useEffect(() => {
        const timer = setInterval(() => {
            const hours = new Date().getHours();
            if (hours > 4 && hours < 16) {
                setMessage({
                    title : 'أسعد الله صباحكم',
                    subTitle : 'ابدا يومك بقراءة أذكار الصباح',
                    azkarTitle : 'أذكار الصباح'
                })
            } else {
                setMessage({
                    title : 'أسعد الله مسائكم',
                    subTitle : 'ابدا ليلتك بقراءة أذكار مسائكم',
                    azkarTitle : 'أذكار المساء'
                })
            }
        } , 1000)
    }, []);
    const {bordered} = useContext(ThemeContext)
    const {themeColors , theme , handleChangeTheme} = useContext(ThemeContext)
    const styles = StyleSheet.create({

    })
    const leftIcon = theme === 'dark' ? <MaterialIcons name="sunny" size={24} color={themeColors.backgroundColor} /> : <Octicons name="moon" size={24} color={themeColors.backgroundColor} />
    return (
       <SafeAreaProvider style={{flex : 1 , backgroundColor : themeColors.backgroundColor}}>
            <AppBar title={'أذكار المسلم'} onPress={handleChangeTheme} leftIcon={leftIcon} icon={<Ionicons name="moon-sharp" size={24} color={themeColors.backgroundColor} />}/>
           {loading ?
               <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
               <ActivityIndicator size={'large'} color={themeColors.primary} />
               </View> :
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
               }} contentContainerStyle={{ justifyContent : 'center' , paddingHorizontal : 15 , alignItems : 'center' , }}>
               <View style={{paddingVertical : 20}}>
                   <BorderMessage
                       welcome
                       title={message.title}
                       subTitle={message.subTitle}
                   >
                       <TouchableOpacity onPress={() => navigation.navigate('Azkar' , {
                            title : message.azkarTitle
                       })}>
                           <Feather name="arrow-left-circle" size={32} style={{marginTop : 10}} color={themeColors.textColor} />
                       </TouchableOpacity>
                   </BorderMessage>
                   <View style={bordered.bordered} >
                       <View style={{flexDirection : 'row-reverse' , justifyContent : 'space-between' , gap : 10 }} >
                           <Category onPress={() => navigation.navigate('Azkar' , {
                                 title : 'أذكار الصباح'
                           })} title={'أذكار الصباح'} />
                            <Category
                                onPress={() => navigation.navigate('Azkar' , {
                                    title : 'أذكار المساء'
                                })
                                }
                                title={'أذكار المساء'} />

                       </View>
                       <Space height={15} />
                       <View style={{flexDirection : 'row-reverse' , justifyContent : 'space-between' , gap : 10 }} >
                            <Category title={'أذكار النوم'}
                            onPress={() => navigation.navigate('Azkar' , {
                                title : 'أذكار النوم'
                            })
                            }
                            />
                            <Category title={'خاتم التسبيح'} onPress={
                                () => navigation.navigate('Tasbeeh')
                            } />
                       </View>
                   </View>
                   <Space height={15} />
                   <BorderMessage
                       title={"تذكرة"}
                       subTitle={"عن أبي العباس عبد الله بن عباس رضي الله عنهما قال : كنت خلف النبي صلى الله عليه وسلم يوما ، فقال : ( يا غلام ، إني أُعلمك كلمات : احفظ الله يحفظك ، احفظ الله تجده تجاهك ، إذا سأَلت فاسأَل الله ، وإذا استعنت فاستعن بالله ، واعلم أن الأُمة لو اجتمعت على أَن ينفعـوك بشيء ، لم ينفعوك إلا بشيء قد كتبه الله لك ، وإن اجتمعوا على أن يضروك بشيء ، لم يضروك إلا بشيء قد كتبه الله عليك، رفعت الأقلام وجفت الصحف )"}
                   >
                   </BorderMessage>

                   <BorderMessage
                       quran
                       title={"آية"}
                       subTitle={ayah}
                   >
                   </BorderMessage>

                   <BorderMessage
                       quran
                       title={"حديث"}
                       subTitle={hadith}
                   >
                   </BorderMessage>
                   <BorderMessage
                       welcome
                       quran
                       marginBottomT={false}
                       title={"شكر النعم"}
                       subTitle={"وإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ "}
                   >
                           <TouchableOpacity onPress={() => navigation.navigate('ThankingBlesses')}>
                               <AntDesign name="leftcircleo" size={32} color={themeColors.textColor} />
                           </TouchableOpacity>
                   </BorderMessage>
               </View>
           </Animated.ScrollView>}

       </SafeAreaProvider>
    );
}

export default Home;
