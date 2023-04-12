import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";


function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // add showPassword state

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    setErrorMessage(""); // reset error message state
    navigation.navigate("LoginScreen");
  }; 

  const handleSubmit = useCallback (async () => {

    if (!username && !password) {
      setErrorMessage('Missing username and password');
      return;
    }

    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }
  
    if (!password) {
      setErrorMessage('Please enter a password');
      return;
    }

  
    try {
      const response = await axios.get('http://localhost:3000/users');
      const data = response.data;

      if (data.find((user) => user.username === username)) {
        setErrorMessage('Username is already taken');
        return;
      }

      const postResponse = await axios.post('http://localhost:3000/users', {
          username: username,
          password: password,
      });
  
      const postData = postResponse.data;
  
      if (postData.error) {
        setErrorMessage(postData.error);
        return;
      }

    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while registering. Please try again later.');
    }
  }, [username, password]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={stylesTwo.container}>
        <Text style={stylesTwo.titleText}>
            Penn<Text style={stylesTwo.buzz}>Buzz</Text>
        </Text>
        <Text style={stylesTwo.createStyle}>
            Create Account
        </Text>
        <View style={stylesTwo.input}>
            <TextInput
                style={stylesTwo.inputField}
                placeholder="Username"
                placeholderTextColor="grey"
                onChangeText={handleUsernameChange}/>
        </View>
        <View style={[stylesTwo.input, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TextInput
                style={[stylesTwo.pass, { flex: 1 }]}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={handlePasswordChange}/>
            <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={stylesTwo.showPasswordText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
             </TouchableOpacity>
        </View>
        {errorMessage != '' ? (
              <Text style={stylesTwo.errorMessage}>
                {errorMessage}
              </Text>
        ) : null}
        <TouchableOpacity
            onPress = {handleSubmit}
            style={stylesTwo.registerBtn}>
            <Text style={stylesTwo.registerText}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={stylesTwo.loginView}>
            <Text style={stylesTwo.login}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={stylesTwo.redirect}>Login</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const stylesTwo = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    titleText: {
      marginTop: 110,
      fontSize: 55,
      fontWeight: "bold",
      marginBottom: 5,
      paddingTop: 55,
      paddingBottom: 5
    },
    
    buzz: {
        color: "#fb5b5a",
        fontSize: 52,
        fontWeight: "bold",
        paddingVertical: 55
    },
    
    input:{
        width:"80%",
        backgroundColor:"white",
        borderRadius:5,
        borderWidth: 1,
        height:60,
        marginBottom:20,
        marginTop: 20,
        justifyContent:"center",
        padding:14,
        borderColor:"black"
    },
    
    inputField:{
        height:50,
        fontSize: 19,
        color:"black"
    },

    loginView: {
        flexDirection: 'row',
        marginTop: 15
    },

    login: {
        color: "grey",
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 10
    },

    redirect: {
        fontWeight: "bold",
        color: "#fb5b5a",
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 2,
        paddingRight: 10
    },
        
    registerBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:5,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:22
    },

    registerText: {
        height: 25,
        color: "white",
        fontSize: 19
    },

    errorMessage: {
        color: "#fb5b5a",
        fontSize: 17
    },

    createStyle: {
      color: "#fb5b5a",
      fontSize: 22,
      paddingBottom: 10
    },

    showPasswordText: {
      color: "grey",
      fontSize: 15,
      textAlignVertical: 'center',
      paddingTop: 5
    },

    pass: {
      height:50,
      fontSize: 19,
      color:"black",
      paddingBottom: 20
    }
}); 

export default RegisterScreen;