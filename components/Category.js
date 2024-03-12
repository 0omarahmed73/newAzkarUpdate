import React, {useContext} from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {fonts} from "../constants/constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {ThemeContext} from "../contexts/ThemeContext";
import {useToast} from "react-native-rooster";

const Category = ({title , onPress}) => {

  const {themeColors , fontScale , theme , handleChangeTheme} = useContext(ThemeContext)
  const styles = StyleSheet.create({
    category : {
      backgroundColor : themeColors.button,
      minHeight : 50
      ,width : '47%',
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius : 10 ,
      shadowColor: themeColors.textColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity:  0.19,
      shadowRadius: 5.62,
      elevation: 6
    },
    text : {
      fontFamily : fonts.bold,
      color : 'white',
      fontSize : 18 * fontScale
    }
  })
    return (
        <RNBounceable onPress={onPress && onPress} useNativeDriver={true} style={styles.category}>
          <Text style={styles.text}>{title}</Text>
        </RNBounceable>
    );
}

export default Category;
