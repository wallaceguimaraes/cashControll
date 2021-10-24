

import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function Financa(props){
    return(
        <View style={{flexDirection: 'row', height: 74}}>
            <View style={stylesFlat.icon}>
                <Ionicons name={props.data.icon} size={32} color={props.data.color} />
            </View>            
            <View style={{flex: 5, alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{fontSize:18}}>{props.data.desc}</Text>
                <Text style={{fontSize:14, color:'#787878', marginTop: -5}}>Data:</Text>
                <View style={{height:1, backgroundColor:'#E5E5E5'}}></View>
            </View>
            <View style={{flex: 2.4, alignItems:'flex-end' }}>
                <Text style={{fontSize:18, color:props.data.color, marginTop: 18}} >{`${props.data.value}`}</Text>
                <Text style={{fontSize:14, color:'#787878', marginTop: -5}}>{props.data.date}</Text>
                <View style={{height:1, backgroundColor:'#E5E5E5'}}></View>
            </View>
        </View>
    );
}

export default Financa;

const stylesFlat = StyleSheet.create({
    icon: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginLeft:-6, 
        marginRight: 5, 
        marginTop: 18
    }
});