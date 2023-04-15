import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import Quiz from './Quiz';
import SearchBar from "../SearchBar/SearchBar";

function MainFeedScreen({ username, navigation }) {
    // Initialize state    
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/quizzes',
            {
                params: {
                    user: username
                }
            })
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

    }, [username]);

    const handlePress = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.search_container}>
                    <View style={styles.icon}>
                        <Text style={styles.text}>🔍</Text>
                    </View>
                    <Text>Search for Friends, Quizzes, and more...</Text></View>

            </TouchableOpacity >
            <ScrollView style={styles.main_feed_container}>
                {/* < View style={styles.create_quiz_container} >

                    <TouchableOpacity>
                        <Button title="Create Quiz" style={styles.create_quiz_button}>
                            <Text>Create Quiz</Text>
                        </Button>
                    </TouchableOpacity>
                </View > */}
                {
                    quizzes.map(quiz => (
                        <Quiz {...quiz} navigation={navigation} username={username} />
                    ))
                }
            </ScrollView >

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    main_feed_container: {
        width: '100%',
        padding: '2%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginBottom: 50
    },
    search_container: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#FF0606',
        margin: 10,
        backgroundColor: '#FFFFFF'
    },
    icon: {
        marginRight: 5,
    },
});

export default MainFeedScreen;