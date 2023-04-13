import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
export default function QuizScreen({ route }) {
    const { quizId, navigation } = route.params;
    const [inQuiz, setInQuiz] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [quizData, setQuizData] = useState({});
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    useEffect(() => {
        console.log(" QUIZ ID ", quizId)
        console.log("DATA", quizData);
        axios.get(`http://localhost:3000/quiz?id=${quizId}`)
            .then(response => {
                setQuizData(response.data[0]);
                setComments(response.data[0].comments);
                setUpvotes(response.data[0].upvotes);
                setDownvotes(response.data[0].downvotes);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

    }, []);

    const handleUpvote = (event) => {
        if (isUpvoted) {
            setUpvotes(upvotes - 1);
            return setIsUpvoted(false);
        }
        setUpvotes(upvotes + 1);
        return setIsUpvoted(true);
    }

    const handleDownvote = (event) => {
        if (isDownvoted) {
            setDownvotes(downvotes - 1);
            return setIsDownvoted(false);
        }
        setDownvotes(downvotes + 1);
        return setIsDownvoted(true);
    }


    const renderComment = ({ item }) => (
        <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.author}</Text>
            <Text>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.quiz_screen_container}>
            <View style={styles.quiz_info_container}>
                <View style={styles.quiz_header_container}>
                    <View style={styles.quiz_author}>
                        <View style={styles.quiz_author_image_wrapper}>
                            <Image style={{
                                width: 30, height: 30,
                                borderRadius: 50
                            }} source={{ uri: quizData.author_img }} alt="author profile picture" resizeMode="cover" />
                        </View >
                        <Text style={styles.author_name}>
                            {quizData.author_name}
                        </Text>
                    </View >
                    <View style={styles.quiz_labels_container} >
                        {quizData.labels && quizData.labels.map(label => (
                            <View style={styles.quiz_labels}>
                                <Text style={styles.red_text}>
                                    {label}
                                </Text>
                            </View>
                        ))
                        }
                    </View >
                </View >

                <View style={styles.quiz_information} >
                    <View style={styles.quiz_text} >
                        <View style={styles.quiz_title} >
                            <Text style={styles.quiz_title_text}>
                                {quizData.title}
                            </Text>
                        </View >
                        <View style={styles.quiz_description} >
                            <Text>
                                {quizData.description}
                            </Text>
                        </View >
                    </View >
                </View>
                <View style={styles.thumbnail_wrapper}>
                    <Image style={{ width: '100%', height: 200 }} source={{ uri: quizData.thumbnail_img }} alt="quiz_thumbnail" resizeMode="cover" />
                </View>
                <View style={styles.quiz_buttons} >
                    <TouchableOpacity onPress={() => 1} style={styles.quiz_take_quiz_button_container}>
                        <Text style={styles.red_text}>
                            Take Quiz
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.quiz_upvotes_comments_container} >
                        <TouchableOpacity onPress={() => handleUpvote()} style={isUpvoted ? styles.selected_upvote_button : styles.quiz_upvotes_button}>
                            <Text style={isUpvoted ? styles.white_text : styles.red_text}>
                                {upvotes}
                            </Text>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => handleDownvote()} style={isDownvoted ? styles.selected_upvote_button : styles.quiz_upvotes_button}>
                            <Text style={isDownvoted ? styles.white_text : styles.red_text}>
                                {downvotes}
                            </Text>
                        </TouchableOpacity >

                    </View >
                </View >
            </View>
            <View style={[styles.comments_container, { flex: 1 }]}>
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderComment}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    quiz_screen_container: {

        width: '100%',

        alignSelf: 'center',
        backgroundColor: 'white',
        marginBottom: 50,
        height: '100%'
    },
    quiz_info_container: {
        padding: 10
    },
    quiz_header_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10',
        alignItems: 'center'
    },
    quiz_author: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    author_name: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    quiz_labels_container: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto'
    }
    , quiz_labels: {
        padding: 5,
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 5
    },
    red_text: {
        color: '#FF0606',
    },
    quiz_title: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    quiz_title_text: {
        fontWeight: 'bold',
        fontSize: 20
    },

    thumbnail_wrapper: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
    ,
    quiz_buttons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    quiz_take_quiz_button_container: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10
    },
    quiz_upvotes_comments_container: {
        display: 'flex',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '40%',
        alignItems: 'center'
    },
    quiz_upvotes_button: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },

    selected_upvote_button: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#FF0606',

        marginRight: 10,
    },
    white_text: {
        color: 'white'
    }, comments_container: {
        paddingHorizontal: 10
    }
});