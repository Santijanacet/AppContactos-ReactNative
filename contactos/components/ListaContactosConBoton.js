import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import ListaContactos from '../screen/listaContactos';


function ListaContactosConBoton(props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Crear Contacto')}>
          <AntDesign name="adduser" size={40} color="#00CED1" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <ListaContactos {...props}/>
}

export default ListaContactosConBoton;
