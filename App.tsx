import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import Auth from './app/screens/Login';
import { useEffect, useState } from 'react';

const Stack= createNativeStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated]= useState(false);
  useEffect(() => {
    setAuthenticated(true);
  }, []);
  
  return (
    

    <LinearGradient
    colors={['#4c669f', '#3b5998', '#192f6a']} // Adjust the colors according to your preference
    style={{ flex: 1 }}
  >
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent', // Make the header transparent
          },
        }}
        initialRouteName="Auth"
      >
        <Stack.Screen name="My todos" component={List} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  </LinearGradient>
  );
}

const styles=StyleSheet.create({
  container:{

  }
})

