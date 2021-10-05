import React, { useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import Baby from '../../../assets/icons/babysmile.svg';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Ola (){

  const [ opacity, setOpacity ] = useState(new Animated.Value(0));
  const navigation = useNavigation(); 


  useEffect(() => {

    AsyncStorage.clear();

    Animated.sequence([

      Animated.timing(
        opacity,
        {
          toValue:1,
          duration: 2000,
          useNativeDriver: true
        }
      ),
     
    ]).start(); 
   
   const point =  setInterval(() => {
      navigation.navigate('Name', {point: point})
    }, 3200)

  })



/* 
  Animated.loop(

    Animated.sequence([

      Animated.timing(
        icon1,
        {
          toValue:1,
          duration: 500,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        icon2,
        {
          toValue:1,
          duration: 500,
          useNativeDriver: true
        }
      ),      Animated.timing(
        icon3,
        {
          toValue:1,
          duration: 500,
          useNativeDriver: true
        }
      ),      Animated.timing(
        icon4,
        {
          toValue:1,
          duration: 500,
          useNativeDriver: true
        }
      ),
    ])

  ).start() */

/*   if(!fontsLoaded) {
    return <AppLoading/>
  }else{
 */
    return(
        <Animated.View style={[styles.container,{opacity: opacity}]}>
           <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', width: 250, height: 50}}>
                <Text style={{color: '#ff004E', fontSize: 48 }}>
                    Olá!
                </Text >
            </View>
            <View style={{flex: 1.3}}>
            <Text style={{ color: '#ff004E', fontSize: 24}}>
                    Vamos começar? 
                </Text>
            </View>  
                
             <View style={{flex: 1, justifyContent: 'flex-start' }}>
             <Baby  width={50} height={50} />
               </View>   
            
        </Animated.View>
    );
  }
//}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
  },
});

