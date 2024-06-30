import { View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "@rneui/themed";
import { Redirect } from "expo-router";

export default function ProfileScreen() {
    const {session, user} = useAuth()

    return (
        <View style = {{padding: 10}}>
            <Text>User id: {user?.id}</Text>
            <Button title="Sign out" onPress={() => supabase.auth.signOut()}/>
        </View>
    )

}