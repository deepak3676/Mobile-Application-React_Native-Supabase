import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../supabase';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the type for the navigation object
type MyTodosScreenNavigationProp = NavigationProp<any, 'My todos'>;

const Login = () => {
  // Use the defined type for the navigation object
  const navigation = useNavigation<MyTodosScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    async function signInWithEmail() {
        setLoading(true)
        console.log(email+" "+password);
        
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message);
        else {
            // Navigate to "My todos" screen upon successful login
            navigation.navigate(`My todos`);
          }
        setLoading(false)
    }

    return (
        <View style={styles.container}>

            <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} />

            <TextInput style={styles.input} textContentType='password' placeholder='Password' onChangeText={(text: string) => setPassword(text)} value={password} />
            <View style={styles.buttons}>
                <Button onPress={signUpWithEmail} title="Create Account" />
                <Button onPress={signInWithEmail} title="Sign In" />
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,

        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        borderColor: 'black',
    },
    container: {
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 20,
    },
    buttons:{
        margin:20,
        padding:10,
        gap:10
    }

})