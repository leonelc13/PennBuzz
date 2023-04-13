import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, BackHandler } from 'react-native';

import { IconButton } from 'react-native-paper';

export function BackButton({ navigation }) {

    const handleBackButton = () => {
        navigation.goBack();
        return true;
    };


    // Android Back button
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    return (
        < TouchableOpacity onPress={() => navigation.goBack()
        }>
            <IconButton
                icon="arrow-left"
                onPress={handleBackButton}
            />
        </TouchableOpacity >
    )
}

