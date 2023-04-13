import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, View, TouchableOpacity, TextInput, BackHandler } from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { getSearchResults } from '../api/Search';

export function SearchScreen({ navigation }) {

    const handleBackButton = () => {
        navigation.goBack();
        return true;
    };

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        setResults([]);
        getSearchResults(query)
            .then(data => {
                console.log("DATA", data);
                if (data) return setResults(data[0].results);
                return setResults([]);
            })
            .catch(error => console.log("ERROR: " + error));
    }, [query])


    // Android Back button
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    function handleResultPress(id, type) {
        if (type == "user") {
            navigation.navigate("ProfileScreen", { user: { id } });
            return;
        }
        if (type == "quiz") navigation.navigate("QuizScreen", { quizId: { id } })
    }

    return (
        <SafeAreaView style={styles.search_screen_container}>

            <View style={styles.search_screen_header_container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_button}>
                    <Text style={styles.back_button_text}> &lt; Back</Text>
                </TouchableOpacity>
                <View style={styles.search_container}>
                    <View style={styles.icon}>
                        <Text style={styles.text}>🔍</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Search for Friends, Quizzes, and more..."
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        autoCapitalize="none"
                    />
                    <Feather name="search" size={20} />
                </View>
            </View>
            <ScrollView style={styles.search_results_container}>
                {results.map(result => (
                    <TouchableOpacity onPress={() => { handleResultPress(result.id, result.type) }}>
                        <View style={styles.search_result}>
                            <Text style={styles.search_result_title}>
                                {result.title}
                            </Text>
                            <Text style={styles.search_result_type}>
                                {result.type}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    search_screen_header_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'
    }
    , back_button_text: {
        fontSize: 15,
        fontWeight: 500
    },
    search_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#FF0606',
        margin: 5,
        backgroundColor: '#FFFFFF',
        width: '80%'
    },
    icon: {
        marginRight: 5,
    },
    search_results_container: {
        padding: 20,
        paddingTop: 5
    },
    search_result: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'flex-end',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
    }
    ,
    search_result_title: {
        fontSize: 20,
        marginRight: 10
    }
});


SearchScreen.navigationOptions = ({ navigation }) => ({
    // Set the headerLeft option to a HeaderBackButton component
    headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
    ),
});


export default SearchScreen;