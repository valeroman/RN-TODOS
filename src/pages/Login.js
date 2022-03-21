import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';


export const Login = ({navigation}) => {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async () => {

    
            
        auth()
        .signInWithEmailAndPassword(emailAddress, password)
        .then((userCredencial) => {
            let user = userCredencial.user;
            navigation.navigate("Home", { idUser: user.uid })
        })
        .catch(error => {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={ styles.container }
        >
            <Text style={ styles.title }>Login</Text>
            <TextInput 
                style={ styles.input }
                placeholder="Email address"
                type="text"
                onChangeText={(text) => setEmailAddress(text)}
                value={emailAddress}
                autoComplete="off"
                autoCapitalize='none'
            />

            <TextInput 
                style={ styles.input }
                secureTextEntry={true}
                placeholder="Password"
                type="password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            
            {
                error !== '' && (
                    <View style={ styles.contentAlert}>
                        <Text style={ styles.warningAlert}>{error}</Text>
                    </View>
                )
            }
           
            <TouchableOpacity
                disabled={isInvalid}
                style={styles.buttonLogin}
                onPress={handleLogin}
            >
                <Text style={styles.textButtonLogin}>Sign In</Text>
            </TouchableOpacity>
            
            <Text style={ styles.registration}>
                Don't have an account?  
                <Text 
                    style={ styles.linkSubscribe }
                    onPress={() => navigation.navigate("Register")}
                >
                     Sign up
                </Text>
            </Text>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : 50
    },  
    title: {
        fontSize: 28,
        color: '#005c98',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        padding: 10,
        width: 300,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#005c98',
    },
    buttonLogin: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#005c98',
        marginTop: 30,
    },
    textButtonLogin: {
        color: '#ffff',
        fontSize: 18,
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    warningAlert: {
        paddingLeft: 10,
        color: 'red',
        fontSize: 16,
    },
    registration: {
        marginTop: 20,
        color: '#4d5156',
    },
    linkSubscribe: {
        color: '#1877f2',
        left: 4,
    }
});

