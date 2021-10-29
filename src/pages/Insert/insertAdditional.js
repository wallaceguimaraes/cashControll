import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Modal, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import Credit from '../../Services/sqlite/Credit';
import { useNavigation } from "@react-navigation/native";

import ViewModal from "../../Components/viewModal";


function insertAdditional({route}){

    LogBox.ignoreAllLogs(true);

    const [ desc, setDesc ] = useState('');
    const [ date, setDate ] = useState('');
    const [ value, setValue ] = useState('0');
    const [ icon, setIcon ] = useState('add-circle-outline');
    const [ color, setColor ] = useState('#24AE5F');
    const [ message, setMessage] = useState('');
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ dateCurrent, setDateCurrent ] =useState('')


    const navigation = useNavigation(); 

    function closeModal(boolean){
        setVisibleModal(boolean)
    }
    function create(){
        //console.log(route.params?.key)



      if(date === ''){
        setVisibleModal(true)
        setMessage('Selecione a data!')
          return
      }  
      //let financeId = Number(route.params?.id);
     // let value = Number(value)

      Credit.create( {desc: desc, date: date, value: value, icon: icon, color: color, date_key: route.params?.key } )
      .then( id =>  navigation.navigate('Dashboard') )
      .catch( err => alert(err) )


    }

    return(
        <ScrollView  showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={styles.container}>
                <DatePicker 
                        format="DD/MM/YYYY"
                        style={[styles.dateComponent]}
                        date ={date}
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            },
                            dateInput: {
                            borderRadius: 5,
                            width: 220,
                            height: 45
                            },
                        }
                        }
                        onDateChange={date => { setDate(date)}}
                        />

                    <View style={{height: 150, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
                            
                            <Text style={{fontSize: 24, color: '#1E9450'}}>Como você descreve</Text>
                            <Text style={{fontSize: 24, color: '#1E9450'}}>esse valor adicional?</Text>
                        </View >

                        <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
                        <TextInput
                        onChangeText={(text) => setDesc(text)}
                        textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
                        />
                        </View>


            <View style={{height: 140, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
               <Text style={{fontSize: 24, color: '#1E9450'}}>Qual valor você</Text>
               <Text style={{fontSize: 24, color: '#1E9450'}}>deseja adicionar</Text>

            </View >

            <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
               <TextInputMask 
                 type={'money'}
                 value={value}
                 //keyboardType="number-pad" 
                 onChangeText={(text) => setValue(text)}

                 //onChangeText={text => setEconom(text)}
                 textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
            />
            </View>

            <Modal animationType='slide' transparent={true} visible={visibleModal}>
              <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
                 <ViewModal close={() => closeModal(false)} message={message} ></ViewModal>
              </View>
            </Modal>

            <TouchableOpacity style={ styles.button}
            onPress={() => create()}>
                <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold', flexWrap:'wrap' }}>Adicionar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
    );
    

}


export default insertAdditional;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 64 
    },
    dateComponent: {
        width: 268,
        borderColor: '#fff',
        marginTop: 100,
    },
    button: {
        padding: 2, 
        marginTop: 40,
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#1E9450',  
        height: 40, 
        width: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 4,  
         
    }
})