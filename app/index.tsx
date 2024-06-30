import { Stack, Link } from "expo-router";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {supabase} from './lib/supabase'
import { Database } from "./types/supabase";

//const polls = [{id: 1},{id : 2}, {id : 3}]
type Poll = Database['public']['Tables']['Polls']['Row']
export default function Index() {
  const [polls, setPolls] = useState<Poll[]>([]); 
  useEffect(()=> {
    const fetchPolls = async () => {console.log("Fetching..."); 
    let{ data,error} = await supabase.from('Polls').select('*')
    
    if (error){
      Alert.alert('Error fetching data');
    } 
    console.log(data);     
    //setPolls(data);
    };
    fetchPolls(); 
  }, [])

  return (
    <>
    <Stack.Screen options={{title: 'Polls',headerRight: () =>(<Link href={'/polls/new'}><AntDesign  name="plus" size={20} color="grey"/></Link>),
    headerLeft: () => (
      <Link href={'/profile'}>
        <AntDesign  name="user" size={20} color="grey"/>
      </Link>
    )
  }}/>
      
      
      <FlatList data={polls} 
      contentContainerStyle={styles.container}
       renderItem={({item}) => 
        (
        <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
          <Text style = {styles.pollTitle} > {item.id} : {item.question}</Text>       
        </Link>
          )
      }/>
      
  </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    padding: 10,
    gap: 5,
  
  },
  pollContainer: {
    backgroundColor: "white",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
  }
});