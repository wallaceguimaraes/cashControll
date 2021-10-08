import React, {useState, useEffect} from 'react';
import { StyleSheet, 
         View, 
         Text, 
         TextInput, 
         TouchableOpacity, 
         Keyboard,
         Modal } from 'react-native';
 import ViewModal from '../../Components/viewModal';        
import Money from '../../../assets/icons/money.svg';

function MuchEconom(){

    const [ money, setMoney ] = useState(0)
    const [ visibleModal, setVisibleModal ] = useState(true)

    return(
       <View style={styles.container}>
         <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
             <Text style={{color: '#ff004E',fontSize: 24, marginRight: 5}}>Quantos</Text>
             <Money width={40} height={40} />
             <Text style={{color: '#ff004E', fontSize: 24, marginLeft: 5}}>você</Text>
         </View>
         <View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
         <Text style={{color: '#ff004E', fontSize: 24}}>deseja economizar?</Text>
         </View>
         <View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
         <Text style={{color: '#ff004E', fontSize: 24}}>desse dinheiro?</Text>
         </View>


         <View style={{alignItems: 'center'}}>

         <TextInput maxLength={10}
                    keyboardType='numeric' 
                    style={styles.inputNumber} 
                    onChangeText={(text) => setMoney(text)}
                    placeholder='Ex: 150,65'
           />

         <TouchableOpacity style={styles.button} >
             <Text style={{color:'#fff'}} >R$ {' ' + money}</Text>
         </TouchableOpacity>

         </View>

         <Modal animationType='slide' transparent={true} visible={visibleModal}>
           <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
            <ViewModal></ViewModal>
          </View>
         </Modal>
       
        </View>
    );
}


export default MuchEconom;


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
     button: {marginTop: 80, width: 250, height: 38, backgroundColor:'#FF0078', justifyContent: 'center', alignItems: 'center', borderRadius: 5}    


})