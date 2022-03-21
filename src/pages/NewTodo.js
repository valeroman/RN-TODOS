import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const NewTodo = ({ navigation }) => {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const handleAdd  = async () => {
        
        try {
            firestore().collection('todos').add({
                todo: input,
                timestamp: Date()
            });
            navigation.navigate("Home");

        } catch (error) {
            console.log(error)
        }
        
        setInput('');
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <TextInput 
                style={styles.input}
                placeholder="Add Todo"
                onChangeText={setInput}
                value={input}
                autoComplete="off"
                autoCapitalize='none'
            />
            <TouchableOpacity
                style={styles.buttonNewTodo}
                onPress={handleAdd}
            >
                <Text style={styles.textButtonLogin}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : 50,
    },  
    buttonNewTodo: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#005c98',
        marginTop: 30,
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
});



