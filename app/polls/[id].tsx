import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const polls = {
  questions: 'React Native vs  Flutter?',
  options: ['React Native FTW', 'Flutter', 'SwiftUI'],
}

export default function Details() {
  const {id} = useLocalSearchParams();
  const [selected, setSelected] = useState('React Native FTW');
  const vote = () => {
    console.warn('Vote:', selected);
  }


  return (
    <View style = {styles.container}>
      <Stack.Screen options={{title: 'Poll Voting'}}/>
      <Text style= {styles.question}>{polls.questions}</Text>
      <View style = {{gap: 5}}>
      {polls.options.map((option) => (     
        <Pressable onPress={() => setSelected(option)} key={option}  style = {styles.optionContainer}>
          <Feather name={option === selected ? 'check-circle' : 'circle'} size={18} color={option === selected ? 'green' : 'gray'} />
        <Text >{option}</Text>
        </Pressable> 
      ))}
    </View>

    <Button onPress={vote} title='Vote'/>
    </View>
  );
}
 const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'gainsboro',
    padding: 10,
    gap: 10,
  },
  question:{
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});