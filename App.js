import React, { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ola from './src/pages/Home';
import Dash from './src/pages/Dashboard';
import Name from './src/pages/Home/name';
import Much from './src/pages/Home/much';
import MuchEconom from './src/pages/Home/muchEconom';
import insertDebt from './src/pages/Insert/insertDebt';
import insertAdditional from './src/pages/Insert/insertAdditional';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';
import User from './src/Services/sqlite/User';


const Stack = createNativeStackNavigator();

export default function App() {

/**
 * Verificar se já existe um usuario
 * Caso exista verificar se iniciou um novo mes
 * para gerar outra renda
 */
 const [ qtdUser, setQtdUser ] = useState(0);



// if ( 1 === 1){
  rotaInicio = 'Ola';
//}

   function getUser(){

    User.countUser() 
    .then( data => setQtdUser(data.qtd))
    .catch( err => console.log(err) )
    
console.log(qtdUser)
    if(qtdUser === 1){
      rotaInicio = 'Dashboard';
    }
  
  }


  useEffect(() => {
    getUser()

  }) 

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={rotaInicio}>
        <Stack.Screen name="Ola" 
                      component={Ola}
                      options={{
                        title: "",
                        headerShown: false
                       }}
                        />
        <Stack.Screen name="Name" 
                      component={Name}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                       />
        <Stack.Screen name="Dash" 
                      component={Dash}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                       />
        <Stack.Screen name="Much"
                      component={Much}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                       />

<Stack.Screen name="MuchEconom"
                      component={MuchEconom}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                       />
                       <Stack.Screen name="Dashboard"
                      component={Dash}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                      
                       />
                    <Stack.Screen name="insertDebt"
                      component={insertDebt}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                      
                       />
                             <Stack.Screen name="insertAdditional"
                      component={insertAdditional}
                      options={{
                        title: "",
                        headerShown: false
                      }}
                      
                       />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


