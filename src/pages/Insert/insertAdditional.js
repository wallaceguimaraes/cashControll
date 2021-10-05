import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import DatePicker from 'react-native-datepicker';


function insertAdditional(){

    LogBox.ignoreAllLogs(true);

    const [ date, setDate ] = useState('');

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
                        <TextInput keyboardType="number-pad" textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
                        />
                        </View>


            <View style={{height: 140, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
               <Text style={{fontSize: 24, color: '#1E9450'}}>Qual valor você</Text>
               <Text style={{fontSize: 24, color: '#1E9450'}}>deseja adicionar</Text>

            </View >

            <View style={{height: 90, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
               <TextInput keyboardType="number-pad" textAlign='center' style={{fontSize: 24, borderRadius:10, borderBottomWidth: 1, padding:5, borderColor:'#c4c4c4', width: 250, height: 44}} 
            />
            </View>

            <TouchableOpacity style={ styles.button}>
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