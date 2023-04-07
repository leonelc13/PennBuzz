import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";

function LoginScreen ({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // add showPassword state


  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUp = () => {
    setErrorMessage(""); // reset error message state
    navigation.navigate("RegisterScreen");
  };  

  const handleSubmit = useCallback(async () => {
    if (!username && !password) {
      setErrorMessage("Missing username and password");
      return;
    }

    if (!username) {
      setErrorMessage("Missing username");
      return;
    }

    if (!password) {
      setErrorMessage("Missing password");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: {
          username: username,
          password: password,
        },
      });
      const data = response.data;
      if (data.length === 0 || data[0].password !== password || data[0].username !== username) {
        setErrorMessage(
          "Sorry, we don't recognize that combination of username and password. Please try again"
        );
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainFeedScreen' }],
      });
    } catch (error) {
      console.error(error);
    }
  }, [username, password]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.headingText}>
            Penn<Text style={styles.buzzText}>Buzz</Text>
        </Text>

        <Text style={styles.loginStyle}>
            Welcome Back
        </Text>

        <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="grey"
                onChangeText={handleUsernameChange}
                autoCapitalize="none"/>
        </View>
        <View style={[styles.inputView, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TextInput
          style={[styles.passwordText, { flex: 1 }]}
          secureTextEntry={!showPassword}
          placeholder="Password"
          placeholderTextColor="grey"
          onChangeText={handlePasswordChange}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.showPasswordText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
        {errorMessage != '' ? (
              <Text style={styles.errorStyle}>
                {errorMessage}
              </Text>
        ) : null}
        <TouchableOpacity
            onPress = {handleSubmit}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <View style={styles.signupView}>
            <Text style={styles.signup}>Don’t have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    headingText: {
        marginTop: 110,
        fontSize: 55,
        fontWeight: "bold",
        marginBottom: 5,
        paddingTop: 55,
        paddingBottom: 5
    },
    
    buzzText: {
        color: "#fb5b5a",
        fontSize: 55,
        fontWeight: "bold",
        paddingVertical: 55
    },
    
    inputView:{
        width:"80%",
        backgroundColor:"white",
        borderRadius:5,
        borderWidth: 1,
        height:60,
        marginBottom:20,
        marginTop: 20,
        justifyContent:"center",
        padding:14,
        borderColor:"black", 
    },
    
    inputText:{
        height:50,
        fontSize: 19,
        color:"black",
        textAlignVertical: 'center'
    },

    signupView: {
        flexDirection: 'row',
        marginTop: 15
    },

    signup: {
        color: "grey",
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 10
    },

    link: {
        fontWeight: "bold",
        color: "#fb5b5a",
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 2,
        paddingRight: 10
    },
        
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:5,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:22
    },

    loginText: {
        height: 25,
        color: "white",
        fontSize: 19
    },

    errorStyle: {
        color: "#fb5b5a",
        fontSize: 17
    },

    loginStyle: {
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

    passwordText: {
      height:50,
      fontSize: 19,
      color:"black",
      paddingBottom: 20
    }
}); 
export default LoginScreen;