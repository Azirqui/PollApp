import { View, Text, StyleSheet,TextInput, Button, Alert } from "react-native";
import { Redirect, Stack, router } from "expo-router";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

export default function CreatePoll() {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const {session, user} = useAuth()
    const [error, setError] = useState('')
    const createPoll = () =>{
        setError('');
        if (!question){
            setError('Please enter a question')
            return
        }
        const validOptions = options.filter((o) => !!o);
        if (validOptions.length < 2){
            setError('Please enter at least two options')
            return
        }
        
        const { data, error } = await supabase
        .from('Polls')
        .insert([{question, options: validOptions}])
        .select()
        if (error){
            Alert.alert("Failed to create the poll")
            console.log(error)
            return
        }
        router.back();
        console.warn('Create Poll')
    }
    
    if (!user){
        return <Redirect href="/login"/>
    }
    return (
        <View style = {styles.container}>
            <Stack.Screen options={{title: 'Create Poll'}}/>
            <Text style = {styles.label}>Title</Text>
            <TextInput value={question} onChangeText={setQuestion} placeholder="Type your question here" style = {styles.input}/>
            <Text style = {styles.label}>Options</Text>
            {options.map((option, index) => (
                <View style = {{justifyContent: 'center'}}>
                <TextInput onChangeText={(text)  => {
                    const updated = [...options];
                    updated[index] = text;
                    setOptions(updated);
                }} value={option} placeholder={`Option ${index + 1}`} style = {styles.input}/>
                <Feather name="x" size={18} style = {{position: 'absolute', right: 10}} color="gray" onPress={() => {
                    const updated = [...options];
                    updated.splice(index, 1);
                    setOptions(updated);
                }} />
                </View>
            ))}
            <Button title="Add Option" onPress={() => setOptions([...options, ''])}/>
            <Button title="Create Poll" onPress={(createPoll) => {}}/>   
                <Text style = {{color: 'red'}}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5,
    },
    label: {
        fontWeight: '500',
        marginTop: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
});