import {StyleSheet} from 'react-native';


export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        
      },
      viewText: {flex:1, alignItems: 'center', paddingTop: 20 },
      text: {color: '#24AE5F', fontSize: 22},
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
      titleName: {
          color:'white', 
          fontSize: 18, 
          marginTop: 40
      },
      viewBackground: { 
          backgroundColor: '#f3f3f3' 
      },
      viewDataList: { 
          flex: 1, 
          alignItems: 'flex-start', 
          justifyContent: 'center',
          paddingLeft:30, 
          paddingTop: 50 
      },
     /*  customStyles: { 
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
      } */
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