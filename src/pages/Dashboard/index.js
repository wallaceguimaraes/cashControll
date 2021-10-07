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


function List(){

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
    const [ feed, setFeed ] = useState([/* { id: '1', 
                                        desc: 'Conta Luz', 
                                        valor:'R$ 143,78', 
                                        data: '06/08/2021', 
                                        icon: 'ios-remove-circle-outline',
                                        color: '#FF004E'},
                                      { id:'2', 
                                        desc: 'Mercadinho', 
                                        valor: 'R$ 100,00', 
                                        data: '10/08/2021', 
                                        icon: 'ios-remove-circle-outline',
                                        color: '#FF004E'},
                                        { id:'3', 
                                        desc: 'Salário', 
                                        valor: 'R$ 1700,00', 
                                        data: '30/07/2021', 
                                        icon: 'add-circle-outline',
                                        color: '#24AE5F'},
                                        { id:'4', 
                                        desc: 'Aula de guitarra', 
                                        valor: 'R$ 150,00', 
                                        data: '01/09/2021', 
                                        icon: 'add-circle-outline',
                                        color: '#24AE5F'},
                                        { id:'5', 
                                        desc: 'Compras', 
                                        valor: 'R$ 180,00', 
                                        data: '10/09/2021', 
                                        icon: 'ios-remove-circle-outline',
                                        color: '#FF004E'},
                                        { id:'6', 
                                        desc: 'Décimo (13°)', 
                                        valor: 'R$ 1700,00', 
                                        data: '20/08/2021', 
                                        icon: 'add-circle-outline',
                                        color: '#24AE5F'},
                                        { id:'7', 
                                        desc: 'Conta de água', 
                                        valor: 'R$ 56,00', 
                                        data: '06/08/2021', 
                                        icon: 'ios-remove-circle-outline',
                                        color: '#FF004E'},  */])

    
    LogBox.ignoreAllLogs(true);


     useEffect(() => {
     
        
        loadData();


    }) 

    function screenDebt(){
        getDate()
        
        let key = dateCurrent.substring(3,10);
        setDateKey(key)
        navigation.navigate('insertDebt', {key: dateKey} )

    }


    function screenAddiitonal(){
     
        navigation.navigate('insertAdditional')

    }
    
    function getDate(){
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        setDateCurrent(dia + '/' + mes + '/' + ano)
    }

    async function loadData(){

        getDate()

        let key = dateCurrent.substring(3,10);
        setDateKey(key)

        Finance.findByDateKey( key ) 
        .then( data => setFeed(data))
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
                <View style={{flex:1, alignItems: 'center', paddingTop: 20}}>
                <Text style={{color: '#24AE5F', fontSize: 22}} >Total: {id}</Text>
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
                <Text style={{color:'white', fontSize: 18, marginTop: 40}}>Bem vindo(a) {name} !</Text>
            </LinearGradient>
            <View style={{ flex:2.2, backgroundColor:'#f3f3f3'}}>
                <View style={{flex:1, backgroundColor: '#f3f3f3' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center',paddingLeft:30, paddingTop: 50}}>
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



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      
    },
    gradiente : {
        justifyContent:'flex-start', 
        paddingLeft: 32 ,
        flex:1.5, 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40
    },

    button: {
        width: 115, 
        height: 86, 
        justifyContent: 'center', 
        alignItems: 'center',
        opacity: 50,
        
    },
    card: {
        position: 'absolute',
        marginTop: 78,
        marginLeft: 34,
        backgroundColor: '#fff', 
        height: 221, 
        width:345,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,        

    },
    inputDate: {
        height: 45, 
        width: 225, 
        paddingLeft: 10,
        backgroundColor:'#ffffff', 
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,        

    },
    dateComponent: {
        width: 268,
        borderColor: '#fff',
        marginLeft: 40,
        marginTop: 34,
    },

    column: {
        flex: 1, 
        flexDirection: 'column'
    },
    red:{
        color:'#FF004E', fontSize: 14
    },
    blue: {
        color:'#00B2FF', fontSize: 14
    },
    green: {
        color:'#1E9450', fontSize: 14
    }
  });