// Contactos.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 


export default function Contactos() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [inputNumber, setInputNumber] = useState('');
  const [inputName, setInputName] = useState('');

  // GET
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error(e);
    }
  };

  // POST
  const postData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setData(value); 
      Alert.alert('Éxito', 'Los datos se guardaron correctamente');
    } catch (e) {
      console.error(e);
    }
  };

  // Validación de entrada
  const validateInput = () => {
    if (inputNumber.trim() === '' || inputName.trim() === '') {
      Alert.alert('Error', 'Los campos no pueden estar vacíos');
      return false;
    }
    if (!/^\d{1,10}$/.test(inputNumber)) {
      Alert.alert('Error', 'El número debe tener hasta 10 dígitos');
      return false;
    }
    if (inputName.length > 40) {
      Alert.alert('Error', 'El nombre debe tener hasta 40 caracteres');
      return false;
    }
    return true;
  };


const handleAdd = async () => {
    if (validateInput()) {
      const newData = [...data, { number: inputNumber, name: inputName }];
      await postData(newData);  // Espera a que se complete la operación de almacenamiento
      setInputNumber('');
      setInputName('');
      navigation.navigate('Lista Contactos', { data: newData });
    }
  };
  

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <View style={styles.container}>
     
      <AntDesign name="contacts" size={50} color="white" style={styles.icon}/>
      <TextInput 
        style={styles.input} 
        value={inputNumber} 
        onChangeText={setInputNumber} 
        placeholder="Número +57"
        keyboardType="numeric"
      />
      <TextInput 
        style={styles.input} 
        value={inputName} 
        onChangeText={setInputName} 
        placeholder="Nombre del Contacto"
      />
      <TouchableOpacity
      onPress={handleAdd}
      style={styles.btn}
      
      >
        <Text style={styles.txt}>Agregar</Text>
        </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  input:{
    borderWidth:1,
    width:350,
    height:55,
    padding:10,
    margin:10,
    borderRadius:10
  },
  icon:{
    borderRadius:100,
    backgroundColor:"#00CED1",
    padding:25,
   
  },
  btn:{
    backgroundColor: "#00CED1",
    width:350,
    height:60,
    borderRadius:10,
    alignContent:"center",
    justifyContent:"center"
  },
  txt:{
    fontSize:20,
    textAlign:"center",
    color:"white",
    fontWeight:"400"

  }

});
