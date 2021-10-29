import React, { useState, useEffect} from 'react';
import { StyleSheet, View,Text, TextInput, FlatList, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import Sad from '../../../assets/icons/sad.svg';
import Assovio from '../../../assets/icons/assovio.svg';
import Baby from '../../../assets/icons/babysmile.svg';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";



import { LinearGradient } from 'expo-linear-gradient';
import DatePicker from 'react-native-datepicker';

import Financa from '../../Components/ListaFinancas';
import Finance from '../../Services/sqlite/Finance';
import Bill from '../../Services/sqlite/Bill';
import Credit from '../../Services/sqlite/Credit';

import User from '../../Services/sqlite/User';

import styles from '../../Styles/pages/Dashboard/index';


function List({route}){

   

    const [ total, setTotal ] = useState(0);
    const [ name, setName ] = useState('');
    const [ id, setId] = useState(0);
    const [ dateCurrent, setDateCurrent ] =useState('')
    const [ financaId, setFinancaId ] =useState(0)
    const [ dateKey, setDateKey ] = useState('')


    const [ gastos, setGastos ] = useState(0);
    const [ economia, setEconomia ] = useState(0);
    const [ sobra, setSobra ] = useState(0);
    const [ gastosP, setGastosP ] = useState(0);
    const [ economiaP, setEconomiaP ] = useState(0);
    const [ sobraP, setSobraP ] = useState(0);

    const navigation = useNavigation(); 

    const [ date, setDate ] = useState('');
    const [ feed, setFeed ] = useState([])

    LogBox.ignoreAllLogs(true);

     useEffect(() => {
        loadData();    
    }) 

    function screenDebt(){
        getDate()
        
        navigation.navigate('insertDebt', {key: dateKey} )

    }


    function screenAddiitonal(){
     
        navigation.navigate('insertAdditional',  {key: dateKey})

    }
    
    function getDate(){
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        setDateCurrent(dia + '/' + mes + '/' + ano)
    }

    async function loadData(){

        User.findOneLast()
        .then( data => setName(data[0].name))
        .catch( err => console.log(err) )

        //alert(name)

        getDate()

        let key = dateCurrent.substring(3,10);
        setDateKey(key)


        let dados = [];

        Bill.findByDateKey( key ) 
        .then( data => dados = data)
        .catch( err => console.log(err) ) 

/* console.log(arrayC);
        //dados.push('Oiii')
        console.log(dados)
        //console.log(dados) */

         Credit.findByDateKey( key ) 
        .then( data => setFeed(feed.concat(data)))
        .catch( err => console.log(err) )
          

        Finance.find( key ) 
        .then( data => setTotal(data.total))
        .catch( err => console.log(err) )

        /* 
       let response = await AsyncStorage.getItem('finance')
       setName(await AsyncStorage.getItem('user'))
       let data =  JSON.parse(response)
 */




       //let count =  Object.keys(data).lenght - 1; 
       //setTotal(data.money)

       /* var result = [];
      
       result = Object.entries(data)
       let pos=[]

      // console.log( result)

    
       if(result.length === 5){
         //setFeed([])
       }else{

        pos  = result.length - 5
        let resp = result[pos]
        console.log( resp[1])


       } */
        
    }


    function addDebt(){
        let feed = []

        let finance = {
            key, 
            dateCurrent,
            dateKey,
            money,
            econom
         }
 
         AsyncStorage.setItem('user', route.params?.name)
         AsyncStorage.setItem('finance', JSON.stringify(finance))
        
        alert('entrou')

    }
  
 

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.viewText}>
                <Text style={styles.text} >Total: {total}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row', padding: 18}}>
                    <View style={[styles.column, {justifyContent: 'space-around',}]}>
                        <Text style={styles.red}>Gastos:</Text>
                        <Text style={styles.blue} >Economia: </Text>
                        <Text style={styles.green}>Sobrando: </Text>
                    </View >
                    
                    <View style={[styles.column, {justifyContent: 'space-around', alignItems: 'center'}]}>
                        <Text style={styles.red}>{ gastos.toFixed(2) + ' ' }R$</Text>
                        <Text style={styles.blue}>{ economia.toFixed(2) + ' ' }R$</Text>
                        <Text style={styles.green}>{ sobra.toFixed(2) + ' ' }R$</Text>
                    </View>
                    <View style={[styles.column, {flex: 1, justifyContent: 'space-around', alignItems: 'flex-end'}]}>
                        <View style={{flexDirection: 'row'}}>
                          <Sad height={20} width={20} style={{marginRight: 40}} />
                          <Text style={styles.red}>{ gastosP.toFixed(2) } %</Text>
                        </View>
                        <View style={{flexDirection: 'row'}} >
                            <Assovio height={20} width={20} style={{marginRight: 40}} />
                        <Text style={styles.blue} >{ economiaP.toFixed(2) }%</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Baby height={20} width={20} style={{marginRight: 40}}/>
                        <Text style={styles.green}>{ sobraP.toFixed(2) }%</Text>
                        </View>
                    </View>
                </View>

            </View>
            <LinearGradient
            //Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{}}/>
                <LinearGradient
                //Button Linear Gradient
                    colors={['#FF0078', '#F9336E', '#EE5D88']}
                    start={{ x: 0.7, y: 0.1 }}
                    style={styles.gradiente}>
                <Text style={styles.titleName}>Bem vindo(a) {name} !</Text>
            </LinearGradient>
            <View style={[styles.viewBackground, { flex:2.2 }]}>
                <View style={ [styles.viewBackground, { flex: 1 }]}>
                    <View style={ styles.viewDataList}>
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
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                        style={{width:350}}
                        keyExtractor={(item) => item.id}
                        data={feed}
                        renderItem={ ({item}) => <Financa data={item}/> }
                        />
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection:'row', alignItems: 'center', height:86, backgroundColor:'#E5E5E5'}}>
                <TouchableOpacity onPress={() => screenDebt()} style={[styles.button, { backgroundColor: '#FF004E'}]}>
                    <Ionicons name="ios-remove" size={50} color="white" />
                </TouchableOpacity>
                <Text style={{fontSize: 18}}>Dinheiro</Text>
                <TouchableOpacity onPress={() => screenAddiitonal()} style={[styles.button, {backgroundColor: '#24AE5F'}]} >
                    <Ionicons name="add-outline" size={50} color="white" />
                </TouchableOpacity>
            </View>    
        </View>
    );
}

export default List;

