//all the styles for the start screen
import { Platform, StyleSheet, StatusBar } from 'react-native';

const title =  StyleSheet.create({ 
  container: {
    flex: 0.10,
    flexDirection: 'row',
  
  },
  linear: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: 'row',

  },
  rightContainer: { 
      flexDirection: 'row',   
  }, 
  text:{
    color: '#fff',  
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10, 
  },
  button: {
    marginLeft: 'auto',
    

  
  },

});


const boxes = StyleSheet.create({
  conteiner : {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  section: {
    marginBottom: 250, // agrega espacio debajo de cada sección
  },
});


export default title;
export {boxes};