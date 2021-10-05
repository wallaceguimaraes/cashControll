import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Think from '../../../assets/icons/think.svg';
import Smile from '../../../assets/icons/smile.svg';
import { useNavigation } from "@react-navigation/native";

function Name ({route}){

    const [name, setName] = useState('Menu nome é');
    const [height, setHeight] = useState(38);
    const [ face, setFace] = useState(false); 
    const navigation = useNavigation(); 

    function gravarNome(name){
        navigation.navigate('Much', {name: name})
        //Keyboard.dismiss();
      }
    
    useEffect(() => {
  
      clearInterval(route.params.point)
      setFace(false);

      if(name === 'Menu nome é'){
        setFace(false);
        return
      }

      if(name.length >= 2){
        setFace(true);
      }

      if(name.length === 0){
        setName('Menu nome é')
      }
    });

    return(
        <View style={styles.container}>
            {face ?
            (<Smile width={64} height={64} /> )
            : 
              (<Think width={64} height={64} /> )
            }   

            <Text style={styles.text1}>
                Qual é o seu primeiro nome?
            </Text >

            <TextInput style={styles.input} 
            onChangeText={text => setName(text)
            }/>

            <TouchableOpacity style={ styles.button} onPress={() => gravarNome(name)}>
                <Text style={styles.textButton}>{name}</Text>
            </TouchableOpacity>
            </View>
    );
      }




export default Name;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    text1: {
      color: '#ff004E', 
      fontSize: 24
    },
    input: {
      fontSize: 18, 
      borderRadius:10, 
      borderBottomWidth: 1, 
      padding:8, 
      borderColor:'#c4c4c4', 
      height: 37, 
      width: 250
    },
    button: {
        padding: 2, 
        marginBottom: 40,
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
         
    },
    textButton: {
      color: '#ffffff', 
      fontSize: 18, 
      flexWrap:'wrap' 
    }
  });


