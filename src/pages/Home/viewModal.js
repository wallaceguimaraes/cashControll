import React from 'react';
import { StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Keyboard,
 } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';


    function viewModal(props){

      const [messageLine1, setMessageLine1] = useState('Ops! você não possui tanto')
      const [messageLine2, setMessageLine2] = useState('dinheiro assim...')


      useEffect(() =>{
          setMessageLine1('Ops! você não possui tanto')
          setMessageLine2('dinheiro assim...')

          if(props.message !== ''){
            setMessageLine1(props.message)
            setMessageLine2('')
          }


      })



        return (
            <View style={{borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', width: 283, height: 177,   shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,        }}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontSize: 14, color: '#ff004E'}}>{messageLine1}</Text>
                   <Text style={{fontSize: 14, color: '#ff004E'}}>{messageLine2}</Text>
                   </View>
                   <View style={{ flex: 1, width: 280, borderColor: '#E5E5E5',alignItems: 'center', justifyContent:'center', borderTopWidth: 1}}>
                   <TouchableOpacity style={{width: 280, height: 38, justifyContent:'center', alignItems: 'center'}} onPress={props.close}>
                       <Text style={{fontSize: 24, color: '#ff004E'}}>Ok</Text>
                   </TouchableOpacity>

                   </View>
                </View>
        );
    }

    export default viewModal;