import { StyleSheet, View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';



export interface Todo {
    title: string;
    done: boolean;
    id: number
}
const List = ({ navigation }: any) => {

    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');
    const [shouldFetchData, setShouldFetchData] = useState(true);



    const fetchTodos = async () => {
        try {
            // Assuming you have a "todos" table in your Supabase database
            const { data, error } = await supabase
                .from('todos')
                .select('*'); // Select all columns; adjust as needed

            if (error) {
                console.error('Supabase error:', error);
            } else {
                setTodos(data || []);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        if (shouldFetchData) {
            fetchTodos();
            setShouldFetchData(false); // Reset the flag after fetching data
        }
    }, [shouldFetchData]);

    const addTodo = async () => {
        try {
            // Assuming you have a "todos" table in your Supabase database
            const todosTable = 'todos';

            // Insert a new row into the "todos" table
            const { data, error } = await supabase
                .from(todosTable)
                .upsert([
                    { title: todo, done: false }
                ]);
            setTodo('');

            if (error) {
                console.error('Supabase error:', error);
            } else {
                // Handle the response data if needed
                console.log('Supabase response:', data);
                setShouldFetchData(true); // Trigger data fetching after adding new data
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };


    const renderTodo = ( {item} : any) => {

        const toggleDone = async (item : Todo) => {
            try {
                const { data, error } = await supabase
                    .from('todos')
                    .update({ done: !item.done }) // Set the done status to the opposite of what it currently is
                    .eq('id', item.id); // Use the id to find the correct todo item
        
                if (error) {
                    throw error;
                }
        
                console.log('Update response:', data);
                setShouldFetchData(true); // Refresh the data to reflect the change
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        };
        
        const deleteItem = async (item: Todo) => {
            try {
                const { data, error } = await supabase
                    .from('todos')
                    .delete()
                    .eq('id', item.id); // Use the id to find the correct todo item to delete
        
                if (error) {
                    throw error;
                }
        
                console.log('Delete response:', data);
                setShouldFetchData(true); // Refresh the data to reflect the change
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        };
        


        return (
            <View  style={styles.todoContainer}>
                <TouchableOpacity  onPress={() => toggleDone(item)} style={styles.todo} >
                {item.done && <Ionicons name="checkmark-circle" size={32} color="green" style={{ marginRight: 8 }} />}
                {!item.done && <Entypo name="circle" size={32} color="black" style={{ marginRight: 8 }} />}
                 <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color='red' onPress={() => deleteItem(item)} />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Add new Todo' onChangeText={(text: string) => setTodo(text)} value={todo} />


                <Button onPress={addTodo} title="Add Todo" disabled={todo === ''} />

            </View>
            {todos.length > 0 && (
                <View>
                    <FlatList
                        data={todos}
                        renderItem={(item)=>renderTodo(item)}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
           

        </View>
    );
}

export default List;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal:5,
        borderColor: 'black',
    },
    todoContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        padding:10,
        borderRadius:20,
        marginVertical:4,

    },
    todoText:{
        flex:1,
        paddingHorizontal:4,
    },
    todo:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    }
})