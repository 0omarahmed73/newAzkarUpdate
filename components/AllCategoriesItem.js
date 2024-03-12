import React, {useContext} from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import {fonts} from "../constants/constants";
import {ThemeContext} from "../contexts/ThemeContext";
import {useNavigation} from "@react-navigation/native";

const AllCategoriesItem = ({name}) => {
    const navigation = useNavigation();
    const {width} = useWindowDimensions();
    const {themeColors , theme , handleChangeTheme} = useContext(ThemeContext)
    const styles = StyleSheet.create({
        allCategories : {
            backgroundColor : themeColors.primary,
            paddingVertical : 10,
            borderRadius : 10,
            marginBottom : 10,
            marginHorizontal : 10,
            minWidth : width - 20,
            alignItems : 'center',
        }, allCategoriesText : {
            color : themeColors.backgroundColor,
            fontFamily : fonts.bold,
            fontSize : 20,
        }
    })
    return (
        <RNBounceable onPress={() => navigation.navigate('Azkar' , {
            title : name
        })} style={styles.allCategories}>
            <Text style={[{
                color : themeColors.backgroundColor
            } , styles.allCategoriesText]}>{name}</Text>
        </RNBounceable>
    );
}

export default AllCategoriesItem;
