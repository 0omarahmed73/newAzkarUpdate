import {createContext, useEffect, useState} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const findLocation = async () => {
        setLoading(true)
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({longitude: location.coords.longitude, latitude: location.coords.latitude});
        await AsyncStorage.setItem('longitude', location.coords.longitude.toString());
        await AsyncStorage.setItem('latitude', location.coords.latitude.toString());
        setLoading(false)
    }
    const [location, setLocation] = useState({longitude : null , latitude : null});
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location){
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [location]);
    useEffect(() => {
        const func = async () => {
const longitude = await AsyncStorage.getItem('longitude');
            const latitude = await AsyncStorage.getItem('latitude');
            if (longitude && latitude){
                setLocation({longitude : parseFloat(longitude) , latitude : parseFloat(latitude)});
            } else {
                findLocation()
            }
        }
        func();
    } , [])
    return (
        <LocationContext.Provider value={{location , loading , setErrorMsg , setLoading , errorMsg , findLocation}}>
            {children}
        </LocationContext.Provider>
    )
}