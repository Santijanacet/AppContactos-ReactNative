// ListaContactos.js
import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, AntDesign,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';


export default function ListaContactos() {
  const [data, setData] = useState([]);
  const [updateNumber, setUpdateNumber] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateIndex, setUpdateIndex] = useState(null);

  

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key');
          if (jsonValue != null) {
            setData(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchData();
    }, [])
  );

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
      Alert.alert('Éxito', 'Los datos se actualizaron correctamente');
    } catch (e) {
      console.error(e);
    }
  };

  // DELETE
  const handleDelete = (index) => {
    const newData = data.filter((item, i) => i !== index);
    postData(newData);
  };

  // UPDATE
  const handleUpdate = () => {
    if (updateIndex !== null) {
      const newData = data.map((item, i) => (i === updateIndex ? { name: updateName, number: updateNumber } : item));
      postData(newData);
      setUpdateIndex(null);
      setUpdateName('');
      setUpdateNumber('');
    }
  };

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <MaterialIcons name="perm-contact-cal" size={34} color="white" style={styles.icon2} />
          <Text style={styles.text}>Nombre: {item.name}</Text>
          <Text style={styles.text2}>Teléfono: {item.number}</Text>
          <TouchableOpacity
          style={styles.icon}
          onPress={() => { setUpdateIndex(index); setUpdateName(item.name); setUpdateNumber(item.number); }} 
          >
          <AntDesign name="edit" size={34} color="white" />
            </TouchableOpacity> 
          <TouchableOpacity
          onPress={() => handleDelete(index)}
          style={styles.icon}
          >
            <AntDesign name="deleteuser" size={34} color="white" />
            </TouchableOpacity>
        </View>
      ))}
      {updateIndex !== null && (
        <View>
          <TextInput 
            style={styles.input} 
            value={updateNumber} 
            onChangeText={setUpdateNumber} 
            placeholder="Número"
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            value={updateName} 
            onChangeText={setUpdateName} 
            placeholder="Nombre"
          />
          <TouchableOpacity
          onPress={handleUpdate}
          style={styles.btn}

          >
            <Text style={styles.txt}> Actualizar Contacto</Text>
            </TouchableOpacity>
        </View>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#00CED1",
    shadowColor: "#008B8B",
    shadowOpacity: 10, // Adjust this value based on your preference
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    elevation: 100, // This is for Android, adjust as needed
    margin: 10,
    height: 120,
    borderRadius: 10,
    padding: 5,
    borderWidth:2,
    borderColor:"white",
    
   
  },
  container:{
    backgroundColor:"white"
  },
  
 icon:{
  position:"relative",
  left:"85%",
  top:-65,
  marginBottom:5
  
 },
 text:{
  fontSize:20,
  marginTop:30,
  fontWeight:"500",
  color:"white"
  
 },
 text2:{
  fontSize:20,
  fontWeight:"500",
  color:"white"
 },
 icon2:{
  position:'absolute',
  paddingTop:5,
  
},
icon3:{
  position:'absolute',
  top:150,
  marginLeft:10,
  padding:20,
  backgroundColor:"red",
  borderRadius:100
},
input:{
  borderWidth:1,
  width:350,
  height:55,
  padding:10,
  marginLeft:20,
  marginBottom:5,
  borderRadius:10
},
btn:{
  marginLeft:50,
  backgroundColor: "red",
  width:300,
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









