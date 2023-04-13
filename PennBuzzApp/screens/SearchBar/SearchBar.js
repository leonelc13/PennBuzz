import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function SearchBar({ navigation }) {

    return (
        <View>
            <View style={styles.search_container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-search" size={24} />
                </View>
                <TextInput style={styles.search_bar}
                    placeholder="Search for Friends, Quizzes, and more..."
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    search_container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    search_bar: { color: "#FF0606" },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default SearchBar;