import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

import MainPicker from "../components/pickers/MainPicker"


function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
 

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  


  useEffect(() => {
    axios
      .get(
        'https://projem.firebaseio.com/message.json?auth=' +
        token
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Hoşgeldiniz!</Text>
      <Text>Başarili bir şekilde giriş yaptiniz!</Text>
      <Text>{fetchedMessage}</Text>
      <Text  >Lütfen Kalkiş ve Variş Şehirlerini Seçiniz</Text>

      
        <MainPicker/>
     
       
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    
    alignItems:"center",
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
   
  },
 
 
});
