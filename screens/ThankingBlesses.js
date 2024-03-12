import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator, Animated, Button, FlatList,
    StyleSheet,
    Text, TouchableOpacity, TouchableOpacityBase, useWindowDimensions,
    View
} from 'react-native';
import {Feather, FontAwesome5} from '@expo/vector-icons';
import {ThemeContext} from "../contexts/ThemeContext";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { Octicons } from '@expo/vector-icons';
import AppBar from "../components/AppBar";
import { MaterialIcons } from '@expo/vector-icons';
import AllCategoriesItem from "../components/AllCategoriesItem";
import {FlashList} from "@shopify/flash-list";
import {fonts} from "../constants/constants";
import Bless from "../components/Bless";
import {Modal, Portal, TextInput} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThankingBlesses = ({navigation}) => {
    const [id , setId] = useState(null);
    const {themeColors , theme , handleChangeTheme , fontScale} = useContext(ThemeContext)
    const [blesses , setBlesses] = useState([
        {
            id : 1,
            title : 'البصر',
            done : false,
            editable : false
        },
        {
            id : 2,
            title : 'السمع',
            done : false,
            editable : false

        },
        {
            id : 3,
            title : 'الكلام',
            done : false,
            editable : false
        },
        {
            id : 4,
            title : 'القوة',
            done : false,
            editable : false

        },
        {
            id : 5,
            title : 'الصحة',
            done : false,
            editable : false

        },
        {
            id : 6,
            title : 'الأمان',
            done : false,
            editable : false
        },
        {
            id : 7,
            title : 'المال',
            done : false,
            editable : false
        },
        {
            id : 8,
            title : 'العقل',
            done : false,
            editable : false
        },
        {
            id : 9,
            title : 'الأهل',
            done : false,
            editable : false
        },
        {
            id : 10,
            title : 'الأصدقاء',
            done : false,
            editable : false
        },
        ]);
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
        const timeOut = setTimeout(async () => {
                await AsyncStorage.getItem('blesses').then((res) => {
                    if (res !== null) {
                        setBlesses(d => {
                            return [ ...d , ...JSON.parse(res)]

                        });
                    }
                })
                setLoading(false);
                moveAnimationHandler();
            }
            , 3000)
        return () => clearInterval(timeOut);
    }, []);
    const styles = StyleSheet.create({
        thankingList : {
            width : width - 40,
            marginTop : 15,
            borderRadius : 10,
            marginBottom : 15,
            minHeight : 100,
            borderColor : themeColors.textColor ,
            borderWidth : 1,
        },
        bless : {
            borderBottomColor : themeColors.textColor,
            borderBottomWidth : 1,
            padding : 10,
            gap : 10,
            justifyContent : 'flex-end',
            alignItems : 'center',
            flexDirection : 'row'
        }
    })

    const [visible, setVisible] = useState({
        state : false,
        type : 'add'
    });

    const showModal = (mode) => setVisible(d => {
        return {
            type: mode,
            state : true
        }
    });
    const hideModal = () => setVisible(d => {
        return {
            ...d,
            state : false
        }
    });
    const saveEdits = async (id) => {
        const newBlesses = blesses.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    title : value
                }
            }
            return item
        })
        setBlesses(newBlesses);
        setId(null);
        hideModal();
        setValue('');
        const newBlessesString = newBlesses.filter((item) => item.editable);
        await AsyncStorage.setItem('blesses' , JSON.stringify(newBlessesString));
    }
    const containerStyle = {backgroundColor: themeColors.backgroundColor, padding: 20};
    const editBless = (id) => {
        setVisible({
            state : true,
            type : 'edit'
        })
        setId(id)
        setValue(blesses.find((item) => item.id === id).title);
    }
    useEffect(() => {
        const done = blesses.filter((item) => item.done === true);
        console.log(done.length)
    }, [blesses]);
    const doneBless = (id) => {
        const newBlesses = blesses.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    done : !item.done
                }
            }
            return item
        })
        setBlesses(newBlesses);
    }
    const deleteBless = async (id) => {
        const newBlesses = blesses.filter((item) => item.id !== id);
        setBlesses(newBlesses);
        const newBlessesString = newBlesses.filter((item) => item.editable);
        await AsyncStorage.setItem('blesses' , JSON.stringify(newBlessesString));
    }
    const [value, setValue] = useState('');
    const saveBless = async () => {
        const newBless = {
            id : blesses.length + 1,
            title : value,
            done : false,
            editable : true
        }
        setBlesses([...blesses , newBless]);
        setValue('');
        await AsyncStorage.getItem('blesses').then((res) => {
            if (res === null) {
                AsyncStorage.setItem('blesses' , JSON.stringify([newBless]));
            } else {
                AsyncStorage.setItem('blesses' , JSON.stringify([...JSON.parse(res) , newBless]));
            }
        })
        hideModal();
    }
    console.log(blesses)
    return (
        <SafeAreaProvider style={{flex : 1 , backgroundColor : themeColors.backgroundColor}}>
            <AppBar title={'شكر النعم'}  onPress={() => navigation.goBack()} icon={<FontAwesome5 name="pray" size={24}  color={themeColors.backgroundColor} />}  leftIcon={<Feather name="arrow-left" size={24} color={themeColors.backgroundColor} />}/>
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
                    <View style={{flex : 1, alignItems : 'center' , marginBottom : 50 , marginTop : 10}}>
                       <View style={{flexDirection : 'row-reverse' , justifyContent : 'space-around' , width : '100%' , alignItems : 'center' }}>
                           <Text style={{fontFamily : fonts.bold , fontSize : 20 * fontScale , color : themeColors.textColor}}>
                               قائمة النِعم
                           </Text>
                           <View style={{justifyContent : 'center' , alignItems : 'center'}}>
                               <TouchableOpacity onPress={() => showModal('add')} style={{  justifyContent : 'center' , alignItems : 'center' , borderColor : themeColors.primary , borderWidth : 1 , borderRadius : 10 , padding : 10 }}>
                                   <Text style={{textAlign : 'center', color : themeColors.textColor , fontFamily : fonts.bold}}>إضافة نعمة جديدة</Text>
                               </TouchableOpacity>
                           </View>
                       </View>
                        <View style={styles.thankingList}>
                            <FlatList data={blesses} renderItem={({item}) => {
                                return <Bless setValue={editBless} deleteBless={deleteBless} showModel={showModal} done={doneBless} bless={item} /> }
                            }
                                      keyExtractor={item => item.id.toString()}/>

                        </View>
                    </View>
                </Animated.View>}
            <Portal>
                <Modal visible={visible.state} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text style={{color : themeColors.textColor , fontFamily : fonts.bold , textAlign : 'center'}}>{visible.type === 'add' ? "إضافة نعمة جديدة" : "تعديل اسم النعمة"}</Text>
                    <View style={{marginTop : 20}}>
                        <TextInput style={{textAlign : 'right'}} onChangeText={(e) => setValue(e)} value={value} placeholder={'اسم النعمة'} />
                    </View>
                    <View style={{flexDirection : 'row-reverse' , justifyContent : 'space-around' , marginTop : 20}}>
                        <TouchableOpacity onPress={hideModal} style={{padding : 10 , borderRadius : 10 , backgroundColor : themeColors.primary}}>
                            <Text style={{color : themeColors.backgroundColor , fontFamily : fonts.bold}}>إلغاء</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            visible.type === 'add' ? saveBless() : saveEdits(id)
                        }} style={{padding : 10 , borderRadius : 10 , backgroundColor : themeColors.primary}}>
                            <Text style={{color : themeColors.backgroundColor , fontFamily : fonts.bold}}>حفظ</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaProvider>
    );
}

export default ThankingBlesses
