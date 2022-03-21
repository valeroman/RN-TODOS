import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export const Home = ({ navigation }) => {

    const [todo, setTodo] = useState();
    const ref = firestore().collection('todos');

    const loadData = async() => {
        try {
            const todos = await firestore().collection('todos').get();
            // console.log('todos------>', todos.docs[0].data())
            setTodo(todo);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // loadData();
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
              const { todo } = doc.data();
              list.push({
                id: doc.id,
                todo,
              });
            });
      
            setTodo(list);
      
            // if (loading) {
            //   setLoading(false);
            // }
          });
    },[]);

    const deleteTodo = async (id) => {
        console.log('---id---', id)
        // await firestore().ref(`todos/${id}`).remove();
        firestore().collection('todos').doc(id).delete().then(() => {
            Alert.alert(
                "Eliminación exitosa",
                "La tarea se ha eliminado con exito"
            )
        });
    }

    return (
        <View style={styles.container}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={todo}
                renderItem={(item) => {
                    console.log('-----item-----', item.item)
                    return (
                        <View style={styles.todos}>
                            <Text 
                                style={styles.descriptionTodo}
                                // onPress={() => navigation.navigate("TodoDetails", {
                                //     id: item.item.id,
                                //     description: item.item.todo,
                                // })}
                            >   
                                { item.item.todo }
                            </Text>
                            <TouchableOpacity
                                style={styles.deleteTodo}
                                onPress={() => {
                                    deleteTodo(item.item.id)
                                }}
                            >
                                <Text style={styles.textButtonDelete}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.buttonNewTodo}
                onPress={() => navigation.navigate("NewTodo")}
            >
                <Text style={ styles.iconButton }>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : 50
    },  
    buttonNewTodo: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 20,
        bottom: 30,
        backgroundColor: '#005c98',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffff'
    },
    todos: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 5,
        
    },
    deleteTodo: {
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#005c98',
        borderRadius: 8,
        height: 30,
        alignItems: 'center'
    },
    textButtonDelete: {
        color: '#fff'
    },
    descriptionTodo: {
        width: '75%',
        alignContent: 'flex-start',
        backgroundColor: '#f5f5f5cf',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 5,
        marginRight: 15,
        color: '#282b2db5'
    },
});


