import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Contactos from './screen/contactos';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaContactosConBoton from './components/ListaContactosConBoton';


export default function App() {
  const Stack = createStackNavigator();
  
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Lista Contactos'>
          <Stack.Screen name='Crear Contacto' component={Contactos} />
          <Stack.Screen name="Lista Contactos" component={ListaContactosConBoton} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
