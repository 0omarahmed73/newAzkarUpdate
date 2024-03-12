import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import AppBar from "../components/AppBar";
import {Feather} from "@expo/vector-icons";
import {ThemeContext} from "../contexts/ThemeContext";
import {fonts} from "../constants/constants";

const AboutUs = () => {
    const { themeColors } = useContext(ThemeContext);
    return (
        <View style={{flex : 1 , backgroundColor : themeColors.backgroundColor}}>
            <AppBar title={"عنا"} icon={<Feather name="hash" size={24} color={themeColors.backgroundColor}  />} />
            <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center' , padding : 20}}>
                <Text style={{color :  themeColors.textColor ,fontFamily : fonts.bold , textAlign : 'center' , fontSize : 20}}>تم تصميم وتطوير التطبيق كصدقة جارية لجميع أموات المسلمين</Text>
                <Text style={{color :  themeColors.textColor ,fontFamily : fonts.bold , textAlign : 'center' , fontSize : 20}}>جعله الله بالقبول</Text>

            </View>
        </View>
    );
}

export default AboutUs;
