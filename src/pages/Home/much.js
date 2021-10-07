import React, {useState, useEffect} from 'react';
import { Animated, 
         Modal, 
         StyleSheet, 
         View, 
         Text, 
         TextInput, 
         TouchableOpacity, 
         Keyboard, 
         ScrollView, 
         KeyboardAvoidingView } from 'react-native';
import Money from '../../../assets/icons/money.svg';
import Down from '../../../assets/icons/down.svg';
import ViewModal from './viewModal';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Finance from '../../Services/sqlite/Finance';
import User from '../../Services/sqlite/User';



function Much({route}){

    const [ money, setMoney ] = useState(0)
    const [ econom, setEconom ] = useState(0)
    const [ dateKey, setDateKey ] = useState('')
    const [ visibleModal, setVisibleModal ] = useState(false)
    const [ message, setMessage] = useState('')
    const [ dateCurrent, setDateCurrent ] =useState('')
    const [ opacity, setOpacity ] = useState(new Animated.Value(0));
    const [ opacityTwo, setOpacityTwo ] = useState(new Animated.Value(0));
    const [name, setName] = useState('');


    const navigation = useNavigation(); 

    function getDate(){
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        setDateCurrent(dia + '/' + mes + '/' + ano)
    }

   function closeModal(boolean){
        setVisibleModal(boolean)
    }

     function saveInfo() {

         let key = dateCurrent.substring(3,10);
        setDateKey(key)
   

        setEconom(Number(econom))
        setMoney(Number(money))

        let rest = money - econom;


        User.create({name: route.params?.name})
        .then( id => console.log(id) )
        .catch( err => alert(err) )
    

        Finance.create( {date_current: dateCurrent, date_key: key, total: money, econom: econom, rest: rest } )
        .then( id =>  navigation.navigate('Dashboard', {id: id}) )
        .catch( err => alert(err) )
    


      }
      

    function verifyMoney(){
        
        setVisibleModal(false)
      /*   setEconom(Number(econom))
        setMoney(Number(money))

        let econom = Number(econom);
        let money = Number(money); */

        console.log(typeof money)

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

       // saveInfo()
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
           <Animated.View style={[styles.viewAnime,{opacity: opacity}]}>
                <Text style={styles.text}>Agora falta pouco {route.params?.name}! </Text>
            </Animated.View>
            <Animated.View style={{opacity: opacityTwo}} >
                <View style={styles.viewTexts}>
                    <Text style={styles.text}>Vamos iniciar com</Text>
                    <Text style={styles.text}>qual valor?</Text>
                </View >
                <View style={styles.viewInput}>
                    <TextInput  keyboardType="number-pad" 
                                textAlign='center' 
                                style={styles.input} 
                                onChangeText={text => setMoney(Number(text))}
                    />
                </View>
                <View style={styles.viewIcon}>
                    <Money width={40} height={40} />
                </View>
                <Down width={40} height={40} />   
                <View style={styles.viewTexts2}>
                    <Text style={styles.text}>Quanto desse dinheiro</Text>
                    <Text style={styles.text}>você gostaria de</Text>
                    <Text style={styles.text}>economizar?</Text>
                </View >
                <View style={styles.viewInput}>
                <TextInput  keyboardType="number-pad" 
                            textAlign='center' 
                            style={styles.input} 
                            onChangeText={text => setEconom(Number(text))} />
                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity   onPress={verifyMoney} 
                                        style={styles.button}
                    >
                        <Text style={styles.textButton} >Pronto!</Text>        
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
    viewAnime: { 
        height: 200, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginBottom: 20
    },
    viewTexts: {
        height: 150,
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginBottom: 20
    },
    viewTexts2: {
        height: 140, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginBottom: 20
    },
    text: {
        fontSize: 24, 
        color: '#1E9450'
    },
    viewInput: {
        height: 90, 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        marginBottom: 20
    },
    input: {
        fontSize: 24, 
        borderRadius:10, 
        borderBottomWidth: 1, 
        padding:5, 
        borderColor:'#c4c4c4', 
        width: 250, 
        height: 44
    },
    viewIcon: { 
        height: 90, 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        marginBottom: 20
    },
    viewButton: {
        height: 250, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginTop: 105
    },
    textButton: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold'
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