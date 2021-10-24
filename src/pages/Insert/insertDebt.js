import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Finance from '../../Services/sqlite/Finance';
import Bill from '../../Services/sqlite/Bill';
import { useNavigation } from "@react-navigation/native";
import ViewModal from "../../Components/viewModal";
import { TextInputMask } from 'react-native-masked-text';



function insertDebt({route}){

    LogBox.ignoreAllLogs(true);

    const [ desc, setDesc ] = useState('');
    const [ date, setDate ] = useState('');
    const [ value, setValue ] = useState('0');
    const [ icon, setIcon ] = useState('ios-remove-circle-outline');
    const [ color, setColor ] = useState('#FF004E');
    const [ message, setMessage] = useState('');
    const [ visibleModal, setVisibleModal ] = useState(false);

    const navigation = useNavigation(); 


    function getDate(){
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        setDate(dia + '/' + mes + '/' + ano)
    }

    function closeModal(boolean){
        setVisibleModal(boolean)
    }
    function create(){
       
      if(date === ''){
        setVisibleModal(true)
        setMessage('Selecione a data!')
          return
      }  
      //let financeId = Number(route.params?.id);
     // let value = Number(value)

      Bill.create( {desc: desc, date: date, value: value, icon: icon, color: color, date_key: route.params?.key } )
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
                            left: 10,
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
                            
                            <Text style={{fontSize: 24, color: '#FF004E'}}>Como você descreve</Text>
                            <Text style={{fontSize: 24, color: '#FF004E'}}>essa dívida?</Text>
                        </View >

                        <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
                        <TextInput  onChangeText={(text) => setDesc(text)}
                                    textAlign='center' 
                                    style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
                        />
                        </View>


            <View style={{height: 140, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
               <Text style={{fontSize: 24, color: '#FF004E'}}>Qual valor você</Text>
               <Text style={{fontSize: 24, color: '#FF004E'}}>deseja adicionar</Text>
               <Text style={{fontSize: 24, color: '#FF004E'}}>para esta dívida?</Text>

            </View >

            <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
               <TextInputMask 
                            type={'money'}
                              //keyboardType="number-pad" 
                              
                            value={value}  
                            onChangeText={(text) => setValue(text)}
                            textAlign='center' 
                            style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
            />
            </View>
            
            <Modal animationType='slide' transparent={true} visible={visibleModal}>
              <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
                 <ViewModal close={() => closeModal(false)} message={message} ></ViewModal>
              </View>
            </Modal>

            <TouchableOpacity   onPress={() => create()}
                                style={ styles.button}>
                <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold', flexWrap:'wrap' }}>Adicionar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
    );
    

}


export default insertDebt;

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
        backgroundColor: '#ff004E',  
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