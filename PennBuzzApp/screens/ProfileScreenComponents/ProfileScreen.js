import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Quiz from './Quiz';
import axios from 'axios';


function ProfileScreen ({ username }) {
  // Initialize state    
  const [profile, setProfile] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Created');



  useEffect(() => {
      // Fetch profile data
      axios.get(`http://localhost:3000/profile/${username}`)
          .then(response => {
              console.log(response);
              setProfile(response.data);
          })
          .catch(error => {
              console.error('Error fetching data: ', error);
          });
  }, []);

  useEffect(() => {
      // Fetch quizzes data
      axios.get('http://localhost:3000/quizzes',
          {
              params: {
                  user: username
              }
          })
          .then(response => {
              setQuizzes(response.data ? response.data : []);
          })
          .catch(error => {
              console.error('Error fetching data: ', error);
          });

  }, []);

  return (
    <SafeAreaView style={styles.profilePageContainer}>
        <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: profile.profile_img }}
              style={styles.image}
            />
            <Text style={styles.name}>{profile.name}</Text>
          </View>
          <View style={styles.profileBiography}>
            <Text>{profile.biography}</Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <View
            style={[
              styles.button,
              selectedButton === 'Created' && styles.selected,
            ]}
            onTouchEnd={() => setSelectedButton('Created')}>
            <Text>Created</Text>
          </View>
          <View
            style={[
              styles.button,
              selectedButton === 'Recent' && styles.selected,
            ]}
            onTouchEnd={() => setSelectedButton('Recent')}>
            <Text>Recent</Text>
          </View>
          <View
            style={[
              styles.button,
              selectedButton === 'Favorites' && styles.selected,
            ]}
            onTouchEnd={() => setSelectedButton('Favorites')}>
            <Text>Favorites</Text>
          </View>
        </View>
        <View style={styles.quizContainer}>
          {quizzes.map((quiz) => (
            <Quiz key={quiz.id} {...quiz} />
          ))}
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilePageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileSection: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  profileImage: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  profileBiography: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#007AFF',
  },
  quizContainer: {
    flex: 1,
  }
}); 

export default ProfileScreen;