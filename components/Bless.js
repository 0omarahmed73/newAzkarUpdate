import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {fonts} from "../constants/constants";
import {ThemeContext} from "../contexts/ThemeContext";
import { AntDesign } from '@expo/vector-icons';

const Bless = ({bless , done , showModel , deleteBless , setValue , setId}) => {
    const {themeColors , theme , handleChangeTheme , fontScale} = useContext(ThemeContext)
    const styles = StyleSheet.create({
        bless : {
            flexDirection : 'row-reverse',
            justifyContent : 'space-between',
            gap : 10,
            alignItems : 'center',
            padding : 10,
            margin : 10,
            borderRadius : 10,
            backgroundColor : themeColors.primary
        }, done : bless.done === true ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'}

    })
    const {width} = useWindowDimensions();

    return (
        <TouchableOpacity onPress={() => done(bless.id)} activeOpacity={0.5} style={styles.bless}>
           <View style={{justifyContent : 'center' , alignItems : 'center' , flexDirection : 'row' , gap : 10}}>
               <Text style={[styles.done , {fontFamily : fonts.bold , fontSize : 20 * fontScale , color : themeColors.backgroundColor}]}>{bless.title}</Text>
               <TouchableOpacity onPress={() => done(bless.id)}>
                   <View style={{borderRadius : 100 , width : 20,height : 20 , borderColor : themeColors.backgroundColor , borderWidth : 1 }}>
                       {bless.done && <View style={{backgroundColor : themeColors.backgroundColor , width : 20 , height : 20 , borderRadius : 100}} />}
                   </View>
               </TouchableOpacity>
           </View>
            {bless.editable ?  <View style={{justifyContent : 'center' , alignItems : 'center' , flexDirection : 'row' , gap : 10}}>
                <TouchableOpacity onPress={() => setValue(bless.id)} style={{justifyContent : 'center' , alignItems : 'center' , padding : 5 , borderRadius : 100 , backgroundColor : themeColors.backgroundColor}}>
                    <AntDesign name="edit" size={16} color={themeColors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteBless(bless.id)} style={{justifyContent : 'center' , alignItems : 'center' , padding : 5 , borderRadius : 100 , backgroundColor : themeColors.backgroundColor}}>
                    <AntDesign name="delete" size={16} color={themeColors.primary} />
                </TouchableOpacity>
            </View> : null}
        </TouchableOpacity>
    );
}

export default Bless;
