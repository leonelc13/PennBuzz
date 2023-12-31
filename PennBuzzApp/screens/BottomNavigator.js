import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, SafeAreaProvider, Text, View, TouchableOpacity, TextInput, BackHandler } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'



import MainFeedScreen from './MainFeed/MainFeedScreen';
import ProfileScreen from './ProfileScreenComponents/ProfileScreen';
import SearchScreen from './SearchScreen';
import QuizScreen from './QuizScreen';

// Create stacks for each navbar item

// HomeStack
const HomeStackNavigator = createNativeStackNavigator();
function HomeStack({ route }) {
    const { username } = route.params;
    return (
        <HomeStackNavigator.Navigator
            initialRouteName='MainFeedScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStackNavigator.Screen name="MainFeedScreen" >
                {props => <MainFeedScreen {...props} username={username} />}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="SearchScreen" component={SearchScreen} />
            <HomeStackNavigator.Screen name="QuizScreen" component={QuizScreen} />
            <HomeStackNavigator.Screen name="ProfileScreen" component={ProfileScreen} />
        </HomeStackNavigator.Navigator>
    );
}

// Search Stack

const SearchStackNavigator = createNativeStackNavigator();
function SearchStack() {
    return (
        <SearchStackNavigator.Navigator
            initialRouteName='SearchScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <SearchStackNavigator.Screen name="SearchScreen" component={SearchScreen} />
            <SearchStackNavigator.Screen name="QuizScreen" component={QuizScreen} />
            <SearchStackNavigator.Screen name="ProfileScreen" component={ProfileScreen} />

        </SearchStackNavigator.Navigator>
    );
}

// Profile Stack

const ProfileStackNavigator = createNativeStackNavigator();
function ProfileStack({ route }) {
    const { username } = route.params;

    return (
        <ProfileStackNavigator.Navigator
            initialRouteName='ProfileScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStackNavigator.Screen name="ProfileScreen" >
                {props => <ProfileScreen {...props} username={username} />}
            </ProfileStackNavigator.Screen>

        </ProfileStackNavigator.Navigator >
    );
}

const Tab = createBottomTabNavigator();
const BottomNav = ({ user }) => {

    console.log("bottom nav ", user);
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route, navigation }) => ({
                header: () => (
                    <View style={{
                        backgroundColor: 'white',
                        height: 80,
                        alignItems: 'center',
                        display: 'flex', justifyContent: 'center', padding: 5,
                        borderBottomColor: '#F0F0F0',
                        borderBottomWidth: 1,
                        paddingTop: 40
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            Penn<Text style={{ color: '#FF0606' }}>Buzz</Text>
                        </Text>
                    </View>

                ),
            })}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
                initialParams={{ username: user }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
                initialParams={{ username: user }}
            />
        </Tab.Navigator>
    );
};

export default BottomNav;
