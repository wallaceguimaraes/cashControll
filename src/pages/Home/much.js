import React, {useState, useEffect} from 'react';
import { Animated, Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import Money from '../../../assets/icons/money.svg';
import Down from '../../../assets/icons/down.svg';
import ViewModal from './viewModal';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";



function Much({route}){

    
    const [ money, setMoney ] = useState(0)
    const [ econom, setEconom ] = useState(0)
    const [ dateKey, setDateKey ] = useState('')


    const [ visibleModal, setVisibleModal ] = useState(false)
    const [ message, setMessage] = useState('')

    const navigation = useNavigation(); 

    const [ dateCurrent, setDateCurrent ] =useState('')
    const [ opacity, setOpacity ] = useState(new Animated.Value(0));
    const [ opacityTwo, setOpacityTwo ] = useState(new Animated.Value(0));

    function getDate(){
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        setDateCurrent(dia + '/' + mes + '/' + ano)
    }

   function closeModal(boolean){
        setVisibleModal(boolean)
    }



    async function saveInfo() {

        let key = dateCurrent.substring(3,10);
        setDateKey(key)

        key = 1;

        let finance = {
           key, 
           dateCurrent,
           dateKey,
           money,
           econom
        }

        await AsyncStorage.clear();

        AsyncStorage.setItem('user', route.params?.name)
        AsyncStorage.setItem('finance', JSON.stringify(finance))

       let response = null;
       response = await AsyncStorage.getItem('finance')
       //alert(response)

       if(response !== null){
        navigation.navigate('Dashboard')
       }


      }
      

    function verifyMoney(){
        
        setVisibleModal(false)
        setEconom(Number(econom))
        setMoney(Number(money))
         
        if(econom > money){
        setMessage('')  
        setVisibleModal(true)
        return
        }

        if(econom === money){
           setVisibleModal(true)
           setMessage('Você não pode economizar tudo isso!')
           return 
        }

        saveInfo()

    }



    useEffect(() => {

        Animated.sequence([

            Animated.timing(
              opacity,
              {
                toValue:1,
                duration: 2000,
                useNativeDriver: true
              }
            ),
            Animated.timing(
                opacityTwo,
                {
                  toValue:1,
                  duration: 1500,
                  useNativeDriver: true
                }
              ),
           
          ]).start(); 
        getDate()
    })

    return(
       <ScrollView  showsVerticalScrollIndicator={false}>
           <KeyboardAvoidingView>
           <Animated.View style={{height: 200, opacity: opacity, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
                <Text style={{fontSize: 24, color: '#1E9450'}}>Agora falta pouco {route.params?.name}! </Text>
            </Animated.View>

            <Animated.View style={{opacity: opacityTwo}} >

            <View style={{height: 150, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
        
               <Text style={{fontSize: 24, color: '#1E9450'}}>Vamos iniciar com</Text>
               <Text style={{fontSize: 24, color: '#1E9450'}}>qual valor?</Text>
            </View >

            <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
               <TextInput keyboardType="number-pad" textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
            onChangeText={text => setMoney(text)}/>
            </View>
            <View style={{height: 90, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
            <Money width={40} height={40} />
                </View>
            
               
            <Down width={40} height={40} />   



            <View style={{height: 140, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
               <Text style={{fontSize: 24, color: '#1E9450'}}>Quanto desse dinheiro</Text>
               <Text style={{fontSize: 24, color: '#1E9450'}}>você gostaria de</Text>
               <Text style={{fontSize: 24, color: '#1E9450'}}>economizar?</Text>

            </View >

            <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
               <TextInput keyboardType="number-pad" textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
            onChangeText={text => setEconom(text)} />
            </View>

            <View style={{height: 250, alignItems: 'center', justifyContent: 'flex-start', marginTop: 105}}>
            <TouchableOpacity onPress={verifyMoney} style={styles.button}>
               <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}} >Pronto!</Text>        
            </TouchableOpacity>
            </View>
            </Animated.View>


      <Modal animationType='slide' transparent={true} visible={visibleModal}>
           <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
            <ViewModal close={() => closeModal(false)} message={message} ></ViewModal>
          </View>
         </Modal>
         </KeyboardAvoidingView>
        </ScrollView>
    );
}


export default Much;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputNumber: { 
        marginTop: 40, 
        textAlign: 'right', 
        fontSize: 18,
         borderRadius:10, 
         borderBottomWidth: 1, 
         padding:8, 
         borderColor:'#c4c4c4', 
         height: 37, 
         width: 200},
     button: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E9450', borderRadius: 5, height: 40,width: 230,
     shadowColor: "#000",
     shadowOffset: {
         width: 0,
         height: 4,
     },
     shadowOpacity: 0.30,
     shadowRadius: 4.65,
     elevation: 4,        }


})